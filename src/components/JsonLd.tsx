interface OrganizationJsonLdProps {
  name: string;
  url: string;
  description: string;
}

export function OrganizationJsonLd({
  name,
  url,
  description,
}: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    description,
    sameAs: [],
  };

  // JSON-LD requires dangerouslySetInnerHTML per Next.js docs.
  // Content is static schema data, not user input -- safe from XSS.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  publisherName: string;
  publisherUrl: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  publisherName,
  publisherUrl,
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      url: publisherUrl,
    },
  };

  // JSON-LD requires dangerouslySetInnerHTML per Next.js docs.
  // Content is static schema data, not user input -- safe from XSS.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
