function TrustBadge({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white px-5 py-3 shadow-sm">
      <div className="text-blue-800">{icon}</div>
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  trade,
}: {
  quote: string;
  name: string;
  trade: string;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex gap-1 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="mb-4 text-gray-700">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{trade}</p>
      </div>
    </div>
  );
}

// Placeholder testimonials -- replace with real customer quotes post-launch
const TESTIMONIALS = [
  {
    quote:
      "I used to spend Sunday nights writing toolbox talks. Now I generate one in under a minute and it cites the exact OSHA regs for my framing crew.",
    name: "Mike Delvecchio",
    trade: "Framing Subcontractor, Dallas TX",
  },
  {
    quote:
      "Got an OSHA inspection last month. The inspector was impressed with our JSA documentation. SafetyDocs Pro paid for itself ten times over.",
    name: "Rosa Gutierrez",
    trade: "Electrical Subcontractor, Phoenix AZ",
  },
  {
    quote:
      "My GC started requiring daily toolbox talks on every job. This tool is the only reason I can keep up without hiring a safety officer.",
    name: "James Whitfield",
    trade: "Roofing Contractor, Charlotte NC",
  },
];

export default function SocialProof() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Trusted by Contractors Nationwide
        </h2>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <TrustBadge
            icon={
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            }
            label="OSHA 29 CFR 1926 Compliant"
          />
          <TrustBadge
            icon={
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            }
            label="Used by 100+ Contractors"
          />
          <TrustBadge
            icon={
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            }
            label="Generated in Under 60 Seconds"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard
              key={t.name}
              quote={t.quote}
              name={t.name}
              trade={t.trade}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
