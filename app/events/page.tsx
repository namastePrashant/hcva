import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Humanitarian Cash Events & Training | HCVA",
  description:
    "Discover humanitarian cash events, CVA courses, dialogue platforms and professional learning opportunities in Nepal, South Asia and globally.",
  path: "/events",
});

export default function Page() {
  return (
    <ContentPage
      eyebrow="Events & training"
      title="Where the humanitarian cash community learns together."
      intro="A focused calendar of CVA courses, regional dialogue platforms, technical webinars and practitioner exchanges."
      breadcrumb={{ label: "Events", path: "/events" }}
      sections={[
        { number: "01", title: "Nepal & South Asia", text: "Training and dialogue that connect global standards with regional payment ecosystems, institutions and operational experience." },
        { number: "02", title: "Global sector events", text: "Major CALP, Cash Hub and partner conversations on policy, quality, localisation and the future of cash." },
        { number: "03", title: "Technical learning", text: "Focused sessions on markets, social protection, digital delivery, data responsibility, protection and anticipatory action." },
        { number: "04", title: "Host with HCVA", text: "Work with Aria Technologies to design a contextualised workshop, simulation or practitioner exchange." },
      ]}
      aside="Events should create usable capability. We prioritise formats that connect evidence to decisions participants face in their work."
      cta={{ label: "Submit or host an event", href: "mailto:events@humanitariancva.org" }}
    />
  );
}
