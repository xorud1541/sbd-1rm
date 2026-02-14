interface SummaryCardProps {
  total: number;
  wilks: number;
  level: string;
}

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "text-gray-400",
  Novice: "text-green-400",
  Intermediate: "text-blue-400",
  Advanced: "text-purple-400",
  Elite: "text-yellow-400",
};

export default function SummaryCard({ total, wilks, level }: SummaryCardProps) {
  const levelColor = LEVEL_COLORS[level] ?? "text-gray-400";

  return (
    <div className="rounded-lg border border-primary/30 bg-card p-5">
      <h3 className="mb-4 text-center text-sm font-semibold text-muted">
        📊 종합 결과
      </h3>

      <div className="grid grid-cols-3 gap-3 text-center">
        {/* 3대 합계 */}
        <div>
          <div className="text-xs text-muted">3대 합계</div>
          <div className="mt-1 text-2xl font-bold text-foreground">
            {total.toFixed(1)}
          </div>
          <div className="text-xs text-muted">kg</div>
        </div>

        {/* Wilks 점수 */}
        <div>
          <div className="text-xs text-muted">Wilks</div>
          <div className="mt-1 text-2xl font-bold text-primary">
            {wilks.toFixed(1)}
          </div>
          <div className="text-xs text-muted">점</div>
        </div>

        {/* 등급 */}
        <div>
          <div className="text-xs text-muted">등급</div>
          <div className={`mt-1 text-2xl font-bold ${levelColor}`}>
            {level}
          </div>
        </div>
      </div>
    </div>
  );
}
