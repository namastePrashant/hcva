import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InternalHeader from "@/components/InternalHeader";
import InternalFooter from "@/components/InternalFooter";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { insights } from "@/data/insights";
import { pageMetadata } from "../../seo";

export function generateStaticParams() {
  return insights.map((item) => ({ slug: item.slug }));
}

/** "26 August 2026" -> "2026-08-26"; falls back to the raw string. */
function toIsoDate(value: string): string {
  const parsed = new Date(`${value} UTC`);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toISOString().slice(0, 10);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) return {};

  return pageMetadata({
    title: `${article.title} | HCVA Insights`,
    description: article.dek,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: toIsoDate(article.date),
  });
}

export default async function InsightArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
      />
      <ArticleJsonLd
        headline={article.title}
        description={article.dek}
        path={`/insights/${article.slug}`}
        datePublished={toIsoDate(article.date)}
        section={article.category}
      />
      <InternalHeader />
      <main className="article-page">
        <header>
          <a href="/insights">← All insights</a>
          <p className="kicker">{article.category}</p>
          <h1>{article.title}</h1>
          <p>{article.dek}</p>
          <div>
            {article.date} · {article.readTime} · Humanitarian CVA
          </div>
        </header>
        <div className="article-layout">
          <article>
            <section className="key-takeaways">
              <span>Key takeaways</span>
              {article.takeaways.map((item) => (
                <p key={item}>→ {item}</p>
              ))}
            </section>
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
          </article>
          <aside>
            <span>Further reading</span>
            {article.sources.map((source) => (
              <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                {source.label} ↗
              </a>
            ))}
            <a className="aside-hub" href="/learning">
              Visit the learning hub →
            </a>
          </aside>
        </div>
        <nav className="article-next">
          <a href="/insights">More from HCVA Insights →</a>
        </nav>
      </main>
      <InternalFooter />
    </>
  );
}
