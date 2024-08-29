import { useCustomWidthAtom } from "@/atoms/userSettingsAtom";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";

type ImageScaleSelectProps = {
  scale: string;
  setScale: React.Dispatch<React.SetStateAction<string>>;
  hideInfo?: boolean;
};

export function ImageScaleSelect({
  scale,
  setScale,
  hideInfo,
}: ImageScaleSelectProps) {
  const useCustomWidth = useAtomValue(useCustomWidthAtom);
  const t_infos = useTranslations("APP.INFOS.IMAGE_SCALE");
  const t_errors = useTranslations("APP.ERRORS.IMAGE_SCALE_WARN");

  return (
    <div className={`${useCustomWidth && "opacity-50"}`}>
      <div className="flex flex-row gap-1">
        {hideInfo ? (
          <>
            <p className="text-sm">
              {t_infos("TITLE")}{" "}
              <span className="text-xs">
                {t_infos("SCALES_TIMES", { scale })}
              </span>
            </p>
            {hideInfo && parseInt(scale) >= 6 && (
              <p
                className="badge badge-warning text-xs font-bold"
                data-tooltip-id="tooltip"
                data-tooltip-content={t_errors("PERF_ISSUE")}
              >
                !
              </p>
            )}
          </>
        ) : (
          <p className="text-sm font-medium">
            {t_infos("TITLE_CAPS")} {t_infos("SCALES_TIMES", { scale })}{" "}
            {useCustomWidth && "DISABLED"}
          </p>
        )}
      </div>
      {!hideInfo && (
        <p className="text-xs text-base-content/80">
          {t_infos("AI_UPSCALE_RESIZE_INFO")}
        </p>
      )}
      {!hideInfo && parseInt(scale) >= 6 && (
        <p className="text-xs text-base-content/80 text-red-500">
          {t_errors("PERF_ISSUE_DEVICE")}
        </p>
      )}

      <input
        type="range"
        min="1"
        max="16"
        placeholder="Example: 1320"
        value={scale}
        onChange={(e: any) => {
          setScale(e.target.value.toString());
        }}
        step="1"
        className="range range-primary mt-2"
        disabled={useCustomWidth}
      />
    </div>
  );
}
