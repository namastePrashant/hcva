import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Humanitarian Cash Jobs & Opportunities | HCVA",
  description:
    "Find CVA jobs, consultancies, fellowships and professional opportunities in humanitarian cash and voucher assistance.",
  path: "/opportunities",
});

export default function Page() {
  return (
    <ContentPage
      eyebrow="Jobs & opportunities"
      title="Build a career improving humanitarian cash."
      intro="A specialist space for roles, consultancies and opportunities connected to cash, markets, social protection and digital humanitarian delivery."
      breadcrumb={{ label: "Opportunities", path: "/opportunities" }}
      sections={[
        { number: "01", title: "CVA programme roles", text: "Coordination, programme management, technical advisory and field implementation opportunities." },
        { number: "02", title: "Digital & data roles", text: "Information management, product, data protection, payments and technology roles serving cash programmes." },
        { number: "03", title: "Consultancies", text: "Short-term assignments for assessments, evaluations, preparedness, training, system design and research." },
        { number: "04", title: "Publish an opening", text: "Reach a focused audience of CVA practitioners in Nepal, South Asia and the wider humanitarian community." },
      ]}
      aside="Specialist opportunities are easier to discover when organisations use clear CVA language, realistic requirements and transparent closing dates."
      cta={{ label: "Submit an opportunity", href: "mailto:jobs@humanitariancva.org" }}
    />
  );
}
