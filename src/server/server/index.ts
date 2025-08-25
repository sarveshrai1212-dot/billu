// Removed duplicate imports
console.log("Starting backend index.ts...");
import 'dotenv/config';
import express, { type Request, Response } from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { registerRoutes } from "./routes.js";
import paypalRouter from "./paypal.js";

// Get directory path for ES modules (instead of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/downloads', express.static(path.join(__dirname, '../public/downloads')));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, unknown> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      const logLineBase = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      let logLine = logLineBase;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

app.use(paypalRouter);

// Register routes and start server
(async () => {
  const server = await registerRoutes(app);

  // Error handler must be registered after all routes, but before server starts
  app.use((err: unknown, _req: Request, res: Response) => {
    let status = 500;
    let message = "Internal Server Error";
    if (typeof err === 'object' && err !== null) {
      if ('status' in err && typeof (err as { status?: number }).status === 'number') status = (err as { status: number }).status;
      else if ('statusCode' in err && typeof (err as { statusCode?: number }).statusCode === 'number') status = (err as { statusCode: number }).statusCode;
      if ('message' in err && typeof (err as { message?: string }).message === 'string') message = (err as { message: string }).message;
    }
    res.status(status).json({ message });
    // Optionally log or handle the error, but don't rethrow in production
  });

  // Vite setup removed: not needed for Next.js-only project

  // Serve the app on port 5000 (default) unless PORT is set
  const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
  server.listen({ port, host: "0.0.0.0" }, () => {
    console.log(`serving on port ${port}`);
  });
})();
