import { useTranslations } from "next-intl";
import React from "react";

function RightPaneInfo({ version, batchMode }) {
  const t_infos = useTranslations("APP.INFOS.RIGHT_PANE_INFO");

  return (
    <div className="flex flex-col items-center rounded-btn bg-base-200 p-4">
      <p className="pb-1 text-lg font-semibold">
        {batchMode ? t_infos("SELECT_FOLDER") : t_infos("SELECT_IMAGE")}
      </p>
      {batchMode ? (
        <p className="w-full pb-5 text-center text-base-content/80 md:w-96">
          {t_infos("NOTE_SPECIFIC_FORMATS_IN_FOLDER")}
        </p>
      ) : (
        <p className="w-full pb-5 text-center text-base-content/80 md:w-96">
          {t_infos("SELECT_IMAGES")}
        </p>
      )}
      <p className="badge badge-primary text-sm">
        {t_infos("APP_VERSION", { version })}
      </p>
    </div>
  );
}

export default RightPaneInfo;
