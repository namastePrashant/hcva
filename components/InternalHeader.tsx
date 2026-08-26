"use client";

import { useState } from "react";

export default function InternalHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header internal-header">
      <a className="brand hcva-brand" href="/" aria-label="Humanitarian CVA home">
        <img src="/hcva-logo.jpeg" alt="HCVA — Humanitarian Cash and Voucher Assistance" />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="/services">Services</a><a href="/lali360">Lali360</a><a href="/learning">Learning</a>
        <a href="/insights">Insights</a><a href="/events">Events</a><a href="/opportunities">Opportunities</a><a href="/about">About</a>
      </nav>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
      {open && <nav className="internal-mobile" aria-label="Mobile navigation">
        <a href="/services">Services</a><a href="/lali360">Lali360</a><a href="/learning">Learning</a>
        <a href="/insights">Insights</a><a href="/events">Events</a><a href="/opportunities">Opportunities</a><a href="/about">About</a>
      </nav>}
    </header>
  );
}
