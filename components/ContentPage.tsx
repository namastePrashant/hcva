import InternalHeader from "./InternalHeader";
import InternalFooter from "./InternalFooter";

type Section = { number: string; title: string; text: string };

export default function ContentPage({ eyebrow, title, intro, sections, aside, cta }: { eyebrow: string; title: string; intro: string; sections: Section[]; aside: string; cta: { label: string; href: string } }) {
  return <><InternalHeader /><main className="internal-page">
    <section className="internal-hero">
      <p className="kicker">{eyebrow}</p><h1>{title}</h1><p>{intro}</p>
      <a className="primary-cta" href={cta.href}>{cta.label} <span>→</span></a>
    </section>
    <section className="content-layout">
      <div className="content-list">{sections.map(section => <article key={section.number}>
        <span>{section.number}</span><div><h2>{section.title}</h2><p>{section.text}</p></div>
      </article>)}</div>
      <aside><span>HCVA perspective</span><p>{aside}</p><a href="/insights">Explore sector insights →</a></aside>
    </section>
  </main><InternalFooter /></>;
}
