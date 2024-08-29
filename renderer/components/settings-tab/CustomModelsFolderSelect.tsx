import React from "react";
import commands from "../../../common/commands";
import { useTranslations } from "next-intl";

type CustomModelsFolderSelectProps = {
  customModelsPath: string;
  setCustomModelsPath: (arg: string) => void;
};

export function CustomModelsFolderSelect({
  customModelsPath,
  setCustomModelsPath,
}: CustomModelsFolderSelectProps) {
  const t_infos = useTranslations("APP.INFOS.CUSTOM_MODELS");
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-sm font-medium">{t_infos("ADD")}</p>
      <p className="text-xs text-base-content/80">
        {t_infos("INFO")}
        <a
          href="https://github.com/upscayl/custom-models/blob/main/README.md"
          className="link underline"
          target="_blank"
        >
          {t_infos("LINK_TEXT")}
        </a>
      </p>
      <p className="text-sm text-base-content/60">{customModelsPath}</p>
      <button
        className="btn btn-primary"
        onClick={async () => {
          const customModelPath = await window.electron.invoke(
            commands.SELECT_CUSTOM_MODEL_FOLDER,
          );

          if (customModelPath !== null) {
            setCustomModelsPath(customModelPath);
            window.electron.send(commands.GET_MODELS_LIST, customModelPath);
          } else {
            setCustomModelsPath("");
          }
        }}
      >
        {t_infos("SELECT_FOLDER")}
      </button>
    </div>
  );
}
