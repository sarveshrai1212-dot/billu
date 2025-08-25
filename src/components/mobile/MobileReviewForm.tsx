"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface MobileReviewFormProps {
  onSubmit?: (review: { name: string; rating: number; comment: string }) => void;
}

const MobileReviewForm: React.FC<MobileReviewFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ name, rating, comment });
    }
    setSubmitted(true);
    setName("");
    setRating(5);
    setComment("");
  };

  return (
    <motion.form
      className="bg-purple-900/20 backdrop-blur-md p-6 rounded-lg shadow-glow border border-white/10 flex flex-col gap-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold text-white mb-2">Leave a Review</h2>
      <input
        type="text"
        placeholder="Your Name"
        className="bg-purple-950/40 backdrop-blur-md border border-white/10 rounded-md px-4 py-2 text-white"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <div className="flex items-center gap-2">
        <span className="text-white">Rating:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-400"}`}
            onClick={() => setRating(star)}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        placeholder="Your review..."
        className="bg-purple-950/40 backdrop-blur-md border border-white/10 rounded-md px-4 py-2 text-white min-h-[80px]"
        value={comment}
        onChange={e => setComment(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-[#7f53ac] to-[#657ced] text-white py-3 rounded-md font-semibold shadow-glow border border-white/10 mt-2"
      >
        Submit
      </button>
      {submitted && (
        <div className="text-green-400 text-center mt-2">Thank you for your review!</div>
      )}
    </motion.form>
  );
};

export default MobileReviewForm;
