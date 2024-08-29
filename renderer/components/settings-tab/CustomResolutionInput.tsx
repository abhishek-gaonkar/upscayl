import { customWidthAtom, useCustomWidthAtom } from "@/atoms/userSettingsAtom";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";

export function CustomResolutionInput() {
  const [useCustomWidth, setUseCustomWidth] = useAtom(useCustomWidthAtom);
  const [customWidth, setCustomWidth] = useAtom(customWidthAtom);

  const t_infos = useTranslations("APP.INFOS.CUSTOM_INPUT_RESOLUTION");

  return (
    <div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{t_infos("WIDTH")}</p>
        <p className="text-xs text-base-content/80">
          <b>{t_infos("RESTART")}</b>
          <br />
          {t_infos("CUSTOM_WIDTH_TIP")}
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="checkbox"
          className="toggle"
          checked={useCustomWidth}
          onClick={(e) => {
            if (!e.currentTarget.checked) {
              localStorage.removeItem("customWidth");
            }
            setUseCustomWidth(!useCustomWidth);
          }}
        />
        <input
          type="number"
          value={customWidth}
          disabled={!useCustomWidth}
          onChange={(e) => {
            if (e.currentTarget.value === "") {
              setUseCustomWidth(false);
              setCustomWidth(null);
              localStorage.removeItem("customWidth");
              return;
            }
            setCustomWidth(parseInt(e.currentTarget.value));
          }}
          step="1"
          min="1"
          className="input input-primary h-7 w-32 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
    </div>
  );
}
