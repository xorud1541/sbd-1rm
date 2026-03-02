"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { HistoryRecord } from "@/types";
import HistoryList from "./HistoryList";
import ProgressChart from "./ProgressChart";

interface HistorySectionProps {
  history: HistoryRecord[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

type Tab = "list" | "chart";

export default function HistorySection({
  history,
  onDelete,
  onClearAll,
}: HistorySectionProps) {
  const t = useTranslations("history");
  const [tab, setTab] = useState<Tab>("list");

  if (history.length === 0) return null;

  const handleClear = () => {
    if (confirm(t("clearConfirm"))) {
      onClearAll();
    }
  };

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          {t("heading")}
          <span className="ml-2 text-sm font-normal text-muted">
            ({history.length})
          </span>
        </h2>
        <button
          onClick={handleClear}
          className="text-xs text-muted hover:text-red-400 transition-colors"
        >
          {t("clearAll")}
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTab("list")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            tab === "list"
              ? "bg-primary text-white"
              : "bg-card text-muted hover:text-foreground"
          }`}
        >
          {t("tabList")}
        </button>
        <button
          onClick={() => setTab("chart")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            tab === "chart"
              ? "bg-primary text-white"
              : "bg-card text-muted hover:text-foreground"
          }`}
        >
          {t("tabChart")}
        </button>
      </div>

      {/* Content */}
      {tab === "list" ? (
        <HistoryList records={history} onDelete={onDelete} />
      ) : (
        <ProgressChart records={history} />
      )}
    </section>
  );
}
