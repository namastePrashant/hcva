import type { Metadata } from "next";
import InternalHeader from "@/components/InternalHeader";
import InternalFooter from "@/components/InternalFooter";
import { insights } from "@/data/insights";

export const metadata: Metadata = { title: "Insights on Humanitarian Cash & Voucher Assistance | HCVA", description: "Analysis and practical perspectives on humanitarian cash, digital payments, preparedness, responsible data and CVA in Nepal and South Asia.", alternates: { canonical: "/insights" } };

export default function InsightsPage() {
  const [lead, ...rest] = insights;
  return <><InternalHeader /><main className="insights-page">
    <section className="internal-hero insight-hero"><p className="kicker">HCVA Insights</p><h1>Ideas for better <em>humanitarian cash.</em></h1><p>Original analysis from the intersection of CVA practice, technology and the realities of Nepal and South Asia.</p></section>
    <section className="featured-insight"><div><span>{lead.category} · {lead.date}</span><h2>{lead.title}</h2><p>{lead.dek}</p><a href={`/insights/${lead.slug}`}>Read the analysis →</a></div><aside><b>In this edition</b>{lead.takeaways.map(item => <p key={item}>↳ {item}</p>)}</aside></section>
    <section className="insight-index"><div className="index-heading"><p className="kicker">Latest thinking</p><h2>Research notes, field perspectives and practical guidance.</h2></div><div className="insight-grid">{rest.map((item, index) => <article key={item.slug}><span>0{index + 2} · {item.category}</span><h3>{item.title}</h3><p>{item.dek}</p><div><small>{item.date} · {item.readTime}</small><a href={`/insights/${item.slug}`}>Read →</a></div></article>)}</div></section>
    <section className="editorial-cta"><p className="kicker">Contribute</p><h2>Have a field lesson or a hard CVA question worth exploring?</h2><a href="mailto:insights@humanitariancva.org">Pitch an insight →</a></section>
  </main><InternalFooter /></>;
}
