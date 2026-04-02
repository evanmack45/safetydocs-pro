"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function CancelContent() {
  const searchParams = useSearchParams();
  const documentType = searchParams.get("type") ?? "toolbox-talk";
  const label =
    documentType === "jsa" ? "Job Safety Analysis" : "Toolbox Talk";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <svg
            className="h-8 w-8 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Payment Cancelled
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          No worries -- your {label} was not generated and you were not
          charged. You can try again whenever you are ready.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={`/generate?type=${documentType}`}
            className="rounded-lg bg-blue-800 px-8 py-3 text-lg font-semibold text-white shadow transition hover:bg-blue-700"
          >
            Try Again
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg border border-gray-300 px-8 py-3 text-lg font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <CancelContent />
    </Suspense>
  );
}
