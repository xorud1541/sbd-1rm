const FAQ_ITEMS = [
  {
    q: "1RM이란 무엇인가요?",
    a: "1RM(One Rep Max)은 한 번에 들어올릴 수 있는 최대 중량입니다. 여러 번 반복한 중량을 기반으로 Epley, Brzycki, NSCA 공식을 사용하여 예측합니다.",
  },
  {
    q: "3대 몇이면 중급인가요?",
    a: "체중에 따라 다르지만, 일반적으로 체중의 4~5배 정도면 중급(Intermediate) 수준입니다. 예를 들어 체중 80kg이라면 3대 합계 320~400kg이면 중급에 해당합니다.",
  },
  {
    q: "Wilks 점수란?",
    a: "체중이 다른 리프터의 기록을 공정하게 비교하기 위한 보정 점수입니다. 300점 이상이면 중급, 400점 이상이면 상급으로 평가됩니다.",
  },
  {
    q: "3대 등급은 어떻게 나뉘나요?",
    a: "체중 대비 합계를 기준으로 Beginner(초급) → Novice(초중급) → Intermediate(중급) → Advanced(상급) → Elite(엘리트) 5단계로 나뉩니다.",
  },
  {
    q: "체중 대비 3대 합계는 어떻게 활용하나요?",
    a: "체중 대비 3대 비율은 자신의 근력 수준을 객관적으로 파악하는 기준입니다. 3대 합계를 체중으로 나눈 값이 클수록 상대적 근력이 뛰어난 것입니다.",
  },
];

export default function FaqSection() {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-lg font-bold text-foreground">
        자주 묻는 질문
      </h2>
      <dl className="space-y-4">
        {FAQ_ITEMS.map(({ q, a }) => (
          <div key={q} className="rounded-lg border border-card-border bg-card p-4">
            <dt className="text-sm font-semibold text-foreground">{q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
