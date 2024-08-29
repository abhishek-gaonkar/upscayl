import { useTranslations } from "next-intl";

type ImageFormatSelectProps = {
  batchMode: boolean;
  saveImageAs: string;
  setExportType: (arg: string) => void;
};

export function ImageFormatSelect({
  batchMode,
  saveImageAs,
  setExportType,
}: ImageFormatSelectProps) {
  const t_infos = useTranslations("APP.INFOS.IMAGE_FORMAT");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1">
        <p className="text-sm font-medium">{t_infos("SAVE_AS")}</p>
        {/* <p className="badge-primary badge text-[10px] font-medium">
          EXPERIMENTAL
        </p> */}
      </div>
      <div className="flex flex-col gap-2">
        {batchMode && <p className="text-xs text-base-content/80"></p>}
        <div className="flex flex-wrap gap-2">
          {/* PNG */}
          <button
            className={`btn ${saveImageAs === "png" && "btn-primary"}`}
            onClick={() => setExportType("png")}
          >
            {t_infos("PNG")}
          </button>
          {/* JPG */}
          <button
            className={`btn ${saveImageAs === "jpg" && "btn-primary"}`}
            onClick={() => setExportType("jpg")}
          >
            {t_infos("JPG")}
          </button>
          {/* WEBP */}
          <button
            className={`btn ${saveImageAs === "webp" && "btn-primary"}`}
            onClick={() => setExportType("webp")}
          >
            {t_infos("WEBP")}
          </button>
        </div>
      </div>
    </div>
  );
}
