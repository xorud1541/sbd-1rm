// 등급 기준: 3대 합계 / 체중 배수
// 추후 수정 가능하도록 상수로 분리
const LEVEL_THRESHOLDS = [
  { min: 9, label: "Elite" },
  { min: 7, label: "Advanced" },
  { min: 5, label: "Intermediate" },
  { min: 3, label: "Novice" },
] as const;

const DEFAULT_LEVEL = "Beginner";

export function getLevel(total: number, bodyWeight: number): string {
  if (bodyWeight <= 0 || total <= 0) return DEFAULT_LEVEL;

  const ratio = total / bodyWeight;

  for (const threshold of LEVEL_THRESHOLDS) {
    if (ratio >= threshold.min) {
      return threshold.label;
    }
  }

  return DEFAULT_LEVEL;
}
