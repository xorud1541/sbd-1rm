"use client";

import type { FormData } from "@/types";

interface InputFormProps {
  formData: FormData;
  onChange: (data: FormData) => void;
  onSubmit: () => void;
}

const LIFTS = [
  { key: "squat" as const, label: "스쿼트", emoji: "🏋️" },
  { key: "bench" as const, label: "벤치프레스", emoji: "💪" },
  { key: "deadlift" as const, label: "데드리프트", emoji: "🔥" },
];

const RIR_OPTIONS = [
  { value: "0", label: "한계까지 했어요", icon: "🔥" },
  { value: "1", label: "1개 더 가능했어요", icon: "💪" },
  { value: "2", label: "2개 더 가능했어요", icon: "😊" },
  { value: "3", label: "3개 더 가능했어요", icon: "😌" },
];

export default function InputForm({ formData, onChange, onSubmit }: InputFormProps) {
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
          체중 (kg)
        </label>
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          min="0"
          placeholder="80"
          value={formData.bodyWeight}
          onChange={(e) => handleBodyWeightChange(e.target.value)}
          className="w-full rounded-lg border border-card-border bg-card px-4 py-3 text-foreground placeholder-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* 종목별 입력 */}
      {LIFTS.map(({ key, label, emoji }) => (
        <div key={key} className="rounded-lg border border-card-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            {emoji} {label}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted mb-1">중량 (kg)</label>
              <input
                type="number"
                inputMode="decimal"
                step="0.5"
                min="0"
                placeholder="100"
                value={formData[key].weight}
                onChange={(e) => handleLiftChange(key, "weight", e.target.value)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-foreground placeholder-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">반복 횟수</label>
              <input
                type="number"
                inputMode="numeric"
                step="1"
                min="1"
                max="30"
                placeholder="5"
                value={formData[key].reps}
                onChange={(e) => handleLiftChange(key, "reps", e.target.value)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-foreground placeholder-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-xs text-muted mb-1.5">
              몇 개 더 할 수 있었나요?
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
        1RM 계산하기
      </button>
    </form>
  );
}
