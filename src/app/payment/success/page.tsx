"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Payment Successful
        </h1>
        <p className="mb-2 text-lg text-gray-600">
          Your document is being generated. It will be ready for
          download in just a moment.
        </p>
        {sessionId && (
          <p className="mb-8 text-sm text-gray-400">
            Session: {sessionId.slice(0, 20)}...
          </p>
        )}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/generate"
            className="rounded-lg bg-blue-800 px-8 py-3 text-lg font-semibold text-white shadow transition hover:bg-blue-700"
          >
            Generate Another Document
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-8 py-3 text-lg font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
