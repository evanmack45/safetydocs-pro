import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "FAQ - OSHA Compliance Document Generation Questions Answered",
  description:
    "Frequently asked questions about AI-generated OSHA safety documents, toolbox talks, JSAs, and compliance for residential construction subcontractors.",
  alternates: {
    canonical: "https://safetydocspro.com/faq",
  },
  openGraph: {
    title: "FAQ - SafetyDocs Pro",
    description:
      "Common questions about AI-generated OSHA compliance documents for construction contractors.",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    question:
      "What types of OSHA safety documents can SafetyDocs Pro generate?",
    answer:
      "SafetyDocs Pro generates three types of documents: Toolbox Talks (daily safety meeting topics), Job Safety Analyses (JSAs) that break down tasks into steps with hazard controls, and Site-Specific Safety Plans (SSSPs) for project-level compliance. All documents reference the applicable OSHA 29 CFR 1926 regulations for residential construction.",
  },
  {
    question:
      "Are AI-generated safety documents accepted by OSHA inspectors?",
    answer:
      "OSHA does not prescribe a specific format or authoring method for safety documentation. What matters is that your documents accurately address the hazards present on your jobsite, cite the correct regulations, and are used in actual safety meetings. SafetyDocs Pro generates documents with proper OSHA regulation citations and trade-specific hazard analysis. We recommend reviewing each document for site-specific accuracy before use.",
  },
  {
    question:
      "How much does it cost to generate an OSHA compliance document?",
    answer:
      "SafetyDocs Pro uses simple per-document pricing with no subscriptions or hidden fees. Toolbox Talks start at $29, Job Safety Analyses at $49, and Site-Specific Safety Plans at $79. You only pay for what you need. Visit our pricing page for full details.",
  },
  {
    question:
      "How long does it take to generate a safety document?",
    answer:
      "Most documents are generated in under 60 seconds. You enter your trade, describe the work being performed, and note any specific hazards. The AI creates a professional document with correct OSHA citations, which you can download as a print-ready PDF immediately.",
  },
  {
    question:
      "Can I customize the generated documents for my specific jobsite?",
    answer:
      "Yes. When you generate a document, you provide details about your specific trade, the work being performed, and any particular hazards on your site. The AI uses this information to create tailored content rather than generic templates. You can also edit the generated document before downloading the final PDF.",
  },
  {
    question:
      "Do I need a subscription to use SafetyDocs Pro?",
    answer:
      "No. SafetyDocs Pro uses per-document pricing. There are no monthly fees, no contracts, and no minimum purchases. Generate one document or fifty -- you only pay for what you use. This makes it ideal for small subcontractors who need documents on demand.",
  },
  {
    question:
      "What trades and construction activities does SafetyDocs Pro cover?",
    answer:
      "SafetyDocs Pro covers all common residential construction trades including framing, roofing, electrical, plumbing, HVAC, concrete, drywall, painting, siding, insulation, and general carpentry. The AI is trained on OSHA 29 CFR 1926 standards and generates hazard-specific content for each trade's typical activities.",
  },
  {
    question:
      "How accurate are the OSHA regulation citations in generated documents?",
    answer:
      "SafetyDocs Pro references current OSHA 29 CFR 1926 standards for construction. Each document includes specific regulation numbers relevant to the hazards identified for your work. However, regulations can change, and every jobsite is unique. We strongly recommend reviewing all documents for accuracy and consulting a qualified safety professional for complex or unusual situations.",
  },
  {
    question:
      "Can I use SafetyDocs Pro on my phone at the jobsite?",
    answer:
      "Yes. SafetyDocs Pro is fully mobile-responsive and designed for use on phones and tablets. Contractors often need to generate a quick toolbox talk in the morning before work starts. You can generate, review, and download a PDF right from your phone on the jobsite.",
  },
  {
    question:
      "What if I need help or have a question about a generated document?",
    answer:
      "We provide email support for all customers. If you have questions about a generated document, need help with a specific trade scenario, or want to report an issue, reach out and we will respond within one business day. SafetyDocs Pro is built by people who understand construction safety requirements.",
  },
];

function FAQPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  // JSON-LD requires dangerouslySetInnerHTML per Next.js docs.
  // Content is hardcoded static schema data, not user input -- safe from XSS.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group border-b border-gray-200 py-6">
      <summary className="flex cursor-pointer items-center justify-between text-left text-lg font-semibold text-gray-900 hover:text-blue-800">
        {question}
        <svg
          className="ml-4 h-5 w-5 shrink-0 text-gray-400 transition group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </summary>
      <p className="mt-4 leading-relaxed text-gray-600">{answer}</p>
    </details>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <FAQPageJsonLd />
      <main className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-center text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="mb-12 text-center text-lg text-gray-600">
            Everything you need to know about generating OSHA
            compliance documents with SafetyDocs Pro.
          </p>

          <div>
            {FAQ_ITEMS.map((item) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>

          <div className="mt-12 rounded-xl bg-blue-50 p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Ready to Generate Your First Document?
            </h2>
            <p className="mb-6 text-gray-600">
              Stop spending hours on safety paperwork. Get a
              professional, OSHA-compliant document in under 60
              seconds.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/generate"
                className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-gray-900 transition hover:bg-amber-400"
              >
                Generate a Document
              </Link>
              <Link
                href="/pricing"
                className="rounded-lg border border-blue-800 px-6 py-3 font-semibold text-blue-800 transition hover:bg-blue-800 hover:text-white"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
