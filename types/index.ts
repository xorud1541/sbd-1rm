export interface LiftInput {
  weight: string;
  reps: string;
  rir: string;
}

export interface LiftResult {
  average: number;
}

export interface FormData {
  bodyWeight: string;
  squat: LiftInput;
  bench: LiftInput;
  deadlift: LiftInput;
}

export interface CalculationResult {
  squat?: LiftResult;
  bench?: LiftResult;
  deadlift?: LiftResult;
  total?: number;
  wilks?: number;
  level?: string;
}
