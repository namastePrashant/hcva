"use client";

import { useEffect, useState } from "react";

export default function InternalHeader({ onAsk }: { onAsk?: () => void }) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.classList.remove("menu-open"); window.removeEventListener("keydown", closeOnEscape); };
  }, [mobileOpen]);
  return <>
    <header className="site-header" onMouseLeave={() => setMegaOpen(false)}>
      <a className="brand hcva-brand" href="/" aria-label="Humanitarian CVA home">
        <img src="/hcva-logo.jpeg" alt="HCVA — Humanitarian Cash and Voucher Assistance" />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <button className="mega-trigger" aria-expanded={megaOpen} onMouseEnter={() => setMegaOpen(true)} onFocus={() => setMegaOpen(true)} onClick={() => setMegaOpen(!megaOpen)}>Explore <span>⌄</span></button>
        <a href="/services">Services</a><a href="/lali360">Lali360</a><a href="/insights">Insights</a><a href="/about">About</a>
      </nav>
      <div className="header-actions">
        {onAsk ? <button className="ask-button" onClick={onAsk}>Ask Omni <span>↗</span></button> : <a className="ask-button" href="/#omni">Ask Omni <span>↗</span></a>}
        <button type="button" className="mobile-toggle" aria-controls="mobile-navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? "Close" : "Menu"}</button>
      </div>
      <div className={`mega-menu ${megaOpen ? "open" : ""}`}>
        <div className="mega-column"><span>What we do</span><a href="/services"><b>CVA advisory</b><small>Strategy, readiness & process design</small></a><a href="/services"><b>Digital services</b><small>Implementation, integration & support</small></a><a href="/lali360"><b>Lali360 platform</b><small>The complete humanitarian project cycle</small></a></div>
        <div className="mega-column"><span>Knowledge</span><a href="/learning"><b>Resource library</b><small>19 curated courses, tools & reports</small></a><a href="/learning"><b>Practice areas</b><small>Markets, data, payments, protection & more</small></a><a href="/insights"><b>HCVA Insights</b><small>Original analysis and sector perspectives</small></a></div>
        <div className="mega-column"><span>Community</span><a href="/events"><b>Events & training</b><small>Global and regional opportunities</small></a><a href="/opportunities"><b>Jobs & consultancies</b><small>Build a career in humanitarian cash</small></a><a href="/5w1h"><b>5W1H coordination</b><small>Explore the interactive coordination tool</small></a></div>
        <a className="mega-feature" href="https://www.calpnetwork.org/event/calp-core-cva-skills-for-programme-staff-course-in-the-nepal/" target="_blank" rel="noreferrer"><span>Nepal sector spotlight</span><b>CALP Core CVA Skills for Programme Staff</b><small>Kathmandu · With Aria Technologies</small><i>↗</i></a>
      </div>
    </header>
    <div id="mobile-navigation" className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
      <a href="/services" onClick={() => setMobileOpen(false)}>Services <span>01</span></a><a href="/lali360" onClick={() => setMobileOpen(false)}>Lali360 <span>02</span></a>
      <a href="/learning" onClick={() => setMobileOpen(false)}>Learning hub <span>03</span></a><a href="/insights" onClick={() => setMobileOpen(false)}>Insights <span>04</span></a>
      <a href="/events" onClick={() => setMobileOpen(false)}>Events <span>05</span></a><a href="/opportunities" onClick={() => setMobileOpen(false)}>Opportunities <span>06</span></a>
      <a href="/5w1h" onClick={() => setMobileOpen(false)}>5W1H tool <span>07</span></a><a href="/about" onClick={() => setMobileOpen(false)}>About <span>08</span></a>
    </div>
  </>;
}
