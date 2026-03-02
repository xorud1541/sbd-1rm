"use client";

import { useTranslations } from "next-intl";

export default function FaqSection() {
  const t = useTranslations("faq");

  const items = [0, 1, 2, 3, 4] as const;

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-lg font-bold text-foreground">
        {t("heading")}
      </h2>
      <dl className="space-y-4">
        {items.map((i) => (
          <div key={i} className="rounded-lg border border-card-border bg-card p-4">
            <dt className="text-sm font-semibold text-foreground">
              {t(`items.${i}.q`)}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">
              {t(`items.${i}.a`)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
