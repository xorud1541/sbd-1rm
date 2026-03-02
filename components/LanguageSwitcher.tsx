"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "ko" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex gap-1 text-xs">
      <button
        onClick={() => switchLocale("ko")}
        className={`rounded px-2 py-1 transition-colors ${
          locale === "ko"
            ? "bg-primary text-white"
            : "text-muted hover:text-foreground"
        }`}
      >
        KO
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`rounded px-2 py-1 transition-colors ${
          locale === "en"
            ? "bg-primary text-white"
            : "text-muted hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
}
