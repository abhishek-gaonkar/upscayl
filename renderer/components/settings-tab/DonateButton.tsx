import { useTranslations } from "next-intl";
import React from "react";
export function DonateButton({}) {
  const t_infos = useTranslations("App.Infos.DONATE");
  return (
    <div className="flex flex-col gap-2 text-sm font-medium">
      <p>{t_infos("IF_LIKED")}</p>
      <a
        href="https://buymeacoffee.com/fossisthefuture"
        target="_blank"
        className="btn btn-primary"
      >
        {t_infos("DONATE")}
      </a>
    </div>
  );
}
