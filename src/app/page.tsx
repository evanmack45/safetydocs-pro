import Link from "next/link";

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-300">
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            Built for Residential Construction Subs
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            OSHA Toolbox Talks
            <br />
            <span className="text-amber-400">Generated in Seconds</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-100 sm:text-xl">
            Stop spending hours writing safety documents. SafetyDocs Pro uses AI
            to generate professional, OSHA-compliant toolbox talks tailored to
            your trade and project. Download as PDF instantly.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/generate"
              className="rounded-lg bg-amber-500 px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition hover:bg-amber-400"
            >
              Generate a Toolbox Talk — Free
            </Link>
            <a
              href="#how-it-works"
              className="rounded-lg border border-white/30 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
            >
              See How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PainPointSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          Sound Familiar?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: "clock",
              title: "Hours Wasted on Paperwork",
              description:
                "You're a skilled contractor, not a technical writer. But OSHA requires documented safety meetings before work starts.",
            },
            {
              icon: "dollar",
              title: "Expensive Safety Consultants",
              description:
                "Hiring a safety consultant costs $500-2,000+ per visit. For a small sub doing residential work, that kills margins.",
            },
            {
              icon: "warning",
              title: "Citation Risk",
              description:
                "OSHA fines for missing documentation start at $16,131 per violation. A single jobsite inspection can bankrupt a small operation.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <IconBadge type={item.icon} />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconBadge({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    clock: (
      <svg className="mb-4 h-10 w-10 text-blue-800" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    dollar: (
      <svg className="mb-4 h-10 w-10 text-blue-800" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    warning: (
      <svg className="mb-4 h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
  };
  return icons[type] ?? null;
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          Three Steps to Compliance
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Enter Your Project Details",
              description:
                "Select your trade, describe the work, and note any specific hazards. Takes 30 seconds.",
            },
            {
              step: "2",
              title: "AI Generates Your Document",
              description:
                "Our AI creates a professional toolbox talk with correct OSHA regulation citations, specific to your trade and project.",
            },
            {
              step: "3",
              title: "Download PDF & Go to Work",
              description:
                "Download a print-ready PDF. Use it at your morning safety meeting. Keep a copy for your records.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-800 text-xl font-bold text-white">
                {item.step}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/generate"
            className="inline-block rounded-lg bg-blue-800 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            Generate Your First Toolbox Talk
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
        <p className="mb-2 font-semibold text-gray-700">SafetyDocs Pro</p>
        <p>
          AI-generated documents are starting points. Always review for accuracy
          and consult a qualified safety professional for complex situations.
        </p>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} SafetyDocs Pro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PainPointSection />
      <HowItWorksSection />
      <Footer />
    </main>
  );
}
