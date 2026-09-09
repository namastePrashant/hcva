import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "./seo";

export const metadata: Metadata = pageMetadata({
  title: "Humanitarian CVA | Digital Systems, Advisory & Knowledge",
  description:
    "Aria Technologies’ global platform for Cash and Voucher Assistance digital services, consulting, Lali360 tools, learning, and sector knowledge.",
  path: "/",
  imageAlt: "Humanitarian CVA — The global home for humanitarian cash.",
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <HomePage />
    </>
  );
}
