import { useTranslations } from "next-intl";
import React from "react";

export function ResetSettings() {
  const t_infos = useTranslations("APP.INFOS.RESET_SETTINGS");

  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-sm font-medium">{t_infos("TITLE")}</p>
      <button
        className="btn btn-primary"
        onClick={async () => {
          localStorage.clear();
          alert(t_infos("ON_RESET"));
        }}
      >
        {t_infos("TITLE")}
      </button>
    </div>
  );
}
