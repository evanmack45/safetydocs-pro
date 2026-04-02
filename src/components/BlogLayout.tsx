import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArticleJsonLd } from "@/components/JsonLd";

interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  publishDate: string;
  readTime: string;
  slug: string;
}

const BASE_URL = "https://safetydocspro.com";

export default function BlogLayout({
  children,
  title,
  description,
  publishDate,
  readTime,
  slug,
}: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="blog" />

      <ArticleJsonLd
        title={title}
        description={description}
        url={`${BASE_URL}/blog/${slug}`}
        datePublished={publishDate}
        authorName="SafetyDocs Pro"
        publisherName="SafetyDocs Pro"
        publisherUrl={BASE_URL}
      />

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

      <Footer />
    </div>
  );
}
