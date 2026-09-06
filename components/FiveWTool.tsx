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
            <figure data-fivew-showcase-panel="pulse" hidden={showcase !== "pulse"} className="product-image-view">
              <div className="product-window-bar"><span><i/><i/><i/></span><b>Humanitarian CVA · 5W1H concept</b><em>Product preview</em></div>
              <div className="product-image-stage"><img src="/5w1h-dashboard.jpeg" alt="Humanitarian CVA 5W1H cash preparedness and response dashboard concept"/><span className="product-focus focus-flow"><i>01</i><b>Connected coordination view</b></span></div>
              <figcaption><span>Coordination flow</span><p>A realistic view of how partner activities, response phases and delivery information can come together in one shared coordination space.</p></figcaption>
            </figure>

            <figure data-fivew-showcase-panel="coverage" hidden={showcase !== "coverage"} className="product-image-view coverage-focus">
              <div className="product-window-bar"><span><i/><i/><i/></span><b>Humanitarian CVA · 5W1H concept</b><em>Product preview</em></div>
              <div className="product-image-stage"><img src="/5w1h-dashboard.jpeg" alt="Humanitarian CVA 5W1H dashboard showing an illustrative coverage map"/><span className="product-focus focus-coverage"><i>02</i><b>Geographic coverage</b></span></div>
              <figcaption><span>Coverage perspective</span><p>Maps and summary views help coordination actors understand geographic reach and bring areas requiring further attention into focus.</p></figcaption>
            </figure>

            <figure data-fivew-showcase-panel="gaps" hidden={showcase !== "gaps"} className="product-image-view gaps-focus">
              <div className="product-window-bar"><span><i/><i/><i/></span><b>Humanitarian CVA · 5W1H concept</b><em>Product preview</em></div>
              <div className="product-image-stage"><img src="/5w1h-dashboard.jpeg" alt="Humanitarian CVA 5W1H dashboard showing illustrative coordination insights"/><span className="product-focus focus-gaps"><i>03</i><b>Coordination insights</b></span></div>
              <figcaption><span>Coordination signals</span><p>Visual summaries can make possible gaps, overlaps and incomplete information easier to discuss across humanitarian partners.</p></figcaption>
            </figure>
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
