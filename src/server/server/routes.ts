console.log("Loading routes.ts...");
import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertReviewSchema, insertSubscriberSchema } from "./shared/schema.js";
import { createRazorpayOrder } from "./razorpay.js";
import path from "path";
import fs from "fs";
import { generateToken, verifyToken } from './jwt.js';
import paypalRouter from "./paypal.js";
import SibApiV3Sdk from 'sib-api-v3-sdk';

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/products", async (_req: Request, res: Response) => {
    try {
      const products = await storage.getAllProducts();
      return res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:slug", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/reviews", async (_req: Request, res: Response) => {
    try {
      const reviews = await storage.getAllReviews();
      return res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req: Request, res: Response) => {
    try {
      console.log('Review raw req.body:', req.body); // Debug log
      // Map 'review' to 'comment' for backend validation
      if (req.body.review && !req.body.comment) {
        req.body.comment = req.body.review;
      }
      const validatedData = insertReviewSchema.parse(req.body);
      console.log('Review validatedData:', validatedData); // Debug log
      const review = await storage.createReview(validatedData);

      // Send email notification to admin
      try {
        const apiKey = process.env.BREVO_API_KEY;
        if (!apiKey) throw new Error("Brevo API key not set");
        SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apiKey;
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.subject = "New Review Submitted";
        sendSmtpEmail.htmlContent = `
          <div style="background:#18181b;padding:32px 0;font-family:sans-serif;color:#fff;text-align:center;">
            <div style="font-weight:bold;font-size:2rem;display:block;margin-bottom:12px;">
              <span style='color:#fff;display:inline-block;'>Vroom</span>
              <span style='color:#b993f7;display:inline-block;'>Visions</span>
              <span style='color:#a855f7;display:inline-block;'>X</span>
            </div>
            <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:8px;">New Review Submitted</h2>
            <div style="background:#232136;margin:24px auto 16px auto;padding:24px 16px;border-radius:12px;max-width:400px;text-align:left;box-shadow:0 0 12px #a855f7;">
              <div style="margin-bottom:10px;"><b>Name:</b> ${validatedData.name ? validatedData.name : 'N/A'}</div>
              <div style="margin-bottom:10px;"><b>Email:</b> ${validatedData.email ? validatedData.email : 'N/A'}</div>
              <div style="margin-bottom:10px;"><b>Rating:</b> ${typeof validatedData.rating !== 'undefined' ? validatedData.rating : 'N/A'}</div>
              <div style="margin-bottom:10px;"><b>Review:</b> ${validatedData.comment ? validatedData.comment : 'N/A'}</div>
            </div>
            <div style="margin-top:24px;font-size:0.95rem;color:#bdbdbd;">
              Need help? Contact <a href="mailto:support@vroomvisions.com" style="color:#a855f7;">support@vroomvisions.com</a><br>
              &copy; ${new Date().getFullYear()} Vroom Visions X. All rights reserved.
            </div>
          </div>
        `;
        sendSmtpEmail.sender = { name: "Vroom Visions", email: process.env.FROM_EMAIL };
        sendSmtpEmail.to = [{ email: "vroomvisionsx@gmail.com" }];
        await apiInstance.sendTransacEmail(sendSmtpEmail);
      } catch (err) {
        console.error("Failed to send review notification email:", err);
      }

      // Send thank you email to reviewer (client)
      try {
        if (validatedData.email) {
          const apiKey = process.env.BREVO_API_KEY;
          SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apiKey;
          const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
          const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
          sendSmtpEmail.subject = "Thank you for your review!";
          sendSmtpEmail.htmlContent = `
            <div style="font-family:sans-serif;">
              <h2>Thank you for sharing your experience!</h2>
              <p>Hi ${validatedData.name || 'there'},</p>
              <p>We appreciate your feedback and are glad you took the time to review us.</p>
              <p>Your review: <i>${validatedData.comment || ''}</i></p>
              <p>Best regards,<br/>Vroom Visions Team</p>
            </div>
          `;
          sendSmtpEmail.sender = { name: "Vroom Visions", email: process.env.FROM_EMAIL };
          sendSmtpEmail.to = [{ email: validatedData.email }];
          await apiInstance.sendTransacEmail(sendSmtpEmail);
        }
      } catch (err) {
        console.error("Failed to send thank you email to reviewer:", err);
      }

      return res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      return res.status(400).json({ message: "Invalid review data" });
    }
  });

  app.post("/api/subscribe", async (req: Request, res: Response) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      await storage.createSubscriber(validatedData);
      return res.status(201).json({ message: "Subscribed successfully" });
    } catch (error) {
      console.error("Error creating subscriber:", error);
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message?: string }).message === "string" &&
        ((error as { message: string }).message.includes("unique"))
      ) {
        return res.status(400).json({ message: "Email already subscribed" });
      }
      return res.status(400).json({ message: "Invalid subscriber data" });
    }
  });

  app.post("/api/razorpay/order", async (req: Request, res: Response) => {
    try {
      const { amount, currency, receipt, email } = req.body;
      if (!amount || !currency || !receipt || !email) {
        return res.status(400).json({ message: "Missing required order details" });
      }

      // Assuming amount is in USD cents from the client
      // Convert USD cents to INR paise (Example: 1 USD = 83 INR)
      const usdAmount = amount / 100; // Convert cents to dollars
      const inrAmount = usdAmount * 83; // Convert dollars to rupees
      const inrPaise = Math.round(inrAmount * 100); // Convert rupees to paise

      // Ensure currency is set to INR for Razorpay
      if (currency !== "INR") {
           console.warn(`Unexpected currency received: ${currency}. Proceeding with INR.`);
      }

      // Pass email to createRazorpayOrder for notes
      const order = await createRazorpayOrder(inrPaise, "INR", receipt, email);
      // In a real application, you would save the order details to your database here
      return res.status(201).json({ id: order.id, amount: order.amount, currency: order.currency });
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      return res.status(500).json({ message: "Failed to create Razorpay order" });
    }
  });

  app.get('/download/instagram-guide', (req: Request, res: Response) => {
    // TODO: Implement logic here to verify if the user is authorized to download the file
    // For example, check if the user has a session indicating a successful purchase.

    const filePath = path.join(__dirname, '../private_assets/Instagram_Export_Guide.zip');

    // Ensure the file exists before attempting to send it
    if (fs.existsSync(filePath)) {
      res.download(filePath, 'Instagram Export Guide.zip', (err) => {
        if (err) {
          console.error('Error sending file:', err);
          // Handle error, maybe file not found or permission issue
          res.status(500).send('Could not download the file.');
        } else {
          // Log the successful download
          console.log('Instagram Export Guide downloaded successfully.');
          // TODO: Add more sophisticated tracking here, e.g., save to database
        }
      });
    } else {
      console.error('File not found:', filePath);
      res.status(404).send('File not found.');
    }
  });

  app.get('/download/zip/:filename', (req: Request, res: Response) => {
    // Sanitize filename to prevent directory traversal
    const filename = path.basename(req.params.filename);
    const filePath = path.join(__dirname, '../public/downloads/', filename);

    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      console.log(`Preparing to send: ${filePath} (${stat.size} bytes)`);
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Transfer-Encoding', 'binary');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Length', stat.size);
      res.status(200);

      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

      fileStream.on('end', () => {
        console.log(`${filename} downloaded successfully.`);
      });

      fileStream.on('error', () => {
        console.error('Error streaming file');
        if (!res.headersSent) {
          res.status(500).send('Could not download the file.');
        }
      });
    } else {
      console.error('File not found: ' + filePath);
      res.status(404).send('File not found.');
    }
  });

  // Example: Generate JWT token for a user (POST /api/auth/login)
  app.post('/api/auth/login', async (req: Request, res: Response) => {
    // In a real app, validate user credentials here
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'Missing userId' });
    const token = generateToken({ userId });
    return res.json({ token });
  });

  // Example: Verify JWT token (POST /api/auth/verify)
  app.post('/api/auth/verify', (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Missing token' });
    try {
      const decoded = verifyToken(token);
      return res.json({ valid: true, decoded });
    } catch {
      return res.status(401).json({ valid: false, message: 'Invalid token' });
    }
  });

  // Brevo (Sendinblue) email sending endpoint
  app.post("/api/send-email", async (req: Request, res: Response) => {
    const { to, subject, html } = req.body;
    if (!to || !subject || !html) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    try {
      const apiKey = process.env.BREVO_API_KEY;
      if (!apiKey) return res.status(500).json({ message: "Brevo API key not set" });
      SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apiKey;
      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = html;
      sendSmtpEmail.sender = { name: "Vroom Visions", email: process.env.FROM_EMAIL };
      sendSmtpEmail.to = [{ email: to }];
      await apiInstance.sendTransacEmail(sendSmtpEmail);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Brevo email error:", error.message);
        res.status(500).json({ message: error.message });
      } else {
        console.error("Brevo email error:", error);
        res.status(500).json({ message: "Failed to send email" });
      }
    }
  });

  // Use PayPal router
  app.use(paypalRouter);

  // Utility to send invoice email via Brevo
  async function sendInvoiceEmail(to: string, amount: number, currency: string, details?: { product?: string, invoiceId?: string, date?: string, paymentMethod?: string }) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) throw new Error("Brevo API key not set");
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apiKey;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    const today = new Date();
    const formattedDate = details?.date || today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    sendSmtpEmail.subject = "Your Invoice from Vroom Visions";
    sendSmtpEmail.htmlContent = `
      <div style="background:#18181b;padding:32px 0;font-family:sans-serif;color:#fff;text-align:center;">
        <div style="font-weight:bold;font-size:2rem;display:block;margin-bottom:12px;">
          <span style='color:#fff;display:inline-block;'>Vroom</span>
          <span style='color:#b993f7;display:inline-block;'>Visions</span>
          <span style='color:#a855f7;display:inline-block;'>X</span>
        </div>
        <h1 style="font-size:1.3rem;font-weight:700;margin-bottom:8px;">Thank You for Your Purchase!</h1>
        <div style="background:#232136;margin:24px auto 16px auto;padding:24px 16px;border-radius:12px;max-width:400px;text-align:left;box-shadow:0 0 12px #a855f7;">
          <div style="margin-bottom:10px;"><b>Product:</b> ${details?.product || 'Vroom Visions Product'}</div>
          <div style="margin-bottom:10px;"><b>Amount:</b> ${(amount/100).toFixed(2)} ${currency}</div>
          <div style="margin-bottom:10px;"><b>Invoice ID:</b> ${details?.invoiceId || 'Auto-generated'}</div>
          <div style="margin-bottom:10px;"><b>Date:</b> ${formattedDate}</div>
          <div style="margin-bottom:10px;"><b>Payment Method:</b> ${details?.paymentMethod || 'Online'}</div>
        </div>
        <div style="margin-top:24px;font-size:0.95rem;color:#bdbdbd;">
          Need help? Contact <a href="mailto:support@vroomvisions.com" style="color:#a855f7;">support@vroomvisions.com</a><br>
          &copy; ${today.getFullYear()} Vroom Visions X. All rights reserved.
        </div>
      </div>
    `;
    sendSmtpEmail.sender = { name: "Vroom Visions", email: process.env.FROM_EMAIL };
    sendSmtpEmail.to = [{ email: to }];
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  }

  app.post("/api/razorpay/invoice", async (req: Request, res: Response) => {
    const { email, amount, currency } = req.body;
    if (!email || !amount || !currency) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    try {
      await sendInvoiceEmail(email, amount, currency);
      res.status(200).json({ message: "Invoice email sent" });
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to send Razorpay invoice email:", err.message);
        res.status(500).json({ message: err.message });
      } else {
        console.error("Failed to send Razorpay invoice email:", err);
        res.status(500).json({ message: "Failed to send invoice email" });
      }
    }
  });

  // Return the HTTP server instance
  return createServer(app);
}
