import { useState, useEffect, useCallback } from "react";
import type { HistoryRecord } from "@/types";
import {
  getHistory,
  addRecord,
  deleteRecord,
  clearHistory,
} from "@/utils/history";

export function useHistory() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const add = useCallback((record: HistoryRecord) => {
    addRecord(record);
    setHistory(getHistory());
  }, []);

  const remove = useCallback((id: string) => {
    deleteRecord(id);
    setHistory(getHistory());
  }, []);

  const clear = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  return { history, add, remove, clear };
}
