const SITE_URL = "https://sbd-1rm.vercel.app";

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "3대중량 1RM 계산기",
  url: SITE_URL,
  description:
    "스쿼트, 벤치프레스, 데드리프트 1RM을 계산하고 3대 합계, Wilks 점수, 체중 대비 등급을 확인하세요.",
  applicationCategory: "HealthApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "1RM이란 무엇인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1RM(One Rep Max)은 한 번에 들어올릴 수 있는 최대 중량을 의미합니다. 직접 측정하기 어려우므로, 여러 번 반복한 중량을 기반으로 Epley, Brzycki, NSCA 공식을 사용하여 예측합니다.",
      },
    },
    {
      "@type": "Question",
      name: "3대 몇이면 중급인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "체중에 따라 다르지만, 일반적으로 체중의 4~5배 정도면 Intermediate(중급) 수준입니다. 예를 들어 체중 80kg 기준 3대 합계 320~400kg이면 중급에 해당합니다. 정확한 등급은 Wilks 점수로 판단하는 것이 더 객관적입니다.",
      },
    },
    {
      "@type": "Question",
      name: "Wilks 점수란 무엇인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wilks 점수는 체중이 다른 리프터들의 기록을 공정하게 비교하기 위한 점수입니다. 체중 대비 3대 합계를 Wilks 계수로 보정하여 계산합니다. 300점 이상이면 중급, 400점 이상이면 상급으로 평가됩니다.",
      },
    },
    {
      "@type": "Question",
      name: "스쿼트, 벤치프레스, 데드리프트 1RM은 어떻게 계산하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "수행한 중량과 반복 횟수를 입력하면 Epley, Brzycki, NSCA 3가지 공식의 평균값으로 1RM을 예측합니다. 추가로 '몇 개 더 할 수 있었는지'를 선택하면 더 정확한 예측이 가능합니다.",
      },
    },
    {
      "@type": "Question",
      name: "3대 등급은 어떻게 나뉘나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "3대 등급은 체중 대비 합계를 기준으로 Beginner(초급), Novice(초중급), Intermediate(중급), Advanced(상급), Elite(엘리트) 5단계로 나뉩니다.",
      },
    },
  ],
};

export default function JsonLd() {
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
