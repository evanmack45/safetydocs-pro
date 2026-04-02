"use client";

import { useState } from "react";
import Link from "next/link";
import { TRADES } from "@/lib/trades";
import type {
  ToolboxTalkDocument,
  GenerateResponse,
  GenerateError,
} from "@/lib/types";
import { generateToolboxTalkPdf } from "@/lib/generate-pdf";

type FormState = "idle" | "loading" | "success" | "error";

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-blue-800">
          SafetyDocs Pro
        </Link>
        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-blue-800"
        >
          Back to Home
        </Link>
      </div>
    </header>
  );
}

function GenerateForm({
  onGenerate,
  loading,
}: {
  onGenerate: (data: {
    trade: string;
    projectDescription: string;
    specificHazards: string;
    companyName: string;
    projectLocation: string;
  }) => void;
  loading: boolean;
}) {
  const [trade, setTrade] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [specificHazards, setSpecificHazards] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onGenerate({
      trade,
      projectDescription,
      specificHazards,
      companyName,
      projectLocation,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="trade"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Trade *
        </label>
        <select
          id="trade"
          required
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select your trade...</option>
          {TRADES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="projectDescription"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Project Description *
        </label>
        <textarea
          id="projectDescription"
          required
          rows={3}
          placeholder="e.g., Re-roofing a 2-story single family home, removing old shingles and installing new architectural shingles. Roof pitch is 6/12."
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="specificHazards"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Specific Hazards (optional)
        </label>
        <textarea
          id="specificHazards"
          rows={2}
          placeholder="e.g., Power lines near the south side of the house, homeowner has dogs in the backyard"
          value={specificHazards}
          onChange={(e) => setSpecificHazards(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="companyName"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Company Name (optional)
          </label>
          <input
            id="companyName"
            type="text"
            placeholder="Your company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="projectLocation"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Project Location (optional)
          </label>
          <input
            id="projectLocation"
            type="text"
            placeholder="e.g., 123 Oak St, Springfield"
            value={projectLocation}
            onChange={(e) => setProjectLocation(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-800 px-6 py-3 text-lg font-semibold text-white shadow transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Generating Toolbox Talk...
          </span>
        ) : (
          "Generate Toolbox Talk"
        )}
      </button>
    </form>
  );
}

function DocumentPreview({
  document,
  onDownload,
  onReset,
}: {
  document: ToolboxTalkDocument;
  onDownload: () => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Your Toolbox Talk
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Generate Another
          </button>
          <button
            onClick={onDownload}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-gray-900 shadow transition hover:bg-amber-400"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Document header */}
        <div className="rounded-t-xl bg-blue-800 px-6 py-4 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-blue-200">
                SafetyDocs Pro - Toolbox Talk
              </p>
              <h3 className="mt-1 text-xl font-bold">
                {document.title}
              </h3>
            </div>
            <div className="text-right text-sm text-blue-200">
              <p>{document.date}</p>
              <p>{document.companyName}</p>
            </div>
          </div>
          <div className="mt-2 flex gap-4 text-sm text-blue-200">
            <span>Trade: {document.trade}</span>
            <span>Location: {document.projectLocation}</span>
          </div>
        </div>

        {/* Document body */}
        <div className="divide-y divide-gray-100 px-6">
          {document.sections.map((section, idx) => (
            <div key={idx} className="py-4">
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-800">
                {section.heading}
              </h4>
              <div className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* OSHA references */}
        {document.oshaReferences.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-800">
              OSHA Regulation References
            </h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {document.oshaReferences.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom download button */}
      <div className="text-center">
        <button
          onClick={onDownload}
          className="rounded-lg bg-blue-800 px-8 py-3 text-lg font-semibold text-white shadow transition hover:bg-blue-700"
        >
          Download as PDF
        </button>
        <p className="mt-2 text-sm text-gray-500">
          Print-ready format with signature lines and attendee fields
        </p>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [document, setDocument] = useState<ToolboxTalkDocument | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleGenerate(data: {
    trade: string;
    projectDescription: string;
    specificHazards: string;
    companyName: string;
    projectLocation: string;
  }) {
    setFormState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/generate-toolbox-talk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as
        | GenerateResponse
        | GenerateError;

      if (!response.ok || "error" in result) {
        const msg =
          "error" in result
            ? result.error
            : "Failed to generate document";
        setErrorMessage(msg);
        setFormState("error");
        return;
      }

      setDocument(result.document);
      setFormState("success");
    } catch {
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
      setFormState("error");
    }
  }

  function handleDownload() {
    if (!document) return;
    const pdf = generateToolboxTalkPdf(document);
    const filename = `toolbox-talk-${document.trade.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${document.date.replace(/[^a-z0-9]+/gi, "-")}.pdf`;
    pdf.save(filename);
  }

  function handleReset() {
    setFormState("idle");
    setDocument(null);
    setErrorMessage("");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {formState !== "success" && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Generate a Toolbox Talk
              </h1>
              <p className="mt-2 text-gray-600">
                Fill in your project details and we will generate a
                professional, OSHA-compliant toolbox talk document with
                regulation citations.
              </p>
            </div>

            {formState === "error" && errorMessage && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {errorMessage}
              </div>
            )}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <GenerateForm
                onGenerate={handleGenerate}
                loading={formState === "loading"}
              />
            </div>
          </>
        )}

        {formState === "success" && document && (
          <DocumentPreview
            document={document}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}
