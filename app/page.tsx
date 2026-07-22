"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Bug");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, category, feedback }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          success: true,
          message: "Thank you! Your feedback has been submitted successfully.",
        });
        setName("");
        setEmail("");
        setFeedback("");
      } else {
        setSubmitStatus({
          success: false,
          message:
            result.error || "Failed to submit feedback. Please try again.",
        });
      }
    } catch (err: unknown) {
      setSubmitStatus({
        success: false,
        message: (err as Error).message || "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full mx-auto my-auto space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 transition-all duration-300">
        <div>
          <div className="flex justify-between items-center mb-6">
            <Link
              href="/admin"
              className="text-xs font-medium text-slate-500 hover:text-blue-600 transition"
            >
              Go to Dashboard →
            </Link>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Help us improve our platform. We read every single submission.
          </p>
        </div>

        {submitStatus && (
          <div
            className={`p-4 rounded-xl text-sm ${
              submitStatus.success
                ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                : "bg-rose-50 text-rose-800 border border-rose-100"
            }`}
          >
            <div className="flex items-center">
              {submitStatus.success ? (
                <svg
                  className="w-5 h-5 mr-2 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 mr-2 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <span>{submitStatus.message}</span>
            </div>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wider block"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none  transition text-sm text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wider block"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none transition text-sm text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="category"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wider block"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none  transition text-sm text-slate-800"
            >
              <option value="Bug">Bug Report</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Question">Question</option>
              <option value="General Feedback">General Feedback</option>
              <option value="Praise">Praise</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="feedback"
              className="text-xs font-semibold text-slate-700 uppercase tracking-wider block"
            >
              Your Feedback
            </label>
            <textarea
              id="feedback"
              required
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Describe your suggestion, request, or issue in detail..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none  transition text-sm text-slate-800 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/10 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
