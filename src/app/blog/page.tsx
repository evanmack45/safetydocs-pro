import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Safety Blog for Contractors",
  description:
    "Practical OSHA compliance guides, toolbox talk tips, and safety documentation help for small residential construction subcontractors.",
  alternates: {
    canonical: "https://safetydocspro.com/blog",
  },
  openGraph: {
    title: "Safety Blog for Contractors | SafetyDocs Pro",
    description:
      "Practical OSHA compliance guides, toolbox talk tips, and safety documentation help for small residential construction subcontractors.",
    type: "website",
  },
};

const posts = [
  {
    slug: "how-to-pass-osha-inspection",
    title:
      "How to Pass an OSHA Inspection: A Small Contractor's Checklist",
    description:
      "A practical checklist for small residential contractors to prepare for OSHA inspections. What inspectors look for, documents you need, penalty tiers, and how to stay ready year-round.",
    date: "April 2, 2026",
    readTime: "10 min",
  },
  {
    slug: "nail-gun-safety-osha-requirements",
    title:
      "Nail Gun Safety: OSHA Requirements and Toolbox Talk Guide",
    description:
      "Nail gun safety requirements for construction workers. Sequential vs contact triggers, required PPE, common injuries, and a ready-to-use toolbox talk outline.",
    date: "April 2, 2026",
    readTime: "9 min",
  },
  {
    slug: "scaffolding-safety-residential-construction",
    title:
      "Scaffolding Safety for Residential Construction: What OSHA Requires",
    description:
      "OSHA scaffolding requirements for residential contractors. When scaffolding is required vs ladders, guardrail rules, competent person designation, and 29 CFR 1926.451.",
    date: "April 2, 2026",
    readTime: "9 min",
  },
  {
    slug: "trench-safety-small-contractors",
    title:
      "Trench Safety for Small Contractors: OSHA Excavation Requirements",
    description:
      "OSHA trench and excavation safety requirements for small contractors. When trench protection is required, soil types, protective systems, and the competent person rule.",
    date: "April 2, 2026",
    readTime: "10 min",
  },
  {
    slug: "electrical-safety-construction-sites",
    title:
      "Electrical Safety on Construction Sites: A Contractor's Checklist",
    description:
      "Electrical safety requirements for construction contractors. GFCI requirements, lockout/tagout basics, cord management, and how to keep your crew compliant.",
    date: "April 2, 2026",
    readTime: "9 min",
  },
  {
    slug: "ladder-safety-construction-workers",
    title:
      "Ladder Safety for Construction Workers: OSHA Rules and Best Practices",
    description:
      "OSHA ladder safety requirements for construction explained in plain language. The 4:1 rule, 3-point contact, inspection checklists, and how to keep your crew compliant.",
    date: "April 2, 2026",
    readTime: "8 min",
  },
  {
    slug: "toolbox-talk-topics-construction",
    title:
      "25 OSHA Toolbox Talk Topics for Construction Crews",
    description:
      "A complete list of 25 toolbox talk topics for construction, organized by hazard type. Each topic includes what to cover and the relevant OSHA standard.",
    date: "April 2, 2026",
    readTime: "12 min",
  },
  {
    slug: "osha-silica-dust-rule-construction",
    title:
      "OSHA Silica Dust Rule for Construction: Table 1 Compliance Explained",
    description:
      "How to comply with OSHA's silica dust rule (29 CFR 1926.1153) on construction sites. Table 1 explained in plain language for small contractors.",
    date: "April 2, 2026",
    readTime: "10 min",
  },
  {
    slug: "fall-protection-residential-roofers",
    title:
      "Fall Protection for Residential Roofers: OSHA Requirements Explained",
    description:
      "What OSHA requires for fall protection on residential roofing jobs. The 6-foot rule, alternative procedures, and how to keep your crew compliant.",
    date: "April 2, 2026",
    readTime: "9 min",
  },
  {
    slug: "heat-illness-prevention-construction",
    title:
      "Heat Illness Prevention on Construction Sites: A Toolbox Talk Guide",
    description:
      "How to prevent heat stroke, heat exhaustion, and heat cramps on construction jobsites. OSHA requirements, warning signs, and a practical toolbox talk outline.",
    date: "April 2, 2026",
    readTime: "8 min",
  },
  {
    slug: "site-specific-safety-plan-sssp",
    title:
      "How to Create a Site-Specific Safety Plan (SSSP) for Small Contractors",
    description:
      "Step-by-step guide to writing a Site-Specific Safety Plan for residential construction. What to include, when you need one, and how to avoid common mistakes.",
    date: "April 2, 2026",
    readTime: "10 min",
  },
  {
    slug: "what-is-a-toolbox-talk",
    title: "What Is a Toolbox Talk? A Simple Guide for Contractors",
    description:
      "Learn what toolbox talks are, why OSHA expects them, and how to run one in 10 minutes before your crew starts work.",
    date: "April 2, 2026",
    readTime: "7 min",
  },
  {
    slug: "osha-requirements-small-contractors",
    title:
      "OSHA Requirements for Small Contractors: What You Actually Need",
    description:
      "Cut through the confusion. Here is exactly what OSHA requires from residential subcontractors with fewer than 20 employees.",
    date: "April 2, 2026",
    readTime: "8 min",
  },
  {
    slug: "jsa-template-construction",
    title:
      "Free JSA Template for Construction: How to Do a Job Safety Analysis",
    description:
      "Step-by-step guide to writing a Job Safety Analysis for construction work, with a free template you can use today.",
    date: "April 2, 2026",
    readTime: "9 min",
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="blog" />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Safety Blog for Contractors
          </h1>
          <p className="text-lg text-gray-600">
            Practical OSHA compliance guides written for residential
            subcontractors. No legal jargon, no fluff — just what you
            need to keep your crew safe and your business protected.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-gray-200 p-6 transition hover:border-blue-300 hover:shadow-md"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="mb-2 text-xl font-semibold text-gray-900 hover:text-blue-800">
                  {post.title}
                </h2>
                <p className="mb-3 text-gray-600">
                  {post.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <time>{post.date}</time>
                  <span>{post.readTime} read</span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-xl bg-gradient-to-r from-blue-900 to-blue-800 p-8 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">
            Need OSHA Documents Now?
          </h2>
          <p className="mb-6 text-blue-100">
            Skip the research. SafetyDocs Pro generates professional
            toolbox talks, JSAs, and safety plans tailored to your
            trade.
          </p>
          <Link
            href="/generate"
            className="inline-block rounded-lg bg-amber-500 px-6 py-3 font-semibold text-gray-900 transition hover:bg-amber-400"
          >
            Generate a Document
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
