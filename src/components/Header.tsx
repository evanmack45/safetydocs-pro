import Link from "next/link";

interface HeaderProps {
  variant?: "default" | "blog";
}

export default function Header({ variant = "default" }: HeaderProps) {
  const isBlog = variant === "blog";
  const bgClass = isBlog
    ? "border-b border-gray-200 bg-blue-900"
    : "border-b border-gray-200 bg-white";
  const logoClass = isBlog
    ? "text-xl font-bold text-white"
    : "text-xl font-bold text-blue-800";
  const linkClass = isBlog
    ? "text-sm font-medium text-blue-200 transition hover:text-white"
    : "text-sm text-gray-600 hover:text-blue-800";
  const activeLinkClass = isBlog
    ? "text-sm font-medium text-white"
    : "text-sm font-medium text-blue-800";

  return (
    <header className={bgClass}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className={logoClass}>
          SafetyDocs Pro
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className={isBlog ? activeLinkClass : linkClass}
          >
            Blog
          </Link>
          <Link
            href="/pricing"
            className={linkClass}
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
  );
}
