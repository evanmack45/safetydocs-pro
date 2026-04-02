import Link from "next/link";

interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  publishDate: string;
  readTime: string;
}

export default function BlogLayout({
  children,
  title,
  description,
  publishDate,
  readTime,
}: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-blue-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-bold text-white"
          >
            SafetyDocs Pro
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-sm font-medium text-blue-200 transition hover:text-white"
            >
              Blog
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-blue-200 transition hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/generate"
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-amber-400"
            >
              Generate Document
            </Link>
          </nav>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <Link
            href="/blog"
            className="mb-4 inline-flex items-center gap-1 text-sm text-blue-800 hover:underline"
          >
            &larr; Back to Blog
          </Link>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mb-4 text-lg text-gray-600">{description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime={publishDate}>{publishDate}</time>
            <span>{readTime} read</span>
          </div>
        </div>

        <div className="prose prose-lg prose-blue max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-800 prose-strong:text-gray-900">
          {children}
        </div>

        <div className="mt-12 rounded-xl bg-gradient-to-r from-blue-900 to-blue-800 p-8 text-center text-white">
          <h2 className="mb-3 text-2xl font-bold">
            Stop Searching for Templates
          </h2>
          <p className="mb-6 text-blue-100">
            SafetyDocs Pro generates custom OSHA compliance documents
            tailored to your trade and project. Ready in seconds.
          </p>
          <Link
            href="/generate"
            className="inline-block rounded-lg bg-amber-500 px-6 py-3 font-semibold text-gray-900 transition hover:bg-amber-400"
          >
            Generate Your Document Now
          </Link>
        </div>
      </article>

      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          <p className="mb-2 font-semibold text-gray-700">
            SafetyDocs Pro
          </p>
          <p>
            AI-generated documents are starting points. Always review
            for accuracy and consult a qualified safety professional
            for complex situations.
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} SafetyDocs Pro. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
