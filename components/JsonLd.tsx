import { getTranslations } from "next-intl/server";

const SITE_URL = "https://sbd-1rm.vercel.app";

interface JsonLdProps {
  locale: string;
}

export default async function JsonLd({ locale }: JsonLdProps) {
  const t = await getTranslations({ locale, namespace: "jsonLd" });

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t("appName"),
    url: `${SITE_URL}/${locale}`,
    description: t("appDescription"),
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    inLanguage: locale,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: locale === "ko" ? "KRW" : "USD",
    },
  };

  const faqItems = [0, 1, 2, 3, 4] as const;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((i) => ({
      "@type": "Question",
      name: t(`faq.${i}.q`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`faq.${i}.a`),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
