"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

const ReviewForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !review || rating === 0) {
      setError("Please fill all fields and give a rating.");
      return;
    }
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: `${review}\n\nRating: ${rating}/5` }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to send feedback.");
        return;
      }
      setShowModal(true);
    } catch (err) {
            setError("Failed to send feedback.");
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center" style={{background: "rgba(30, 41, 59, 0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", zIndex: 9999}}>
          <div style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "18px",
            boxShadow: "0 4px 32px #a855f755",
            padding: "32px 24px",
            maxWidth: "340px",
            width: "100%",
            textAlign: "center",
            position: "relative"
          }}>
            <div style={{
              position: "absolute",
              top: "-38px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#a855f7",
              borderRadius: "50%",
              width: "64px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 12px #a855f755"
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="none"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#232136", marginTop: "36px", marginBottom: "12px" }}>Thank You!</h2>
            <p style={{ color: "#232136", marginBottom: "24px" }}>Your details has been successfully submitted. Thanks!</p>
            <button
              style={{
                background: "#a855f7",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1rem",
                border: "none",
                borderRadius: "8px",
                padding: "10px 0",
                width: "100%",
                boxShadow: "0 2px 12px #a855f755",
                cursor: "pointer"
              }}
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-purple-900/20 p-6 rounded-lg shadow-glow"
        style={{ pointerEvents: "auto" }}
        autoComplete="off"
      >
        <div className="mb-4">
          <label className="block text-white mb-1">Name</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-purple-950/40 border border-white/10 text-white placeholder-gray-400 focus:border-purple-700 focus:ring-2 focus:ring-purple-700 focus:border-2"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your Name"
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded bg-purple-950/40 border border-white/10 text-white placeholder-gray-400 focus:border-purple-700 focus:ring-2 focus:ring-purple-700 focus:border-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Your Experience</label>
          <textarea
            className="w-full p-2 rounded bg-purple-950/40 border border-white/10 text-white placeholder-gray-400 focus:border-purple-700 focus:ring-2 focus:ring-purple-700 focus:border-2"
            rows={4}
            value={review}
            onChange={e => setReview(e.target.value)}
            placeholder="Share your honest feedback..."
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Your Rating</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
                tabIndex={0}
              >
                <Star
                  size={28}
                  className={
                    (hoverRating || rating) >= star
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-500"
                  }
                  strokeWidth={1.5}
                  fill={(hoverRating || rating) >= star ? "#facc15" : "none"}
                />
              </button>
            ))}
          </div>
        </div>
        {error && <div className="text-red-400 mb-2">{error}</div>}
        <button
          type="submit"
          className="bg-gradient-to-r from-brand-purple to-purple-500 text-white px-8 py-2 rounded shadow-glow hover:scale-105 transition-all flex items-center gap-2 justify-center mt-2"
        >
          <Star size={18} className="text-yellow-400" /> Submit Review
        </button>
      </form>
    </>
  );
};

export default ReviewForm;
