import type { Metadata } from "next";
import PrivacyBody from "@/components/PrivacyBody";

export const metadata: Metadata = {
  title: "Privacy",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return <PrivacyBody />;
}
