import type { Metadata } from "next";
import InternalHeader from "@/components/InternalHeader";
import InternalFooter from "@/components/InternalFooter";

export const metadata: Metadata = {
  title: "Page not found | Humanitarian CVA",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <InternalHeader />
      <main className="internal-page">
        <section className="internal-hero">
          <p className="kicker">Error 404</p>
          <h1>
            This page has <em>moved on.</em>
          </h1>
          <p>
            The link may be outdated or the page was retired. Head back to the
            homepage or jump straight to a section below.
          </p>
          <a className="primary-cta" href="/">
            Return home <span>→</span>
          </a>
        </section>
        <section className="content-layout">
          <div className="content-list">
            <article>
              <span>01</span>
              <div>
                <h2>Services &amp; Lali360</h2>
                <p>
                  Explore <a href="/services">CVA advisory and digital services</a> or
                  the <a href="/lali360">Lali360 platform</a>.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h2>Knowledge</h2>
                <p>
                  Visit the <a href="/learning">learning hub</a> or read{" "}
                  <a href="/insights">HCVA Insights</a>.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h2>Coordination</h2>
                <p>
                  Open the <a href="/5w1h">5W1H coordination tool</a> or learn{" "}
                  <a href="/about">about Humanitarian CVA</a>.
                </p>
              </div>
            </article>
          </div>
          <aside>
            <span>HCVA perspective</span>
            <p>Still stuck? Email us and we will point you the right way.</p>
            <a href="mailto:hello@humanitariancva.org">Contact the team →</a>
          </aside>
        </section>
      </main>
      <InternalFooter />
    </>
  );
}
