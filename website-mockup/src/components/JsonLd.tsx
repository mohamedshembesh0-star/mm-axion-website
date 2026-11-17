import { companyDescription } from "@/lib/seo";
import { site } from "@/lib/content";

const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: site.name,
      description: companyDescription,
      email: site.email,
      telephone: site.phone,
      url: "https://mmaxionsolutions.com",
      areaServed: "PL",
      knowsLanguage: ["pl", "en"],
      makesOffer: [
        { "@type": "Offer", name: "Boxly", url: "https://www.boxly.tech/" },
        { "@type": "Offer", name: "UNIPost", url: "https://unipost.tech/app" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does MM Axion Solutions do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We design applications, secure systems, run SEO and maintain services. One partner for every technology need your business has.",
          },
        },
        {
          "@type": "Question",
          name: "How does MM Axion Solutions work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Discovery, then design and plan, then build, then launch and care. We deploy the system, monitor and grow it, and stay after go-live.",
          },
        },
        {
          "@type": "Question",
          name: "Which products does MM Axion Solutions run?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Boxly is a warehouse platform. UNIPost is a courier platform. We don't just deliver client projects. We also build our own SaaS applications.",
          },
        },
      ],
    },
  ],
};

export default function JsonLd() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
