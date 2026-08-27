"use client";

import { useMemo, useState } from "react";

type Activity = {
  organization: string;
  activity: string;
  province: string;
  district: string;
  municipality: string;
  phase: string;
  objective: string;
  modality: string;
  target: number;
  status: "Active" | "Planned" | "Completed";
};

const activities: Activity[] = [
  { organization: "Nepal Red Cross", activity: "Multipurpose Cash Assistance", province: "Karnali", district: "Jajarkot", municipality: "Bheri", phase: "Active response", objective: "Meet basic needs of earthquake-affected households.", modality: "Bank transfer", target: 2500, status: "Active" },
  { organization: "WFP", activity: "Cash for Food", province: "Karnali", district: "Rukum West", municipality: "Aathbiskot", phase: "Active response", objective: "Protect food security through cash access.", modality: "Cash transfer", target: 4200, status: "Active" },
  { organization: "Aria Technologies", activity: "Cash Preparedness", province: "Sudurpashchim", district: "Kailali", municipality: "Dhangadhi", phase: "Preparedness", objective: "Pre-position digital workflows for rapid response.", modality: "Digital readiness", target: 1200, status: "Planned" },
  { organization: "Oxfam", activity: "Multipurpose Cash Assistance", province: "Madhesh", district: "Dhanusha", municipality: "Janakpurdham", phase: "Active response", objective: "Support recovery of flood-affected households.", modality: "Mobile money", target: 3000, status: "Active" },
  { organization: "Save the Children", activity: "Cash for Shelter", province: "Bagmati", district: "Sindhupalchok", municipality: "Melamchi", phase: "Recovery", objective: "Support safer repair and reconstruction.", modality: "Bank transfer", target: 1800, status: "Active" },
  { organization: "CARE Nepal", activity: "Cash for Protection", province: "Koshi", district: "Morang", municipality: "Biratnagar", phase: "Preparedness", objective: "Strengthen referral pathways and inclusive assistance.", modality: "Cash transfer", target: 900, status: "Planned" },
  { organization: "UNICEF", activity: "Emergency Cash for Children", province: "Lumbini", district: "Banke", municipality: "Nepalgunj", phase: "Active response", objective: "Protect essential child outcomes after displacement.", modality: "Mobile money", target: 5600, status: "Active" },
  { organization: "Mercy Corps", activity: "Market Recovery Grants", province: "Gandaki", district: "Gorkha", municipality: "Palungtar", phase: "Recovery", objective: "Restore market access and small businesses.", modality: "Bank transfer", target: 1450, status: "Completed" },
];

const provinces = ["All", ...Array.from(new Set(activities.map(item => item.province)))];
const organizations = ["All", ...Array.from(new Set(activities.map(item => item.organization)))];
const phases = ["All", ...Array.from(new Set(activities.map(item => item.phase)))];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export default function FiveWTool() {
  const [province, setProvince] = useState("All");
  const [district, setDistrict] = useState("All");
  const [organization, setOrganization] = useState("All");
  const [phase, setPhase] = useState("All");
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"matrix" | "coverage" | "gaps">("matrix");
  const [showForm, setShowForm] = useState(false);

  const districts = useMemo(() => ["All", ...Array.from(new Set(activities.filter(item => province === "All" || item.province === province).map(item => item.district)))], [province]);
  const filtered = useMemo(() => activities.filter(item => {
    const text = `${item.organization} ${item.activity} ${item.province} ${item.district} ${item.municipality} ${item.modality}`.toLowerCase();
    return (province === "All" || item.province === province)
      && (district === "All" || item.district === district)
      && (organization === "All" || item.organization === organization)
      && (phase === "All" || item.phase === phase)
      && (status === "All" || item.status === status)
      && (!query || text.includes(query.toLowerCase()));
  }), [province, district, organization, phase, status, query]);

  const target = filtered.reduce((sum, item) => sum + item.target, 0);
  const coverage = provinces.slice(1).map(name => ({ name, count: activities.filter(item => item.province === name).length }));

  function clearFilters() {
    setProvince("All"); setDistrict("All"); setOrganization("All"); setPhase("All"); setStatus("All"); setQuery("");
  }

  function downloadCsv() {
    const headings = ["Who", "What", "Province", "District", "Municipality", "When", "Why", "How", "Target", "Status"];
    const lines = filtered.map(item => [item.organization, item.activity, item.province, item.district, item.municipality, item.phase, item.objective, item.modality, item.target, item.status].map(value => `"${String(value).replaceAll('"', '""')}"`).join(","));
    const blob = new Blob([[headings.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = "hcva-5w1h-sample.csv"; link.click(); URL.revokeObjectURL(url);
  }

  return <div className="fivew-app">
    <aside className="fivew-rail" aria-label="5W1H tool sections">
      <div><span>5W1H</span><strong>Coordinate</strong></div>
      <button data-fivew-tab="matrix" className={tab === "matrix" ? "active" : ""} onClick={() => setTab("matrix")}><b>▦</b> Matrix</button>
      <button data-fivew-tab="coverage" className={tab === "coverage" ? "active" : ""} onClick={() => setTab("coverage")}><b>⌖</b> Coverage</button>
      <button data-fivew-tab="gaps" className={tab === "gaps" ? "active" : ""} onClick={() => setTab("gaps")}><b>◫</b> Gap analysis</button>
      <a href="/about"><b>◎</b> About HCVA</a>
      <small>Sample coordination data<br/>Nepal · 2026</small>
    </aside>

    <div className="fivew-workspace">
      <header className="fivew-titlebar">
        <div><p>Planning & coordination tool</p><h1>5W1H Cash Preparedness<br className="mobile-break"/> &amp; Response</h1><span>See who is doing what, where, when, why and how.</span></div>
        <div className="fivew-actions"><button data-fivew-download onClick={downloadCsv}>↓ Download CSV</button><button data-fivew-add className="primary" onClick={() => setShowForm(true)}>＋ Add activity</button></div>
      </header>

      <section className="fivew-live-stage" aria-label="Live coordination activity preview">
        <div className="live-stage-bar"><span><i/> Live coordination pulse</span><b>Sample stream · Nepal</b><em>Auto-updating</em></div>
        <div className="live-stage-body">
          <div className="live-network" aria-hidden="true">
            <div className="network-grid"/>
            <i className="route route-one"/><i className="route route-two"/><i className="route route-three"/>
            <span className="network-node node-one"><b>WHO</b><small>Partners</small></span>
            <span className="network-node node-two"><b>WHERE</b><small>Districts</small></span>
            <span className="network-node node-three"><b>HOW</b><small>Modalities</small></span>
            <span className="network-core"><i>5W1H</i><b>Coordination intelligence</b><small>Signals becoming decisions</small></span>
            <i className="data-packet packet-one"/><i className="data-packet packet-two"/><i className="data-packet packet-three"/>
          </div>
          <div className="live-feed">
            <div className="live-feed-title"><span>Incoming activity records</span><b>● LIVE</b></div>
            <div className="signal-stack">
              <article className="signal-record signal-one"><div><span>01 · ACTIVE RESPONSE</span><b>Just received</b></div><h3>Multipurpose Cash Assistance</h3><p>Nepal Red Cross · Jajarkot, Karnali</p><footer><span>2,500 households</span><strong>Bank transfer</strong></footer></article>
              <article className="signal-record signal-two"><div><span>02 · PREPAREDNESS</span><b>Validated</b></div><h3>Cash Preparedness</h3><p>Aria Technologies · Kailali, Sudurpashchim</p><footer><span>1,200 households</span><strong>Digital readiness</strong></footer></article>
              <article className="signal-record signal-three"><div><span>03 · ACTIVE RESPONSE</span><b>Mapped</b></div><h3>Emergency Cash for Children</h3><p>UNICEF · Banke, Lumbini</p><footer><span>5,600 households</span><strong>Mobile money</strong></footer></article>
            </div>
            <div className="live-progress"><i/><span>Records are illustrative and rotate automatically</span></div>
          </div>
        </div>
      </section>

      <section className="fivew-stats" aria-label="Coordination summary">
        <article><i className="violet">◎</i><div><strong data-fivew-stat="organizations">{new Set(filtered.map(item => item.organization)).size}</strong><span>Organizations</span></div></article>
        <article><i className="green">▤</i><div><strong data-fivew-stat="activities">{filtered.length}</strong><span>Activities</span></div></article>
        <article><i className="orange">⌖</i><div><strong data-fivew-stat="districts">{new Set(filtered.map(item => item.district)).size}</strong><span>Districts</span></div></article>
        <article><i className="blue">◉</i><div><strong data-fivew-stat="target">{formatNumber(target)}</strong><span>Target households</span></div></article>
        <article><i className="pink">▣</i><div><strong>2026</strong><span>Active year</span></div></article>
      </section>

      <section className="fivew-filters" aria-label="Filter coordination activities">
        <label>Province<select data-fivew-filter="province" value={province} onChange={event => { setProvince(event.target.value); setDistrict("All"); }}>{provinces.map(item => <option key={item}>{item}</option>)}</select></label>
        <label>District<select data-fivew-filter="district" value={district} onChange={event => setDistrict(event.target.value)}>{districts.map(item => <option key={item}>{item}</option>)}</select></label>
        <label>Organization<select data-fivew-filter="organization" value={organization} onChange={event => setOrganization(event.target.value)}>{organizations.map(item => <option key={item}>{item}</option>)}</select></label>
        <label>Response phase<select data-fivew-filter="phase" value={phase} onChange={event => setPhase(event.target.value)}>{phases.map(item => <option key={item}>{item}</option>)}</select></label>
        <label>Status<select data-fivew-filter="status" value={status} onChange={event => setStatus(event.target.value)}><option>All</option><option>Active</option><option>Planned</option><option>Completed</option></select></label>
        <div className="fivew-search"><span>⌕</span><input data-fivew-search value={query} onChange={event => setQuery(event.target.value)} placeholder="Search activities…"/><button data-fivew-clear onClick={clearFilters}>Clear filters</button></div>
      </section>

      <div className="fivew-content">
        <section className="fivew-mainpanel">
          <div className="fivew-tabs"><button data-fivew-tab="matrix" className={tab === "matrix" ? "active" : ""} onClick={() => setTab("matrix")}>▦ 5W1H Matrix</button><button data-fivew-tab="coverage" className={tab === "coverage" ? "active" : ""} onClick={() => setTab("coverage")}>⌖ Coverage</button><button data-fivew-tab="gaps" className={tab === "gaps" ? "active" : ""} onClick={() => setTab("gaps")}>◫ Gap analysis</button></div>
          <div data-fivew-panel="matrix" hidden={tab !== "matrix"} className="fivew-table-wrap"><table><thead><tr><th>WHO<small>Organization</small></th><th>WHAT<small>Activity</small></th><th>WHERE<small>Location</small></th><th>WHEN<small>Phase</small></th><th>WHY<small>Objective</small></th><th>HOW<small>Modality</small></th><th>Target</th><th>Status</th></tr></thead><tbody>{filtered.map(item => <tr key={`${item.organization}-${item.district}`} data-province={item.province} data-district={item.district} data-organization={item.organization} data-phase={item.phase} data-status={item.status} data-target={item.target}><td><b>{item.organization}</b></td><td>{item.activity}</td><td>{item.district}<small>{item.province}</small></td><td>{item.phase}</td><td>{item.objective}</td><td>{item.modality}</td><td><b>{formatNumber(item.target)}</b></td><td><span className={`status ${item.status.toLowerCase()}`}>{item.status}</span></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="fivew-empty">No activities match these filters.</div>}</div>
          <div data-fivew-panel="coverage" hidden={tab !== "coverage"} className="coverage-view"><div><p>Household reach by province</p><strong>{formatNumber(target)}</strong><span>households in the current view</span></div><div className="coverage-bars">{coverage.map(item => <div key={item.name}><span>{item.name}</span><i><b style={{width: `${Math.max(12, item.count * 45)}%`}} /></i><strong>{item.count}</strong></div>)}</div></div>
          <div data-fivew-panel="gaps" hidden={tab !== "gaps"} className="gap-view"><article><span>Coverage gap</span><h3>Two provinces have one recorded activity only</h3><p>Validate whether this reflects a genuine response gap or incomplete reporting before planning new assistance.</p></article><article><span>Potential duplication</span><h3>Two multipurpose cash activities overlap by modality</h3><p>Check household-level targeting and coordination agreements in Karnali and Madhesh.</p></article><article><span>Data quality</span><h3>Partner and resource fields need validation</h3><p>Complete the “How” records before sharing an operational coordination product.</p></article></div>
        </section>

        <aside className="fivew-insights">
          <div className="nepal-map-card"><header><b>Coverage overview</b><span>Activities</span></header><svg viewBox="0 0 520 210" role="img" aria-label="Illustrative coverage map of Nepal"><path d="M20 95 64 60 104 72 142 45 186 61 225 52 263 77 306 65 346 92 388 83 423 112 468 108 502 138 475 163 432 151 395 167 352 148 312 158 270 136 226 147 188 124 143 132 101 109 58 119Z"/><g><circle cx="91" cy="88" r="18"/><circle cx="187" cy="92" r="22"/><circle cx="282" cy="107" r="20"/><circle cx="386" cy="122" r="24"/><circle cx="463" cy="136" r="16"/></g></svg><div className="map-key"><span><i/>1 activity</span><span><i/>2+ activities</span></div></div>
          <div className="quick-insights"><b>Quick insights</b><div><span>◎</span><p><strong>{new Set(filtered.map(item => item.organization)).size}</strong> organizations</p></div><div><span>▤</span><p><strong>{filtered.length}</strong> activities</p></div><div><span>⌂</span><p><strong>{formatNumber(target)}</strong> households</p></div></div>
          <div className="coordination-alert"><span>△ Coordination signal</span><p>Use filters to compare reported coverage. Figures are sample data for product demonstration.</p></div>
        </aside>
      </div>

      <section className="fivew-explainer">
        <header><div><span>Common coordination language</span><h2>Six questions. One operational picture.</h2></div><p>5W1H turns disconnected partner updates into a shared view that coordinators can filter, compare, validate and act on.</p></header>
        <div className="fivew-question-grid">
          <article><span>01</span><b>WHO</b><h3>Which organisation?</h3><p>Lead agency, implementing partner, focal point and coordination relationship.</p></article>
          <article><span>02</span><b>WHAT</b><h3>Which activity?</h3><p>Assistance type, intervention, sector objective and intended result.</p></article>
          <article><span>03</span><b>WHERE</b><h3>Which location?</h3><p>Province, district, municipality and the operational coverage area.</p></article>
          <article><span>04</span><b>WHEN</b><h3>Which phase and date?</h3><p>Preparedness, active response, recovery, start date and delivery period.</p></article>
          <article><span>05</span><b>WHY</b><h3>Which need?</h3><p>Evidence, response rationale, targeting logic and expected outcome.</p></article>
          <article><span>06</span><b>HOW</b><h3>Which modality?</h3><p>Cash, voucher, payment channel, financial service provider and resources.</p></article>
        </div>
      </section>

      <section className="fivew-decision-strip">
        <div><span>From reporting to decisions</span><h2>See overlap early.<br/>Find gaps faster.</h2></div>
        <article><b>01</b><h3>Coordinate</h3><p>Compare partner plans before activities duplicate effort or leave communities behind.</p></article>
        <article><b>02</b><h3>Prioritise</h3><p>Connect household targets, operational phases and geographic reach in one view.</p></article>
        <article><b>03</b><h3>Communicate</h3><p>Export a clean matrix for working groups, authorities, partners and donors.</p></article>
      </section>
      <p className="fivew-data-note"><b>Prototype note</b> All records shown here are sample data designed to demonstrate the product experience. A production deployment would use agreed access controls, validation rules, data responsibility standards and partner-owned records.</p>
    </div>

    <div className={`fivew-drawer ${showForm ? "open" : ""}`} aria-hidden={!showForm}>
      <div className="drawer-head"><div><span>New coordination record</span><h2>Add 5W1H activity</h2></div><button data-fivew-close onClick={() => setShowForm(false)} aria-label="Close form">×</button></div>
      <form onSubmit={event => { event.preventDefault(); setShowForm(false); }}>
        <label>WHO <span>Organization</span><select required defaultValue=""><option value="" disabled>Select organization</option>{organizations.slice(1).map(item => <option key={item}>{item}</option>)}</select></label>
        <label>WHAT <span>Activity / intervention</span><input required placeholder="Enter activity"/></label>
        <label>WHERE <span>Province</span><select required defaultValue=""><option value="" disabled>Select province</option>{provinces.slice(1).map(item => <option key={item}>{item}</option>)}</select></label>
        <label>WHEN <span>Response phase</span><select required defaultValue=""><option value="" disabled>Select phase</option>{phases.slice(1).map(item => <option key={item}>{item}</option>)}</select></label>
        <label>WHY <span>Objective / justification</span><textarea required placeholder="Describe the purpose and intended outcome"/></label>
        <label>HOW <span>Modality / resources</span><input required placeholder="e.g. mobile money, bank transfer"/></label>
        <button className="drawer-submit">Save sample activity</button>
      </form>
    </div>
    <button data-fivew-close hidden={!showForm} className="fivew-backdrop" onClick={() => setShowForm(false)} aria-label="Close activity form"/>
  </div>;
}
