import type { LiftResult } from "@/types";

export function calcEpley(weight: number, reps: number): number {
  if (reps <= 0) return 0;
  if (reps === 1) return weight;
  return weight * (1 + reps / 30);
}

export function calcBrzycki(weight: number, reps: number): number {
  if (reps <= 0) return 0;
  if (reps === 1) return weight;
  if (reps >= 37) return 0;
  return weight * (36 / (37 - reps));
}

export function calcNsca(weight: number, reps: number): number {
  if (reps <= 0) return 0;
  if (reps === 1) return weight;
  return weight * (1 + 0.033 * reps);
}

export function calcOneRm(weight: number, reps: number, rir: number = 0): LiftResult {
  const adjustedReps = reps + rir;
  const epley = calcEpley(weight, adjustedReps);
  const brzycki = calcBrzycki(weight, adjustedReps);
  const nsca = calcNsca(weight, adjustedReps);
  const validValues = [epley, brzycki, nsca].filter((v) => v > 0);
  const average = validValues.length > 0
    ? validValues.reduce((a, b) => a + b, 0) / validValues.length
    : 0;

  return {
    average: Math.round(average * 10) / 10,
  };
}
