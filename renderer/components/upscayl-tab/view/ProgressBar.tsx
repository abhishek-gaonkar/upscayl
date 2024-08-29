import React, { CSSProperties, useEffect } from "react";
import Spinner from "../../icons/Spinner";
import Logo from "@/components/icons/Logo";
import { useTranslations } from "next-intl";

function ProgressBar({
  progress,
  doubleUpscaylCounter,
  stopHandler,
  batchMode,
}: {
  progress: string;
  doubleUpscaylCounter: number;
  stopHandler: () => void;
  batchMode: boolean;
}) {
  const [batchProgress, setBatchProgress] = React.useState(0);
  const t_infos = useTranslations("APP.INFOS.PROGRESS_BAR");

  useEffect(() => {
    const progressString = progress.trim().replace(/\n/g, "");
    // Remove trailing and leading spaces
    if (progressString.includes("Successful")) {
      setBatchProgress((prev) => prev + 1);
    }
  }, [progress]);

  return (
    <div className="absolute z-50 flex h-full w-full flex-col items-center justify-center bg-base-300/50 backdrop-blur-lg">
      <div className="flex flex-col items-center rounded-btn bg-base-100/50 p-4 backdrop-blur-lg">
        <Logo className="spinner mb-4 h-12 w-12" />
        <p className="rounded-full px-2 pb-2 font-bold">
          {batchMode && `${t_infos("IN_PROGRESS")} ${batchProgress}`}
        </p>
        {progress !== "Hold on..." ? (
          <div
            className="radial-progress text-center"
            style={
              {
                "--value": parseFloat(progress.replace("%", "")),
              } as React.CSSProperties
            }
            role="progressbar"
            aria-valuenow={parseFloat(progress.replace("%", ""))}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {progress}
            {!batchMode &&
              doubleUpscaylCounter > 0 &&
              "\nPass " + doubleUpscaylCounter}
          </div>
        ) : (
          progress
        )}
        <p className="animate-pulse rounded-full px-2 pb-3 text-sm font-medium">
          {t_infos("PROGRESS_CATCHY")}
        </p>
        <button onClick={stopHandler} className="btn btn-outline">
          {t_infos("STOP")}
        </button>
      </div>
    </div>
  );
}

export default ProgressBar;
