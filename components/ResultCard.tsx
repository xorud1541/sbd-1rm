import type { LiftResult } from "@/types";

interface ResultCardProps {
  name: string;
  emoji: string;
  result: LiftResult;
}

// TODO: 성장 그래프(주간/월간) 추가 위치

export default function ResultCard({ name, emoji, result }: ResultCardProps) {
  return (
    <div className="rounded-lg border border-card-border bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold text-muted">
        {emoji} {name}
      </h3>
      <div className="text-center">
        <span className="text-3xl font-bold text-foreground">
          {result.average.toFixed(1)}
        </span>
        <span className="ml-1 text-sm text-muted">kg</span>
      </div>
    </div>
  );
}
