import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InternalHeader from "@/components/InternalHeader";
import InternalFooter from "@/components/InternalFooter";
import { insights } from "@/data/insights";

export function generateStaticParams() { return insights.map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const article = insights.find(item => item.slug === slug); if (!article) return {};
  return { title: `${article.title} | HCVA Insights`, description: article.dek, alternates: { canonical: `/insights/${article.slug}` }, openGraph: { title: article.title, description: article.dek, type: "article", images: [] }, twitter: { title: article.title, description: article.dek, images: [] } };
}
export default async function InsightArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const article = insights.find(item => item.slug === slug); if (!article) notFound();
  return <><InternalHeader /><main className="article-page"><header><a href="/insights">← All insights</a><p className="kicker">{article.category}</p><h1>{article.title}</h1><p>{article.dek}</p><div>{article.date} · {article.readTime} · Humanitarian CVA</div></header><div className="article-layout"><article><section className="key-takeaways"><span>Key takeaways</span>{article.takeaways.map(item => <p key={item}>→ {item}</p>)}</section>{article.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}</section>)}</article><aside><span>Further reading</span>{article.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}<a className="aside-hub" href="/learning">Visit the learning hub →</a></aside></div><nav className="article-next"><a href="/insights">More from HCVA Insights →</a></nav></main><InternalFooter /></>;
}
