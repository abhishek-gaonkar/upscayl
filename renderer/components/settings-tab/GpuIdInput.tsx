import { useTranslations } from "next-intl";
import React from "react";

type GpuIdInputProps = {
  gpuId: string;
  handleGpuIdChange: (arg: string) => void;
};

export function GpuIdInput({ gpuId, handleGpuIdChange }) {
  const t_infos = useTranslations("APP.INFOS.GPU_ID_INPUT");
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{t_infos("ID")}</p>
      <p className="text-xs text-base-content/80">{t_infos("READ_DOCS")}</p>
      {window.electron.platform === "win" && (
        <p className="text-xs text-base-content/80">
          {t_infos("ENABLE_PERF_MODE")}
        </p>
      )}
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        value={gpuId}
        onChange={handleGpuIdChange}
      />
    </div>
  );
}
