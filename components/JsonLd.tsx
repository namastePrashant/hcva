import { SITE_NAME, SITE_ORIGIN, SITE_TAGLINE } from "@/app/seo";

/** Render one JSON-LD block. Kept server-only; never receives user input. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Site-wide Organization + WebSite graph. Rendered once in the root layout. */
export function SiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: SITE_NAME,
        alternateName: "HCVA",
        url: `${SITE_ORIGIN}/`,
        logo: `${SITE_ORIGIN}/hcva-logo.jpeg`,
        description: SITE_TAGLINE,
        parentOrganization: {
          "@type": "Organization",
          name: "Aria Technologies",
        },
        areaServed: ["Nepal", "South Asia", "Worldwide"],
        knowsAbout: [
          "Cash and Voucher Assistance",
          "Humanitarian cash transfers",
          "Digital payments",
          "Anticipatory action",
          "Humanitarian programme management",
        ],
        sameAs: ["https://lali360.com/"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: SITE_NAME,
        description: SITE_TAGLINE,
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        inLanguage: "en",
      },
    ],
  };
  return <JsonLd data={data} />;
}

type Crumb = { name: string; path: string };

/** BreadcrumbList for an internal page. Pass the trail from home to current. */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_ORIGIN}${item.path === "/" ? "/" : item.path.replace(/\/$/, "")}`,
    })),
  };
  return <JsonLd data={data} />;
}

type ArticleInput = {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  section?: string;
  image?: string;
};

/** Article schema for an HCVA Insights entry. */
export function ArticleJsonLd({
  headline,
  description,
  path,
  datePublished,
  section,
  image = "/og-hcva.png",
}: ArticleInput) {
  const url = `${SITE_ORIGIN}${path.replace(/\/$/, "")}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    ...(section ? { articleSection: section } : {}),
    image: `${SITE_ORIGIN}${image}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: { "@id": `${SITE_ORIGIN}/#organization` },
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    isAccessibleForFree: true,
  };
  return <JsonLd data={data} />;
}
