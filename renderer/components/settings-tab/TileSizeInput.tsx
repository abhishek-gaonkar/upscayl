import { tileSizeAtom } from "@/atoms/userSettingsAtom";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import React from "react";

export function TileSizeInput() {
  const [tileSize, setTileSize] = useAtom(tileSizeAtom);
  const t_infos = useTranslations("App.Infos.CUSTOM_TILE_SIZE");

  return (
    <div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{t_infos("TITLE")}</p>
        <p className="text-xs text-base-content/80">
          <br />
          {t_infos("DESC")}
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="number"
          value={tileSize}
          onChange={(e) => {
            if (e.currentTarget.value === "") {
              setTileSize(null);
              localStorage.removeItem("customWidth");
              return;
            }
            setTileSize(parseInt(e.currentTarget.value));
          }}
          placeholder="0 = Auto"
          className="input input-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
    </div>
  );
}
