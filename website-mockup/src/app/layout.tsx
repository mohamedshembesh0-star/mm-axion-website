import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { LanguageProvider } from "@/components/Language";
import SkipLink from "@/components/SkipLink";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";
import { companyDescription, READY_TO_INDEX } from "@/lib/seo";
import "./globals.css";

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MM Axion Solutions",
    template: "%s, MM Axion Solutions",
  },
  description: companyDescription,
  robots: READY_TO_INDEX
    ? { index: true, follow: true }
    : { index: false, follow: false },
  applicationName: "MM Axion Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable} antialiased`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{var l=localStorage.getItem('axion-lang');if(l==='pl'||l==='en')document.documentElement.lang=l;else if(navigator.language&&navigator.language.toLowerCase().indexOf('pl')===0)document.documentElement.lang='pl'}catch(e){}",
          }}
        />
        <JsonLd />
        <LanguageProvider>
          <SkipLink />
          <SmoothScroll />
          <ScrollProgress />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
