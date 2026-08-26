"use client";

import { FormEvent, useMemo, useState } from "react";

type Resource = {
  title: string;
  provider: string;
  format: string;
  level: "Foundation" | "Intermediate" | "Advanced";
  topic: string;
  duration: string;
  description: string;
  url: string;
  featured?: boolean;
};

const resources: Resource[] = [
  {
    title: "Cash and Voucher Assistance — The Fundamentals",
    provider: "Kaya · CALP Network",
    format: "Self-paced course",
    level: "Foundation",
    topic: "CVA essentials",
    duration: "2–3 hours",
    description: "Build a practical understanding of CVA terminology, feasibility, modalities, and the humanitarian project cycle.",
    url: "https://kayaconnect.org/course/info.php?id=496",
    featured: true,
  },
  {
    title: "Implementing a Successful Voucher Program",
    provider: "DisasterReady",
    format: "Interactive course",
    level: "Foundation",
    topic: "Voucher design",
    duration: "Self-paced",
    description: "Learn the keys to designing a voucher programme and practise decisions through a humanitarian simulation.",
    url: "https://www.disasterready.org/cash-voucher-assistance-courses",
  },
  {
    title: "A Practical Guide to Market Analysis",
    provider: "DisasterReady · IRC · CALP",
    format: "Scenario course",
    level: "Intermediate",
    topic: "Market analysis",
    duration: "Self-paced",
    description: "Work through the common steps of market assessment using a fictional emergency scenario.",
    url: "https://www.disasterready.org/cash-voucher-assistance-courses",
  },
  {
    title: "Introduction to Market Analysis",
    provider: "DisasterReady · IRC · CALP",
    format: "Online course",
    level: "Foundation",
    topic: "Market analysis",
    duration: "Self-paced",
    description: "Understand why markets matter in crises and get oriented to the emergency market-assessment process.",
    url: "https://www.disasterready.org/cash-voucher-assistance-courses",
  },
  {
    title: "CVA and Child Protection e-Course",
    provider: "Kaya · Alliance CPHA",
    format: "Certificate course",
    level: "Intermediate",
    topic: "Protection",
    duration: "4 × 90 min",
    description: "Connect CVA with child-protection assessment, programme design, safeguarding, and implementation.",
    url: "https://kayaconnect.org/enrol/index.php?id=13009",
  },
  {
    title: "Disability Inclusive CVA",
    provider: "Kaya · CBM Global · CALP",
    format: "Certificate course",
    level: "Intermediate",
    topic: "Inclusion",
    duration: "Approx. 3 hours",
    description: "Cover disability data, participation, extra costs, and accessible CVA service delivery.",
    url: "https://kayaconnect.org/course/view.php?id=4875",
  },
  {
    title: "Cash 101: CVA Explained",
    provider: "CALP Network",
    format: "Learning guide",
    level: "Foundation",
    topic: "CVA essentials",
    duration: "Reference",
    description: "A plain-language starting point for the core ideas and questions behind humanitarian cash assistance.",
    url: "https://www.calpnetwork.org/uk/key-resources/",
  },
  {
    title: "Programme Quality Toolbox",
    provider: "CALP Network",
    format: "Toolbox",
    level: "Advanced",
    topic: "Programme quality",
    duration: "Field reference",
    description: "Explore and select quality guidance and tools across the CVA programme cycle.",
    url: "https://www.calpnetwork.org/uk/key-resources/",
    featured: true,
  },
  {
    title: "Glossary of CVA Terminology",
    provider: "CALP Network",
    format: "Glossary",
    level: "Foundation",
    topic: "Terminology",
    duration: "Quick reference",
    description: "Use consistent, harmonised CVA language with the multilingual 2023 terminology reference.",
    url: "https://www.calpnetwork.org/publication/glossary-of-terminology-for-cash-and-voucher-assistance/",
  },
  {
    title: "Data Responsibility Toolkit",
    provider: "CALP Network",
    format: "Toolkit + cases",
    level: "Advanced",
    topic: "Responsible data",
    duration: "Field reference",
    description: "Reduce harm across the CVA data lifecycle with seven practical tipsheets and case studies.",
    url: "https://www.calpnetwork.org/collection/data-responsibility-toolkit-and-case-studies/",
  },
  {
    title: "Organizational Cash Readiness Tool",
    provider: "CALP Network",
    format: "Assessment tool",
    level: "Advanced",
    topic: "Preparedness",
    duration: "Facilitated process",
    description: "Assess organisational readiness, identify gaps, and turn findings into a CVA capacity action plan.",
    url: "https://www.calpnetwork.org/publication/organizational-cash-readiness-tool-ocrt-process-guide/",
  },
];

const topics = ["All", "CVA essentials", "Market analysis", "Protection", "Inclusion", "Programme quality", "Responsible data", "Preparedness"];

const omniReplies: Record<string, string> = {
  beginner: "Start with Kaya’s CVA Fundamentals course, then use CALP’s Cash 101 and Glossary as desk references. Together they cover core terms, feasibility, modalities, and the project cycle.",
  market: "For market skills, begin with DisasterReady’s Introduction to Market Analysis, then move to A Practical Guide to Market Analysis for scenario-based practice.",
  job: "There is one time-sensitive opening in this snapshot: British Red Cross CVA Coordinator — Syria, closing 30 August 2026. Open the Opportunities section for the full summary.",
  event: "The next listed event is the Eastern Africa Dialogue Platform on Anticipatory Action, 28–30 October 2026 in Mombasa, Kenya.",
  protection: "The CVA and Child Protection e-Course is the strongest match. It covers assessment, design, implementation, safeguarding, and age- and gender-specific risks.",
};

function answerOmni(message: string) {
  const value = message.toLowerCase();
  if (value.includes("market")) return omniReplies.market;
  if (value.includes("job") || value.includes("career") || value.includes("opening")) return omniReplies.job;
  if (value.includes("event") || value.includes("conference")) return omniReplies.event;
  if (value.includes("protection") || value.includes("child")) return omniReplies.protection;
  return omniReplies.beginner;
}

export default function Home() {
  const [topic, setTopic] = useState("All");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [omniOpen, setOmniOpen] = useState(false);
  const [omniInput, setOmniInput] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesTopic = topic === "All" || resource.topic === topic;
      const haystack = `${resource.title} ${resource.provider} ${resource.format} ${resource.level} ${resource.topic} ${resource.description}`.toLowerCase();
      return matchesTopic && (!needle || haystack.includes(needle));
    });
  }, [query, topic]);

  const visibleResources = showAll || query || topic !== "All" ? filtered : filtered.slice(0, 6);

  function askOmni(question: string) {
    const clean = question.trim();
    if (!clean) return;
    setConversation([clean, answerOmni(clean)]);
    setOmniInput("");
  }

  function submitOmni(event: FormEvent) {
    event.preventDefault();
    askOmni(omniInput);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand hcva-brand" href="#top" aria-label="Humanitarian CVA home">
          <img src="/hcva-logo.jpeg" alt="HCVA — Humanitarian Cash and Voucher Assistance" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#learn">Learn</a>
          <a href="#events">Events</a>
          <a href="#opportunities">Opportunities</a>
          <a href="#about">About</a>
        </nav>
        <button className="ask-button" onClick={() => setOmniOpen(true)}>Ask Omni <span>↗</span></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Independent · Global · Practical</p>
          <h1>The global home for<br/><em>humanitarian cash.</em></h1>
          <p className="hero-deck">An independent gateway for the global Cash and Voucher Assistance community—bringing trusted knowledge, learning, events, and opportunities into one practical place.</p>
          <div className="hero-actions">
            <a className="primary-cta" href="#learn">Explore the knowledge hub <span>→</span></a>
            <a className="text-cta" href="#opportunities">Browse opportunities</a>
          </div>
          <div className="domain-row"><span>humanitariancva.org</span><span>humanitariancva.com</span></div>
        </div>

        <div className="signal-panel" aria-label="Latest platform signals">
          <div className="panel-topline">
            <span>Live sector signal</span>
            <span className="live"><i /> Updated 26 Aug 2026</span>
          </div>
          <div className="signal-feature">
            <span className="signal-tag">Next event · CALP Network</span>
            <h2>Eastern Africa Dialogue Platform on Anticipatory Action</h2>
            <p>28–30 October · Mombasa, Kenya</p>
          </div>
          <div className="signal-stats">
            <div><strong>11</strong><span>curated resources</span></div>
            <div><strong>01</strong><span>upcoming event</span></div>
            <div><strong>01</strong><span>active opening</span></div>
          </div>
          <div className="source-row">
            <span>Sourced from</span>
            <b>ReliefWeb</b><b>CALP</b><b>Kaya</b><b>DisasterReady</b>
          </div>
        </div>
      </section>

      <section className="orientation-strip" aria-label="Platform sections">
        <a href="#learn"><span>01</span><b>Learn</b><small>Courses, guidance & tools</small><i>↘</i></a>
        <a href="#events"><span>02</span><b>Connect</b><small>Events & community</small><i>↘</i></a>
        <a href="#opportunities"><span>03</span><b>Act</b><small>Jobs & opportunities</small><i>↘</i></a>
        <a href="#five-w"><span>04</span><b>Coordinate</b><small>5W matrix · coming soon</small><i>↘</i></a>
      </section>

      <section className="learning-section" id="learn">
        <div className="section-heading">
          <div>
            <p className="kicker">Knowledge hub</p>
            <h2>Build skill.<br/><em>Apply it well.</em></h2>
          </div>
          <p>One curated path into trusted CVA learning—whether you are meeting humanitarian cash for the first time or strengthening organisation-wide practice.</p>
        </div>

        <div className="resource-toolbar">
          <label className="search-box">
            <span>⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses, tools, topics…" aria-label="Search learning resources" />
            {query && <button onClick={() => setQuery("")} aria-label="Clear search">×</button>}
          </label>
          <div className="topic-filter" aria-label="Filter by topic">
            {topics.map((item) => (
              <button key={item} className={topic === item ? "active" : ""} onClick={() => setTopic(item)}>{item}</button>
            ))}
          </div>
        </div>

        <div className="results-line">
          <span>{filtered.length.toString().padStart(2, "0")} resources</span>
          <span>Curated from trusted sector sources</span>
        </div>

        <div className="resource-grid">
          {visibleResources.map((resource, index) => (
            <article className={`resource-card ${resource.featured ? "featured" : ""}`} key={resource.title}>
              <div className="card-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="card-meta"><span>{resource.level}</span><span>{resource.format}</span></div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <div className="card-facts"><span>{resource.topic}</span><span>{resource.duration}</span></div>
              <a href={resource.url} target="_blank" rel="noreferrer" aria-label={`Open ${resource.title}`}>
                <span>{resource.provider}</span><b>↗</b>
              </a>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <div className="empty-state"><b>No direct match yet.</b><span>Try a broader keyword or choose “All”.</span></div>}
        {!showAll && !query && topic === "All" && <button className="load-more" onClick={() => setShowAll(true)}>View all 11 resources <span>↓</span></button>}
      </section>

      <section className="events-section" id="events">
        <div className="section-heading light-heading">
          <div><p className="kicker">What’s next</p><h2>Meet the ideas.<br/><em>Meet the people.</em></h2></div>
          <p>Join conversations advancing cash practice across humanitarian response, anticipatory action, localisation, and inclusion.</p>
        </div>
        <div className="event-layout">
          <article className="date-card"><span>OCT</span><strong>28</strong><small>→ 30 · 2026</small></article>
          <article className="event-card">
            <div className="event-badges"><span>In person</span><span>English</span></div>
            <p>CALP member event</p>
            <h3>2nd Eastern Africa Dialogue Platform on Anticipatory Action</h3>
            <div className="event-details"><span>⌖ Mombasa, Kenya</span><span>3 days</span></div>
            <a href="https://www.calpnetwork.org/events/find-an-event/events/" target="_blank" rel="noreferrer">View event details <b>↗</b></a>
          </article>
          <aside className="event-note">
            <span className="mini-label">Focus</span>
            <p>“Transforming Risk into Resilience” through localisation, multi-stakeholder coordination, and sustainable finance.</p>
            <a href="https://www.calpnetwork.org/events/find-an-event/events/" target="_blank" rel="noreferrer">Browse all CALP events →</a>
          </aside>
        </div>
      </section>

      <section className="opportunities-section" id="opportunities">
        <div className="section-heading">
          <div><p className="kicker">Work that matters</p><h2>Put your CVA<br/><em>expertise to work.</em></h2></div>
          <p>Time-sensitive roles and calls selected for humanitarian cash practitioners. Always confirm status and eligibility on the source page.</p>
        </div>
        <article className="job-card">
          <div className="job-status"><span><i /> Applications open</span><small>Source snapshot · 26 Aug 2026</small></div>
          <div className="job-main">
            <div><p>British Red Cross</p><h3>Cash and Voucher Assistance (CVA) Coordinator — Syria</h3></div>
            <div className="job-tags"><span>Damascus</span><span>12-month contract</span><span>International</span></div>
          </div>
          <p className="job-description">Provide strategic CVA leadership, strengthen organisational readiness, and support the Syrian Arab Red Crescent to deliver high-quality, scalable cash assistance.</p>
          <div className="job-footer"><div><span>Closing</span><strong>30 Aug 2026</strong></div><div><span>Salary</span><strong>£39,894 + allowance</strong></div><a href="https://reliefweb.int/jobs?search=cash%20and%20voucher" target="_blank" rel="noreferrer">Check on ReliefWeb <b>↗</b></a></div>
        </article>
        <div className="source-actions">
          <a href="https://reliefweb.int/jobs" target="_blank" rel="noreferrer"><span>Browse ReliefWeb jobs</span><b>↗</b></a>
          <a href="https://www.calpnetwork.org/jobs/" target="_blank" rel="noreferrer"><span>Browse CALP opportunities</span><b>↗</b></a>
        </div>
      </section>

      <section className="omni-section" id="omni">
        <div className="omni-orbit"><span>OMNI</span><i /><i /><i /></div>
        <div className="omni-copy">
          <p className="kicker">Your CVA guide</p>
          <h2>Ask a better question.<br/><em>Find a useful next step.</em></h2>
          <p>Omni helps you navigate the curated Humanitarian CVA library—from “where do I start?” to the right toolkit for your programme.</p>
          <div className="prompt-row">
            <button onClick={() => { setOmniOpen(true); askOmni("I’m new to CVA. Where should I begin?"); }}>I’m new to CVA</button>
            <button onClick={() => { setOmniOpen(true); askOmni("Help me learn market analysis"); }}>Learn market analysis</button>
            <button onClick={() => { setOmniOpen(true); askOmni("Show me CVA jobs"); }}>Find a CVA role</button>
          </div>
          <button className="primary-cta omni-cta" onClick={() => setOmniOpen(true)}>Start a conversation <span>→</span></button>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-index">GLOBAL / CVA</div>
        <div>
          <p className="kicker">About Humanitarian CVA</p>
          <h2>An independent global home for the humanitarian cash community.</h2>
        </div>
        <div className="about-copy">
          <p>Humanitarian CVA is an independent global platform created to strengthen the people, knowledge, and coordination behind Cash and Voucher Assistance.</p>
          <p>It grows from the practical humanitarian and technology experience behind Lali360—from assessment and registration through distribution, monitoring, and reporting—while serving the wider cash community beyond any single product or organisation.</p>
          <p>Our purpose is simple: make trusted learning, events, opportunities, tools, and response knowledge easier to discover and apply worldwide.</p>
        </div>
      </section>

      <section className="five-w-section" id="five-w">
        <div><span className="mini-label">Next on the roadmap</span><h2>Who is doing what,<br/>where, when—and for whom?</h2></div>
        <div className="matrix-preview" aria-label="5W matrix preview">
          <span>WHO</span><span>WHAT</span><span>WHERE</span><span>WHEN</span><span>WHOM</span>
          <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
        </div>
        <p>The 5W matrix will turn fragmented response data into a coordinated view of CVA activity. Scope, data model, and access will be shaped with field users next.</p>
      </section>

      <footer>
        <a className="brand hcva-brand footer-brand" href="#top"><img src="/hcva-logo.jpeg" alt="HCVA — Humanitarian Cash and Voucher Assistance" /></a>
        <p><strong>humanitariancva.org</strong><span>Trusted paths into humanitarian cash knowledge.</span></p>
        <div><a href="#learn">Learn</a><a href="#events">Events</a><a href="#opportunities">Opportunities</a><a href="#about">About</a></div>
        <small>© 2026 Humanitarian CVA · humanitariancva.org · humanitariancva.com · Source records remain the property of their publishers.</small>
      </footer>

      <button className="omni-fab" onClick={() => setOmniOpen(!omniOpen)} aria-label={omniOpen ? "Close Omni assistant" : "Open Omni assistant"}><span>{omniOpen ? "×" : "✦"}</span>{!omniOpen && <b>Ask Omni</b>}</button>

      <aside className={`omni-panel ${omniOpen ? "open" : ""}`} aria-hidden={!omniOpen} aria-label="Omni CVA assistant">
        <div className="omni-panel-head"><div><span>✦</span><p><b>Omni</b><small><i /> Curated guide</small></p></div><button onClick={() => setOmniOpen(false)} aria-label="Close Omni">×</button></div>
        <div className="omni-messages">
          <div className="bot-message">Hi—I can point you to learning, events, and opportunities in this curated snapshot. What are you working on?</div>
          {conversation.length > 0 && <><div className="user-message">{conversation[0]}</div><div className="bot-message">{conversation[1]}</div></>}
          {conversation.length === 0 && <div className="chat-suggestions"><button onClick={() => askOmni("I’m new to CVA. Where should I begin?")}>Where should a beginner start?</button><button onClick={() => askOmni("Help me learn market analysis")}>Help me learn market analysis</button><button onClick={() => askOmni("Show me CVA jobs")}>Show me current openings</button></div>}
        </div>
        <form className="omni-input" onSubmit={submitOmni}><input value={omniInput} onChange={(event) => setOmniInput(event.target.value)} placeholder="Ask about CVA…" aria-label="Ask Omni"/><button aria-label="Send question">↑</button></form>
        <small className="omni-disclaimer">Omni answers from the curated Humanitarian CVA snapshot.</small>
      </aside>
    </main>
  );
}
