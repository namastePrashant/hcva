import type { Metadata } from "next";

/**
 * Canonical production origin. Overridable at build/deploy time so preview
 * environments and the secondary .com domain resolve their own absolute URLs.
 */
export const SITE_ORIGIN = (
  process.env.SITE_ORIGIN ?? "https://humanitariancva.org"
).replace(/\/$/, "");

export const SITE_NAME = "Humanitarian CVA";
export const SITE_TAGLINE =
  "Digital systems, advisory and knowledge for better humanitarian cash.";
export const DEFAULT_OG_IMAGE = "/og-hcva.png";

type PageMetaInput = {
  title: string;
  description: string;
  /** Root-relative path, e.g. "/services". */
  path: string;
  /** Defaults to the shared social card. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * Build a consistent Metadata object for a route: canonical URL, Open Graph and
 * Twitter cards all pointing at the same absolute resources.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  const canonicalPath = path === "/" ? "/" : path.replace(/\/$/, "");
  const url = `${SITE_ORIGIN}${canonicalPath}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: image, width: 1731, height: 909, alt: imageAlt ?? title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
