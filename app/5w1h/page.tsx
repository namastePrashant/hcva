import type { Metadata } from "next";
import InternalHeader from "@/components/InternalHeader";
import InternalFooter from "@/components/InternalFooter";
import FiveWTool from "@/components/FiveWTool";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "5W1H Cash Preparedness & Response Tool | Humanitarian CVA",
  description:
    "Explore a practical 5W1H coordination workspace for humanitarian cash preparedness and response activities.",
  path: "/5w1h",
});

export default function FiveWPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "5W1H coordination tool", path: "/5w1h" },
        ]}
      />
      <InternalHeader />
      <main className="fivew-page">
        <FiveWTool />
      </main>
      <InternalFooter />
    </>
  );
}
