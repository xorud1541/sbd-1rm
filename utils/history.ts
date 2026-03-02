import type { CalculationResult, HistoryRecord } from "@/types";

const STORAGE_KEY = "sbd-history";
const MAX_RECORDS = 50;

export function getHistory(): HistoryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const records: HistoryRecord[] = JSON.parse(raw);
    return records.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

export function addRecord(record: HistoryRecord): void {
  const records = getHistory();
  records.unshift(record);
  if (records.length > MAX_RECORDS) {
    records.length = MAX_RECORDS;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function deleteRecord(id: string): void {
  const records = getHistory().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function buildRecord(
  bodyWeight: number,
  result: CalculationResult
): HistoryRecord {
  return {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    bodyWeight,
    squat: result.squat?.average,
    bench: result.bench?.average,
    deadlift: result.deadlift?.average,
    total: result.total,
    wilks: result.wilks,
    level: result.level,
  };
}
