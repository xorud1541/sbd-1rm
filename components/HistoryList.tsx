"use client";

import { useLocale, useTranslations } from "next-intl";
import type { HistoryRecord } from "@/types";

interface HistoryListProps {
  records: HistoryRecord[];
  onDelete: (id: string) => void;
}

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "text-gray-400",
  Novice: "text-green-400",
  Intermediate: "text-blue-400",
  Advanced: "text-purple-400",
  Elite: "text-yellow-400",
};

export default function HistoryList({ records, onDelete }: HistoryListProps) {
  const t = useTranslations("history");
  const locale = useLocale();

  const fmt = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (records.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted">{t("empty")}</p>
    );
  }

  return (
    <div className="space-y-3">
      {records.map((r) => (
        <div
          key={r.id}
          className="rounded-lg border border-card-border bg-card p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-muted">
              {fmt.format(new Date(r.timestamp))}
            </span>
            <button
              onClick={() => onDelete(r.id)}
              className="text-xs text-muted hover:text-red-400 transition-colors"
              aria-label={t("deleteOne")}
            >
              ✕
            </button>
          </div>

          <div className="mb-2 text-xs text-muted">
            {t("bodyWeight")}: {r.bodyWeight}kg
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            {r.squat != null && (
              <div>
                <div className="text-xs text-muted">{t("squat")}</div>
                <div className="font-bold text-foreground">
                  {r.squat.toFixed(1)}
                </div>
              </div>
            )}
            {r.bench != null && (
              <div>
                <div className="text-xs text-muted">{t("bench")}</div>
                <div className="font-bold text-foreground">
                  {r.bench.toFixed(1)}
                </div>
              </div>
            )}
            {r.deadlift != null && (
              <div>
                <div className="text-xs text-muted">{t("deadlift")}</div>
                <div className="font-bold text-foreground">
                  {r.deadlift.toFixed(1)}
                </div>
              </div>
            )}
          </div>

          {r.total != null && (
            <div className="mt-2 flex items-center justify-between border-t border-card-border pt-2 text-xs">
              <span className="text-muted">
                {t("total")}: <span className="font-bold text-foreground">{r.total.toFixed(1)}kg</span>
              </span>
              {r.wilks != null && (
                <span className="text-muted">
                  Wilks: <span className="font-bold text-primary">{r.wilks.toFixed(1)}</span>
                </span>
              )}
              {r.level && (
                <span className={`font-bold ${LEVEL_COLORS[r.level] ?? "text-gray-400"}`}>
                  {r.level}
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
