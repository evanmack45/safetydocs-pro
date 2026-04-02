"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TRADES } from "@/lib/trades";
import type {
  DocumentType,
  ToolboxTalkDocument,
  JsaDocument,
  SsspDocument,
  GenerateResponse,
  JsaGenerateResponse,
  SsspGenerateResponse,
  GenerateError,
} from "@/lib/types";
import { DOCUMENT_PRICES } from "@/lib/types";
import { generateToolboxTalkPdf } from "@/lib/generate-pdf";
import { generateJsaPdf } from "@/lib/generate-jsa-pdf";
import { generateSsspPdf } from "@/lib/generate-sssp-pdf";

type FormState = "idle" | "loading" | "paying" | "success" | "error";

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-blue-800">
          SafetyDocs Pro
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/pricing"
            className="text-sm text-gray-600 hover:text-blue-800"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-blue-800"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}

function DocumentTypeSelector({
  selected,
  onChange,
}: {
  selected: DocumentType;
  onChange: (type: DocumentType) => void;
}) {
  return (
    <div className="mb-8">
      <label className="mb-3 block text-sm font-medium text-gray-700">
        Document Type
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        {DOCUMENT_PRICES.map((doc) => (
          <button
            key={doc.type}
            type="button"
            onClick={() => onChange(doc.type)}
            className={`rounded-xl border-2 p-4 text-left transition ${
              selected === doc.type
                ? "border-blue-800 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">
                {doc.name}
              </span>
              <span className="text-lg font-bold text-blue-800">
                ${(doc.price / 100).toFixed(0)}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {doc.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ToolboxTalkForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: Record<string, string>) => void;
  loading: boolean;
}) {
  const [trade, setTrade] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [specificHazards, setSpecificHazards] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
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
          placeholder="e.g., Re-roofing a 2-story single family home, removing old shingles and installing new architectural shingles."
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
          placeholder="e.g., Power lines near the south side of the house"
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

      <SubmitButton loading={loading} label="Generate Toolbox Talk" />
    </form>
  );
}

function JsaForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: Record<string, string>) => void;
  loading: boolean;
}) {
  const [trade, setTrade] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [workEnvironment, setWorkEnvironment] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      trade,
      taskDescription,
      workEnvironment,
      companyName,
      projectLocation,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="jsa-trade"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Trade *
        </label>
        <select
          id="jsa-trade"
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
          htmlFor="taskDescription"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Task Description *
        </label>
        <textarea
          id="taskDescription"
          required
          rows={3}
          placeholder="e.g., Installing new 30-year architectural shingles on a 2-story residential home with a 6/12 pitch roof, including tear-off of existing roofing."
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="workEnvironment"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Work Environment / Site Conditions (optional)
        </label>
        <textarea
          id="workEnvironment"
          rows={2}
          placeholder="e.g., Sloped lot, overhead power lines on south side, limited staging area, residential neighborhood"
          value={workEnvironment}
          onChange={(e) => setWorkEnvironment(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="jsa-companyName"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Company Name (optional)
          </label>
          <input
            id="jsa-companyName"
            type="text"
            placeholder="Your company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="jsa-projectLocation"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Project Location (optional)
          </label>
          <input
            id="jsa-projectLocation"
            type="text"
            placeholder="e.g., 123 Oak St, Springfield"
            value={projectLocation}
            onChange={(e) => setProjectLocation(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <SubmitButton
        loading={loading}
        label="Generate Job Safety Analysis"
      />
    </form>
  );
}

function SsspForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: Record<string, string>) => void;
  loading: boolean;
}) {
  const [trade, setTrade] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  const [numberOfWorkers, setNumberOfWorkers] = useState("");
  const [specificHazards, setSpecificHazards] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      trade,
      projectDescription,
      projectAddress,
      companyName,
      projectStartDate,
      projectDuration,
      numberOfWorkers,
      specificHazards,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="sssp-trade"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Trade *
        </label>
        <select
          id="sssp-trade"
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
          htmlFor="sssp-projectDescription"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Project Description *
        </label>
        <textarea
          id="sssp-projectDescription"
          required
          rows={3}
          placeholder="e.g., Complete re-roofing of a 2-story colonial home including tear-off, sheathing repair, ice/water shield, and new architectural shingles."
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="sssp-projectAddress"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Project Address *
        </label>
        <input
          id="sssp-projectAddress"
          type="text"
          required
          placeholder="e.g., 456 Maple Ave, Springfield, IL 62704"
          value={projectAddress}
          onChange={(e) => setProjectAddress(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="sssp-companyName"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Company Name (optional)
          </label>
          <input
            id="sssp-companyName"
            type="text"
            placeholder="Your company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="sssp-startDate"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Project Start Date (optional)
          </label>
          <input
            id="sssp-startDate"
            type="text"
            placeholder="e.g., April 15, 2026"
            value={projectStartDate}
            onChange={(e) => setProjectStartDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="sssp-duration"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Estimated Duration (optional)
          </label>
          <input
            id="sssp-duration"
            type="text"
            placeholder="e.g., 5 days"
            value={projectDuration}
            onChange={(e) => setProjectDuration(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="sssp-workers"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Number of Workers (optional)
          </label>
          <input
            id="sssp-workers"
            type="text"
            placeholder="e.g., 4-6"
            value={numberOfWorkers}
            onChange={(e) => setNumberOfWorkers(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="sssp-hazards"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Known Site Hazards (optional)
        </label>
        <textarea
          id="sssp-hazards"
          rows={2}
          placeholder="e.g., Power lines on south side, steep lot, asbestos in existing shingles, limited staging area"
          value={specificHazards}
          onChange={(e) => setSpecificHazards(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <SubmitButton
        loading={loading}
        label="Generate Safety Plan"
      />
    </form>
  );
}

function SubmitButton({
  loading,
  label,
}: {
  loading: boolean;
  label: string;
}) {
  return (
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
          Generating...
        </span>
      ) : (
        label
      )}
    </button>
  );
}

function ToolboxTalkPreview({
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

function JsaPreview({
  document,
  onDownload,
  onReset,
}: {
  document: JsaDocument;
  onDownload: () => void;
  onReset: () => void;
}) {
  const riskColors: Record<string, string> = {
    Low: "text-green-700 bg-green-50 border-green-200",
    Medium: "text-yellow-700 bg-yellow-50 border-yellow-200",
    High: "text-amber-700 bg-amber-50 border-amber-200",
    Critical: "text-red-700 bg-red-50 border-red-200",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Your Job Safety Analysis
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
        <div className="rounded-t-xl bg-blue-800 px-6 py-4 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-blue-200">
                SafetyDocs Pro - Job Safety Analysis
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
            <span
              className={`rounded px-2 py-0.5 text-xs font-semibold ${riskColors[document.overallRiskLevel] ?? "text-gray-700 bg-gray-50"}`}
            >
              Overall: {document.overallRiskLevel}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto px-4 py-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="px-2 py-2 text-xs font-bold uppercase text-blue-800">
                  #
                </th>
                <th className="px-2 py-2 text-xs font-bold uppercase text-blue-800">
                  Task Step
                </th>
                <th className="px-2 py-2 text-xs font-bold uppercase text-blue-800">
                  Hazards
                </th>
                <th className="px-2 py-2 text-xs font-bold uppercase text-blue-800">
                  Risk
                </th>
                <th className="px-2 py-2 text-xs font-bold uppercase text-blue-800">
                  Controls
                </th>
                <th className="px-2 py-2 text-xs font-bold uppercase text-blue-800">
                  PPE
                </th>
              </tr>
            </thead>
            <tbody>
              {document.steps.map((step) => (
                <tr
                  key={step.stepNumber}
                  className="border-b border-gray-100"
                >
                  <td className="px-2 py-3 font-bold text-gray-500">
                    {step.stepNumber}
                  </td>
                  <td className="px-2 py-3 text-gray-900">
                    {step.taskStep}
                  </td>
                  <td className="px-2 py-3 text-gray-700">
                    {step.hazards.join(", ")}
                  </td>
                  <td className="px-2 py-3">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${riskColors[step.riskRating] ?? ""}`}
                    >
                      {step.riskRating}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-gray-700">
                    {step.controlMeasures.join("; ")}
                  </td>
                  <td className="px-2 py-3 text-gray-700">
                    {step.ppeRequired.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

      <div className="text-center">
        <button
          onClick={onDownload}
          className="rounded-lg bg-blue-800 px-8 py-3 text-lg font-semibold text-white shadow transition hover:bg-blue-700"
        >
          Download as PDF
        </button>
        <p className="mt-2 text-sm text-gray-500">
          Print-ready JSA table format with signature lines
        </p>
      </div>
    </div>
  );
}

function SsspPreview({
  document,
  onDownload,
  onReset,
}: {
  document: SsspDocument;
  onDownload: () => void;
  onReset: () => void;
}) {
  const riskColors: Record<string, string> = {
    Low: "text-green-700 bg-green-50 border-green-200",
    Medium: "text-yellow-700 bg-yellow-50 border-yellow-200",
    High: "text-amber-700 bg-amber-50 border-amber-200",
    Critical: "text-red-700 bg-red-50 border-red-200",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Your Site-Specific Safety Plan
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
        <div className="rounded-t-xl bg-blue-800 px-6 py-4 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-blue-200">
                SafetyDocs Pro - Site-Specific Safety Plan
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
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-blue-200">
            <span>Trade: {document.trade}</span>
            <span>Address: {document.projectAddress}</span>
            <span>Workers: {document.numberOfWorkers}</span>
            <span>Duration: {document.projectDuration}</span>
          </div>
        </div>

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

        {document.hazardAssessment.length > 0 && (
          <div className="border-t border-gray-200 px-4 py-4">
            <h4 className="mb-3 px-2 text-sm font-bold uppercase tracking-wide text-blue-800">
              Hazard Assessment
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="px-2 py-2 text-xs font-bold uppercase text-blue-800">
                      Hazard
                    </th>
                    <th className="px-2 py-2 text-xs font-bold uppercase text-blue-800">
                      Risk
                    </th>
                    <th className="px-2 py-2 text-xs font-bold uppercase text-blue-800">
                      Controls
                    </th>
                    <th className="px-2 py-2 text-xs font-bold uppercase text-blue-800">
                      Responsible
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {document.hazardAssessment.map(
                    (entry, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-100"
                      >
                        <td className="px-2 py-2 text-gray-900">
                          {entry.hazard}
                        </td>
                        <td className="px-2 py-2">
                          <span
                            className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${riskColors[entry.riskLevel] ?? ""}`}
                          >
                            {entry.riskLevel}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-gray-700">
                          {entry.controlMeasures.join("; ")}
                        </td>
                        <td className="px-2 py-2 text-gray-700">
                          {entry.responsibleParty}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

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

      <div className="text-center">
        <button
          onClick={onDownload}
          className="rounded-lg bg-blue-800 px-8 py-3 text-lg font-semibold text-white shadow transition hover:bg-blue-700"
        >
          Download as PDF
        </button>
        <p className="mt-2 text-sm text-gray-500">
          Multi-page professional safety plan with signature lines
        </p>
      </div>
    </div>
  );
}

function GeneratePageContent() {
  const searchParams = useSearchParams();
  const initialType =
    (searchParams.get("type") as DocumentType) || "toolbox-talk";

  const [documentType, setDocumentType] =
    useState<DocumentType>(initialType);
  const [formState, setFormState] = useState<FormState>("idle");
  const [toolboxDoc, setToolboxDoc] =
    useState<ToolboxTalkDocument | null>(null);
  const [jsaDoc, setJsaDoc] = useState<JsaDocument | null>(null);
  const [ssspDoc, setSsspDoc] = useState<SsspDocument | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleCheckout(
    formData: Record<string, string>
  ) {
    setFormState("paying");
    setErrorMessage("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentType, formData }),
      });

      const result = (await res.json()) as
        | { url: string }
        | { error: string };

      if (!res.ok || "error" in result) {
        const msg =
          "error" in result
            ? result.error
            : "Failed to start checkout";
        setErrorMessage(msg);
        setFormState("error");
        return;
      }

      if ("url" in result && result.url) {
        window.location.href = result.url;
      }
    } catch {
      setErrorMessage(
        "Failed to connect to payment service. Generating document directly..."
      );
      await handleGenerateDirect(formData);
    }
  }

  async function handleGenerateDirect(
    formData: Record<string, string>
  ) {
    setFormState("loading");
    setErrorMessage("");

    const endpointMap: Record<DocumentType, string> = {
      jsa: "/api/generate-jsa",
      sssp: "/api/generate-sssp",
      "toolbox-talk": "/api/generate-toolbox-talk",
    };
    const endpoint = endpointMap[documentType];

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as
        | GenerateResponse
        | JsaGenerateResponse
        | SsspGenerateResponse
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

      if (documentType === "sssp" && "document" in result) {
        setSsspDoc(result.document as SsspDocument);
      } else if (documentType === "jsa" && "document" in result) {
        setJsaDoc(result.document as JsaDocument);
      } else if ("document" in result) {
        setToolboxDoc(result.document as ToolboxTalkDocument);
      }
      setFormState("success");
    } catch {
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
      setFormState("error");
    }
  }

  async function handleSubmit(formData: Record<string, string>) {
    // Try Stripe checkout first; fall back to direct generation
    // if Stripe is not configured (dev/dry-run mode)
    await handleCheckout(formData);
  }

  function handleDownloadToolbox() {
    if (!toolboxDoc) return;
    const pdf = generateToolboxTalkPdf(toolboxDoc);
    const slug = toolboxDoc.trade
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    const dateSlug = toolboxDoc.date.replace(/[^a-z0-9]+/gi, "-");
    pdf.save(`toolbox-talk-${slug}-${dateSlug}.pdf`);
  }

  function handleDownloadJsa() {
    if (!jsaDoc) return;
    const pdf = generateJsaPdf(jsaDoc);
    const slug = jsaDoc.trade
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    const dateSlug = jsaDoc.date.replace(/[^a-z0-9]+/gi, "-");
    pdf.save(`jsa-${slug}-${dateSlug}.pdf`);
  }

  function handleDownloadSssp() {
    if (!ssspDoc) return;
    const pdf = generateSsspPdf(ssspDoc);
    const slug = ssspDoc.trade
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    const dateSlug = ssspDoc.date.replace(/[^a-z0-9]+/gi, "-");
    pdf.save(`sssp-${slug}-${dateSlug}.pdf`);
  }

  function handleReset() {
    setFormState("idle");
    setToolboxDoc(null);
    setJsaDoc(null);
    setSsspDoc(null);
    setErrorMessage("");
  }

  const price = DOCUMENT_PRICES.find(
    (p) => p.type === documentType
  );
  const priceLabel = price
    ? `$${(price.price / 100).toFixed(0)}`
    : "";
  const docLabelMap: Record<DocumentType, string> = {
    jsa: "Job Safety Analysis",
    sssp: "Site-Specific Safety Plan",
    "toolbox-talk": "Toolbox Talk",
  };
  const docLabel = docLabelMap[documentType];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {formState !== "success" && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Generate a Safety Document
              </h1>
              <p className="mt-2 text-gray-600">
                Select your document type, fill in your project
                details, and get a professional OSHA-compliant document
                with regulation citations.
              </p>
            </div>

            <DocumentTypeSelector
              selected={documentType}
              onChange={setDocumentType}
            />

            {formState === "error" && errorMessage && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {errorMessage}
              </div>
            )}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {docLabel} Details
                </h2>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                  {priceLabel}
                </span>
              </div>
              {documentType === "toolbox-talk" && (
                <ToolboxTalkForm
                  onSubmit={handleSubmit}
                  loading={
                    formState === "loading" || formState === "paying"
                  }
                />
              )}
              {documentType === "jsa" && (
                <JsaForm
                  onSubmit={handleSubmit}
                  loading={
                    formState === "loading" || formState === "paying"
                  }
                />
              )}
              {documentType === "sssp" && (
                <SsspForm
                  onSubmit={handleSubmit}
                  loading={
                    formState === "loading" || formState === "paying"
                  }
                />
              )}
            </div>
          </>
        )}

        {formState === "success" && toolboxDoc && (
          <ToolboxTalkPreview
            document={toolboxDoc}
            onDownload={handleDownloadToolbox}
            onReset={handleReset}
          />
        )}

        {formState === "success" && jsaDoc && (
          <JsaPreview
            document={jsaDoc}
            onDownload={handleDownloadJsa}
            onReset={handleReset}
          />
        )}

        {formState === "success" && ssspDoc && (
          <SsspPreview
            document={ssspDoc}
            onDownload={handleDownloadSssp}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <GeneratePageContent />
    </Suspense>
  );
}
