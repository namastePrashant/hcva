"use client";

import { useState } from "react";

export default function FiveWTool() {
  const [showcase, setShowcase] = useState<"pulse" | "coverage" | "gaps">("pulse");

  return <div className="fivew-app showcase-only">
    <div className="fivew-workspace">
      <section className="fivew-introduction">
        <div className="fivew-intro-copy">
          <p>5W1H coordination approach</p>
          <h1>A clearer operational picture for humanitarian cash.</h1>
          <span>Humanitarian responses depend on timely, shared understanding. The 5W1H approach organizes essential coordination information around six practical questions—helping teams see coverage, understand intent and identify where attention is needed.</span>
          <div><a href="#showcase">See how it works <b>↓</b></a><a href="#principles">Explore the framework <b>↘</b></a></div>
        </div>
        <aside className="fivew-intro-card">
          <header><span>One shared picture</span><b>COORDINATION FRAMEWORK</b></header>
          <div>
            <article><strong>WHO</strong><span>Organizations and partners</span></article>
            <article><strong>WHAT</strong><span>Activities and interventions</span></article>
            <article><strong>WHERE</strong><span>Locations and coverage</span></article>
            <article><strong>WHEN</strong><span>Phases and timelines</span></article>
            <article><strong>WHY</strong><span>Needs and intended outcomes</span></article>
            <article><strong>HOW</strong><span>Modalities and resources</span></article>
          </div>
          <footer><i/><span>Structured for coordination, not simply reporting</span></footer>
        </aside>
      </section>

      <section className="fivew-showcase" id="showcase">
        <header><div><span>See the concept in motion</span><h2>One framework. Three coordination perspectives.</h2></div><p>Select a perspective to see how structured 5W1H information can support shared understanding without presenting a complex operational system.</p></header>
        <div className="showcase-layout">
          <nav className="showcase-menu" aria-label="5W1H concept views">
            <button data-fivew-showcase="pulse" className={showcase === "pulse" ? "active" : ""} aria-pressed={showcase === "pulse"} onClick={() => setShowcase("pulse")}><span>01</span><div><b>Coordination flow</b><p>See how partner, location and delivery information connects into one shared picture.</p></div><i>→</i></button>
            <button data-fivew-showcase="coverage" className={showcase === "coverage" ? "active" : ""} aria-pressed={showcase === "coverage"} onClick={() => setShowcase("coverage")}><span>02</span><div><b>Coverage perspective</b><p>Understand how geographic reach can be communicated clearly and consistently.</p></div><i>→</i></button>
            <button data-fivew-showcase="gaps" className={showcase === "gaps" ? "active" : ""} aria-pressed={showcase === "gaps"} onClick={() => setShowcase("gaps")}><span>03</span><div><b>Coordination signals</b><p>Illustrate how gaps, overlaps and information-quality needs can become visible.</p></div><i>→</i></button>
          </nav>

          <div className="showcase-screen">
            <div data-fivew-showcase-panel="pulse" hidden={showcase !== "pulse"} className="fivew-live-stage">
              <div className="live-stage-bar"><span><i/> Coordination flow</span><b>Illustrative view</b><em>In motion</em></div>
              <div className="live-stage-body">
                <div className="live-network" aria-hidden="true"><div className="network-grid"/><i className="route route-one"/><i className="route route-two"/><i className="route route-three"/><span className="network-node node-one"><b>WHO</b><small>Partners</small></span><span className="network-node node-two"><b>WHERE</b><small>Coverage</small></span><span className="network-node node-three"><b>HOW</b><small>Delivery</small></span><span className="network-core"><i>5W1H</i><b>Shared understanding</b><small>Information becoming insight</small></span><i className="data-packet packet-one"/><i className="data-packet packet-two"/><i className="data-packet packet-three"/></div>
                <div className="live-feed"><div className="live-feed-title"><span>Coordination information</span><b>● CONNECTED</b></div><div className="signal-stack"><article className="signal-record signal-one"><div><span>WHO + WHAT</span><b>Connected</b></div><h3>Partner activity understood</h3><p>Who is acting and what they intend to deliver.</p><footer><span>Clear ownership</span><strong>Shared view</strong></footer></article><article className="signal-record signal-two"><div><span>WHERE + WHEN</span><b>Aligned</b></div><h3>Coverage placed in context</h3><p>Where assistance is planned and when it is expected.</p><footer><span>Geographic context</span><strong>Timely decisions</strong></footer></article><article className="signal-record signal-three"><div><span>WHY + HOW</span><b>Interpreted</b></div><h3>Intent made visible</h3><p>Why assistance is needed and how it will be delivered.</p><footer><span>Response rationale</span><strong>Delivery clarity</strong></footer></article></div><div className="live-progress"><i/><span>Perspectives rotate automatically</span></div></div>
              </div>
            </div>

            <div data-fivew-showcase-panel="coverage" hidden={showcase !== "coverage"} className="showcase-coverage">
              <div className="showcase-window-bar"><span><i/><i/><i/></span><b>Coverage perspective</b><em>Illustrative</em></div>
              <div className="showcase-coverage-body"><div className="coverage-visual"><span className="coverage-shape shape-one"/><span className="coverage-shape shape-two"/><span className="coverage-shape shape-three"/><span className="coverage-shape shape-four"/><i className="coverage-pin pin-one">•</i><i className="coverage-pin pin-two">•</i><i className="coverage-pin pin-three">•</i><i className="coverage-pin pin-four">•</i><b>Geographic reach at a glance</b></div><div className="coverage-ranking"><span>Coverage profile</span><strong>Shared visibility</strong><small>A simple way to communicate relative reach</small>{[["Established","92%"],["Growing","70%"],["Emerging","52%"],["To validate","34%"]].map(([name,width]) => <div key={name}><span>{name}</span><i><b style={{width}}/></i><em>{name}</em></div>)}</div></div>
            </div>

            <div data-fivew-showcase-panel="gaps" hidden={showcase !== "gaps"} className="showcase-gaps">
              <div className="showcase-window-bar"><span><i/><i/><i/></span><b>Coordination signal monitor</b><em>Illustrative</em></div>
              <div className="showcase-gap-body"><div className="signal-radar"><i/><i/><i/><span>5W1H</span></div><div className="signal-alerts"><article><span>Coverage signal</span><b>Where might attention be needed?</b><p>Highlight areas that appear less visible or require further coordination.</p></article><article><span>Overlap signal</span><b>Where should partners compare plans?</b><p>Encourage dialogue when activities appear similar in place, time or approach.</p></article><article><span>Information signal</span><b>Which details need clarification?</b><p>Identify incomplete information before sharing a coordination picture.</p></article></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="fivew-explainer" id="principles">
        <header><div><span>Common coordination language</span><h2>Six questions. One operational picture.</h2></div><p>5W1H gives humanitarian actors a consistent way to describe activities, compare plans and communicate the response landscape.</p></header>
        <div className="fivew-question-grid">
          <article><span>01</span><b>WHO</b><h3>Which organization?</h3><p>Understand lead agencies, implementing partners and coordination relationships.</p></article>
          <article><span>02</span><b>WHAT</b><h3>Which activity?</h3><p>Describe the assistance, intervention and intended programmatic result.</p></article>
          <article><span>03</span><b>WHERE</b><h3>Which location?</h3><p>Communicate the geographic area and communities an activity intends to reach.</p></article>
          <article><span>04</span><b>WHEN</b><h3>Which phase?</h3><p>Place preparedness, active response and recovery activity within a useful timeline.</p></article>
          <article><span>05</span><b>WHY</b><h3>Which need?</h3><p>Make the evidence, response rationale and intended outcome understandable.</p></article>
          <article><span>06</span><b>HOW</b><h3>Which approach?</h3><p>Describe the modality, delivery mechanism, resources and partnership model.</p></article>
        </div>
      </section>

      <section className="fivew-decision-strip">
        <div><span>From information to understanding</span><h2>Make coordination<br/>easier to see.</h2></div>
        <article><b>01</b><h3>Clarify</h3><p>Present complex response information in a structure that is easier to understand.</p></article>
        <article><b>02</b><h3>Connect</h3><p>Help organizations compare intent, coverage, timing and delivery approaches.</p></article>
        <article><b>03</b><h3>Communicate</h3><p>Create a common language for coordination groups, authorities and partners.</p></article>
      </section>
      <p className="fivew-data-note"><b>Concept presentation</b> The visuals on this page demonstrate how a 5W1H coordination approach could be communicated. They do not represent live operational data.</p>
    </div>
  </div>;
}
