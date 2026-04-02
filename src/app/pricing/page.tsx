import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { DOCUMENT_PRICES } from "@/lib/types";

export const metadata: Metadata = {
  title: "Pricing - Per-Document OSHA Compliance Documents",
  description:
    "Simple per-document pricing for OSHA toolbox talks ($29), Job Safety Analyses ($49), and Site-Specific Safety Plans ($79). No subscriptions.",
  alternates: {
    canonical: "https://safetydocspro.com/pricing",
  },
  openGraph: {
    title: "Pricing - SafetyDocs Pro",
    description:
      "Simple per-document pricing for OSHA compliance documents. No subscriptions, no hidden fees.",
    type: "website",
  },
};

function PricingCard({
  type,
  name,
  price,
  description,
  features,
  highlighted,
}: {
  type: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted: boolean;
}) {
  const priceDisplay = (price / 100).toFixed(0);

  return (
    <div
      className={`relative rounded-2xl border-2 p-8 ${
        highlighted
          ? "border-amber-400 bg-white shadow-xl"
          : "border-gray-200 bg-white shadow-sm"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-sm font-semibold text-gray-900">
          Most Comprehensive
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">
          ${priceDisplay}
        </span>
        <span className="text-gray-500"> / document</span>
      </div>
      <ul className="mb-8 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/generate?type=${type}`}
        className={`block w-full rounded-lg px-6 py-3 text-center text-lg font-semibold shadow transition ${
          highlighted
            ? "bg-amber-500 text-gray-900 hover:bg-amber-400"
            : "bg-blue-800 text-white hover:bg-blue-700"
        }`}
      >
        Generate {name}
      </Link>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Simple, Per-Document Pricing
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Pay only for what you need. No subscriptions, no hidden fees.
            Professional OSHA compliance documents generated in seconds.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {DOCUMENT_PRICES.map((doc) => (
            <PricingCard
              key={doc.type}
              type={doc.type}
              name={doc.name}
              price={doc.price}
              description={doc.description}
              features={doc.features}
              highlighted={doc.type === "sssp"}
            />
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Why Contractors Choose SafetyDocs Pro
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-blue-800">
                &lt; 60 sec
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Average generation time
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-800">
                29 CFR 1926
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Accurate OSHA citations
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-800">
                $16,131+
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Minimum OSHA fine avoided
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
