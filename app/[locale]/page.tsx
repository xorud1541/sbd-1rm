"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { FormData, CalculationResult } from "@/types";
import { calcOneRm } from "@/utils/oneRm";
import { calcWilks } from "@/utils/wilks";
import { getLevel } from "@/utils/level";
import InputForm from "@/components/InputForm";
import ResultCard from "@/components/ResultCard";
import SummaryCard from "@/components/SummaryCard";
import FaqSection from "@/components/FaqSection";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// TODO: Supabase DB 연동 위치
// TODO: 기록 저장 API 추가 위치
// TODO: 랭킹/챌린지 기능 추가 위치

const INITIAL_FORM: FormData = {
  bodyWeight: "",
  squat: { weight: "", reps: "", rir: "0" },
  bench: { weight: "", reps: "", rir: "0" },
  deadlift: { weight: "", reps: "", rir: "0" },
};

export default function Home() {
  const t = useTranslations();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>("");

  const isLiftFilled = (input: { weight: string; reps: string }) => {
    const w = parseFloat(input.weight);
    const r = parseInt(input.reps, 10);
    return w > 0 && r > 0;
  };

  const handleCalculate = () => {
    setError("");

    const bodyWeight = parseFloat(formData.bodyWeight);
    if (!bodyWeight || bodyWeight <= 0) {
      setError(t("errors.invalidBodyWeight"));
      return;
    }

    const lifts = ["squat", "bench", "deadlift"] as const;
    for (const lift of lifts) {
      if (!isLiftFilled(formData[lift])) continue;
      const r = parseInt(formData[lift].reps, 10);
      if (r > 30) {
        setError(t("errors.maxReps"));
        return;
      }
    }

    const hasAny = lifts.some((l) => isLiftFilled(formData[l]));
    if (!hasAny) {
      setError(t("errors.noLift"));
      return;
    }

    const calcLift = (input: { weight: string; reps: string; rir: string }) =>
      isLiftFilled(input)
        ? calcOneRm(parseFloat(input.weight), parseInt(input.reps, 10), parseInt(input.rir, 10) || 0)
        : undefined;

    const squat = calcLift(formData.squat);
    const bench = calcLift(formData.bench);
    const deadlift = calcLift(formData.deadlift);

    const res: CalculationResult = { squat, bench, deadlift };

    if (squat && bench && deadlift) {
      const total = Math.round((squat.average + bench.average + deadlift.average) * 10) / 10;
      res.total = total;
      res.wilks = calcWilks(bodyWeight, total);
      res.level = getLevel(total, bodyWeight);
    }

    setResult(res);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 py-8">
        {/* 헤더 */}
        <header className="mb-8 text-center relative">
          <div className="absolute right-0 top-0">
            <LanguageSwitcher />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {t("header.title")}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {t("header.subtitle")}
          </p>
        </header>

        {/* 입력 폼 */}
        <InputForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleCalculate}
        />

        {/* 에러 메시지 */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-900/30 border border-red-800 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* 결과 표시 */}
        {result && (
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-foreground">{t("result.heading")}</h2>

            <div className="grid grid-cols-1 gap-3">
              {result.squat && <ResultCard name={t("result.squat")} emoji="🏋️" result={result.squat} />}
              {result.bench && <ResultCard name={t("result.bench")} emoji="💪" result={result.bench} />}
              {result.deadlift && <ResultCard name={t("result.deadlift")} emoji="🔥" result={result.deadlift} />}
            </div>

            {result.total != null && result.wilks != null && result.level && (
              <SummaryCard
                total={result.total}
                wilks={result.wilks}
                level={result.level}
              />
            )}
          </div>
        )}

        {/* FAQ */}
        <FaqSection />

        {/* 푸터 */}
        <footer className="mt-12 text-center text-xs text-muted/50">
          <p>{t("footer.text")}</p>
        </footer>
      </div>
    </div>
  );
}
