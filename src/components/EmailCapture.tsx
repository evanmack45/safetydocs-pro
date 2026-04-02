"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as {
        message?: string;
        error?: string;
      };

      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? "You're on the list!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section className="bg-blue-900 py-16">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-3 text-3xl font-bold text-white">
          Get Early Access
        </h2>
        <p className="mb-8 text-lg text-blue-200">
          Be the first to know when SafetyDocs Pro launches. Join the
          waitlist and get a discount on your first document.
        </p>

        {status === "success" ? (
          <div className="rounded-lg bg-green-500/20 px-6 py-4 text-green-200">
            {message}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="you@company.com"
              required
              className="rounded-lg border border-blue-700 bg-blue-800 px-4 py-3 text-white placeholder-blue-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 sm:w-80"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-gray-900 transition hover:bg-amber-400 disabled:opacity-50"
            >
              {status === "loading" ? "Joining..." : "Join Waitlist"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-red-300">{message}</p>
        )}

        <p className="mt-4 text-xs text-blue-400">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
