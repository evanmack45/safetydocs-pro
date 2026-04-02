export default function Footer() {
  return (
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
  );
}
