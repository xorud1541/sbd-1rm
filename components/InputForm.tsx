"use client";

import { useTranslations } from "next-intl";
import type { FormData } from "@/types";

interface InputFormProps {
  formData: FormData;
  onChange: (data: FormData) => void;
  onSubmit: () => void;
}

const LIFTS = [
  { key: "squat" as const, emoji: "🏋️" },
  { key: "bench" as const, emoji: "💪" },
  { key: "deadlift" as const, emoji: "🔥" },
];

export default function InputForm({ formData, onChange, onSubmit }: InputFormProps) {
  const t = useTranslations("form");

  const RIR_OPTIONS = [
    { value: "0", label: t("rir0"), icon: "🔥" },
    { value: "1", label: t("rir1"), icon: "💪" },
    { value: "2", label: t("rir2"), icon: "😊" },
    { value: "3", label: t("rir3"), icon: "😌" },
  ];

  const handleBodyWeightChange = (value: string) => {
    onChange({ ...formData, bodyWeight: value });
  };

  const handleLiftChange = (
    lift: "squat" | "bench" | "deadlift",
    field: "weight" | "reps" | "rir",
    value: string
  ) => {
    onChange({
      ...formData,
      [lift]: { ...formData[lift], [field]: value },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 체중 입력 */}
      <div>
        <label className="block text-sm font-medium text-muted mb-1.5">
          {t("bodyWeight")}
        </label>
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          min="0"
          placeholder={t("bodyWeightPlaceholder")}
          value={formData.bodyWeight}
          onChange={(e) => handleBodyWeightChange(e.target.value)}
          className="w-full rounded-lg border border-card-border bg-card px-4 py-3 text-foreground placeholder-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* 종목별 입력 */}
      {LIFTS.map(({ key, emoji }) => (
        <div key={key} className="rounded-lg border border-card-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            {emoji} {t(key)}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted mb-1">{t("weight")}</label>
              <input
                type="number"
                inputMode="decimal"
                step="0.5"
                min="0"
                placeholder={t("weightPlaceholder")}
                value={formData[key].weight}
                onChange={(e) => handleLiftChange(key, "weight", e.target.value)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-foreground placeholder-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">{t("reps")}</label>
              <input
                type="number"
                inputMode="numeric"
                step="1"
                min="1"
                max="30"
                placeholder={t("repsPlaceholder")}
                value={formData[key].reps}
                onChange={(e) => handleLiftChange(key, "reps", e.target.value)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-foreground placeholder-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-xs text-muted mb-1.5">
              {t("rirQuestion")}
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {RIR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleLiftChange(key, "rir", opt.value)}
                  className={`rounded-md px-1 py-2 text-center transition-colors ${
                    formData[key].rir === opt.value
                      ? "bg-primary text-white"
                      : "bg-background text-muted hover:bg-background/80"
                  }`}
                >
                  <div className="text-sm">{opt.icon}</div>
                  <div className="text-[10px] leading-tight mt-0.5">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* 계산 버튼 */}
      <button
        type="submit"
        className="w-full rounded-lg bg-primary py-3.5 text-base font-bold text-white transition-colors hover:bg-primary-hover active:scale-[0.98]"
      >
        {t("submit")}
      </button>
    </form>
  );
}
