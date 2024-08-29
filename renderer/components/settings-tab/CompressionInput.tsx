import { useTranslations } from "next-intl";

type CompressionInputProps = {
  compression: number;
  handleCompressionChange: (arg: any) => void;
};

export function CompressionInput({
  compression,
  handleCompressionChange,
}: CompressionInputProps) {
  const t_infos = useTranslations("APP.INFOS.IMAGE_COMPRESSION");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 text-sm font-medium uppercase">
        <p className="shrink-0">{t_infos("TITLE", { compression })}</p>
      </div>
      {compression > 0 && (
        <p className="text-xs text-base-content/80">
          {t_infos("LOSSLESS_TIP")}
        </p>
      )}
      <input
        type="range"
        placeholder="Type here"
        className="range range-primary w-full max-w-xs"
        min={0}
        max={100}
        value={compression}
        onChange={handleCompressionChange}
      />
    </div>
  );
}
