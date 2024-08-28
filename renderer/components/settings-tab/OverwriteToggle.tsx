import { overwriteAtom } from "@/atoms/userSettingsAtom";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

const OverwriteToggle = () => {
  const [overwrite, setOverwrite] = useAtom(overwriteAtom);
  const t_infos = useTranslations("App.Infos.OVERWRITE_TOGGLE");

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{t_infos("OW_PREV")}</p>
      <p className="text-xs text-base-content/80">{t_infos("OW_TIP")}</p>
      <input
        type="checkbox"
        className="toggle"
        checked={overwrite}
        onClick={() => {
          setOverwrite((oldValue: boolean) => {
            if (oldValue) {
              localStorage.removeItem("overwrite");
              return false;
            } else {
              return true;
            }
          });
          localStorage.setItem("overwrite", JSON.stringify(!overwrite));
        }}
      />
    </div>
  );
};

export default OverwriteToggle;
