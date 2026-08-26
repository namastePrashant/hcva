import type { Metadata } from "next";
import InternalHeader from "@/components/InternalHeader";
import InternalFooter from "@/components/InternalFooter";
import FiveWTool from "@/components/FiveWTool";

export const metadata: Metadata = {
  title: "5W1H Cash Preparedness & Response Tool | Humanitarian CVA",
  description: "Explore a practical 5W1H coordination workspace for humanitarian cash preparedness and response activities.",
};

export default function FiveWPage() {
  return <><InternalHeader/><main className="fivew-page"><FiveWTool/></main><InternalFooter/></>;
}
