import { useTranslations } from "next-intl";
import React from "react";

function ResetButton(props) {
  const t_infos = useTranslations("App.Infos");
  return (
    <button
      className="animate bg-gradient-blue absolute right-1 top-1 z-10 rounded-full px-4 py-2 text-white opacity-30 hover:opacity-100"
      onClick={props.resetImagePaths}
    >
      {t_infos("RESET")}
    </button>
  );
}

export default ResetButton;
