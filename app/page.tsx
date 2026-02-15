"use client";

import { useState } from "react";
import type { FormData, CalculationResult } from "@/types";
import { calcOneRm } from "@/utils/oneRm";
import { calcWilks } from "@/utils/wilks";
import { getLevel } from "@/utils/level";
import InputForm from "@/components/InputForm";
import ResultCard from "@/components/ResultCard";
import SummaryCard from "@/components/SummaryCard";
import FaqSection from "@/components/FaqSection";

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
      setError("체중을 올바르게 입력해주세요.");
      return;
    }

    const lifts = ["squat", "bench", "deadlift"] as const;
    for (const lift of lifts) {
      if (!isLiftFilled(formData[lift])) continue;
      const r = parseInt(formData[lift].reps, 10);
      if (r > 30) {
        setError("반복 횟수는 최대 30회까지 입력 가능합니다.");
        return;
      }
    }

    const hasAny = lifts.some((l) => isLiftFilled(formData[l]));
    if (!hasAny) {
      setError("최소 1개 종목의 중량과 반복 횟수를 입력해주세요.");
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
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            3대중량 1RM 계산기
          </h1>
          <p className="mt-1 text-sm text-muted">
            스쿼트 · 벤치프레스 · 데드리프트
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
            <h2 className="text-lg font-bold text-foreground">결과</h2>

            <div className="grid grid-cols-1 gap-3">
              {result.squat && <ResultCard name="스쿼트" emoji="🏋️" result={result.squat} />}
              {result.bench && <ResultCard name="벤치프레스" emoji="💪" result={result.bench} />}
              {result.deadlift && <ResultCard name="데드리프트" emoji="🔥" result={result.deadlift} />}
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
          <p>Epley · Brzycki · NSCA 공식 기반 · 남성 Wilks 계수</p>
        </footer>
      </div>
    </div>
  );
}
