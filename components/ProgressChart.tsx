"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { HistoryRecord } from "@/types";

interface ProgressChartProps {
  records: HistoryRecord[];
}

interface Series {
  key: "squat" | "bench" | "deadlift" | "total";
  color: string;
}

const SERIES: Series[] = [
  { key: "squat", color: "#3b82f6" },
  { key: "bench", color: "#22c55e" },
  { key: "deadlift", color: "#ef4444" },
  { key: "total", color: "#ffffff" },
];

const CHART_W = 320;
const CHART_H = 180;
const PAD = { top: 10, right: 10, bottom: 30, left: 45 };
const INNER_W = CHART_W - PAD.left - PAD.right;
const INNER_H = CHART_H - PAD.top - PAD.bottom;

export default function ProgressChart({ records }: ProgressChartProps) {
  const t = useTranslations("history");
  const locale = useLocale();
  const [visible, setVisible] = useState<Record<string, boolean>>({
    squat: true,
    bench: true,
    deadlift: true,
    total: true,
  });

  // chronological order for chart
  const sorted = [...records].reverse();

  if (sorted.length < 2) {
    return (
      <p className="py-8 text-center text-sm text-muted">
        {t("chartMinRecords")}
      </p>
    );
  }

  // compute value range across all visible series
  let minVal = Infinity;
  let maxVal = -Infinity;
  for (const r of sorted) {
    for (const s of SERIES) {
      if (!visible[s.key]) continue;
      const v = r[s.key];
      if (v != null) {
        if (v < minVal) minVal = v;
        if (v > maxVal) maxVal = v;
      }
    }
  }

  // handle edge case where no visible data
  if (!isFinite(minVal)) {
    minVal = 0;
    maxVal = 100;
  }

  const range = maxVal - minVal || 1;
  const padding = range * 0.1;
  const yMin = Math.max(0, minVal - padding);
  const yMax = maxVal + padding;
  const yRange = yMax - yMin || 1;

  const xStep = sorted.length > 1 ? INNER_W / (sorted.length - 1) : 0;

  const toX = (i: number) => PAD.left + i * xStep;
  const toY = (v: number) => PAD.top + INNER_H - ((v - yMin) / yRange) * INNER_H;

  // Y-axis ticks (5 ticks)
  const yTicks = Array.from({ length: 5 }, (_, i) => {
    const val = yMin + (yRange * i) / 4;
    return { val, y: toY(val) };
  });

  // X-axis date labels (show first, middle, last)
  const dateFmt = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  });
  const xLabels: { text: string; x: number }[] = [];
  const indices = [0, Math.floor(sorted.length / 2), sorted.length - 1];
  for (const i of [...new Set(indices)]) {
    xLabels.push({
      text: dateFmt.format(new Date(sorted[i].timestamp)),
      x: toX(i),
    });
  }

  const buildPath = (s: Series): string => {
    const points: string[] = [];
    sorted.forEach((r, i) => {
      const v = r[s.key];
      if (v != null) {
        points.push(`${toX(i).toFixed(1)},${toY(v).toFixed(1)}`);
      }
    });
    if (points.length < 2) return "";
    return "M" + points.join("L");
  };

  const toggle = (key: string) =>
    setVisible((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div>
      {/* Legend / toggles */}
      <div className="mb-3 flex flex-wrap gap-3 justify-center">
        {SERIES.map((s) => (
          <label
            key={s.key}
            className="flex items-center gap-1.5 text-xs cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={visible[s.key]}
              onChange={() => toggle(s.key)}
              className="accent-current"
              style={{ color: s.color }}
            />
            <span style={{ color: s.color }}>{t(s.key)}</span>
          </label>
        ))}
      </div>

      {/* SVG Chart */}
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full"
        role="img"
        aria-label={t("chartLabel")}
      >
        {/* Grid lines */}
        {yTicks.map((tick) => (
          <g key={tick.val}>
            <line
              x1={PAD.left}
              y1={tick.y}
              x2={PAD.left + INNER_W}
              y2={tick.y}
              stroke="#1f2937"
              strokeWidth={0.5}
            />
            <text
              x={PAD.left - 4}
              y={tick.y + 3}
              textAnchor="end"
              fill="#9ca3af"
              fontSize={9}
            >
              {Math.round(tick.val)}
            </text>
          </g>
        ))}

        {/* X labels */}
        {xLabels.map((label) => (
          <text
            key={label.x}
            x={label.x}
            y={CHART_H - 4}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize={9}
          >
            {label.text}
          </text>
        ))}

        {/* Data lines */}
        {SERIES.map((s) => {
          if (!visible[s.key]) return null;
          const d = buildPath(s);
          if (!d) return null;
          return (
            <path
              key={s.key}
              d={d}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}

        {/* Data points */}
        {SERIES.map((s) => {
          if (!visible[s.key]) return null;
          return sorted.map((r, i) => {
            const v = r[s.key];
            if (v == null) return null;
            return (
              <circle
                key={`${s.key}-${i}`}
                cx={toX(i)}
                cy={toY(v)}
                r={3}
                fill={s.color}
              />
            );
          });
        })}
      </svg>
    </div>
  );
}
