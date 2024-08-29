import {
  savedOutputPathAtom,
  rememberOutputFolderAtom,
} from "@/atoms/userSettingsAtom";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

export function SaveOutputFolderToggle() {
  const [outputPath, setOutputPath] = useAtom(savedOutputPathAtom);
  const [rememberOutputFolder, setRememberOutputFolder] = useAtom(
    rememberOutputFolderAtom,
  );
  const t_infos = useTranslations("APP.INFOS.SAVE_OUTPUT_FOLDER");

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{t_infos("TITLE")}</p>
      <p className="text-xs text-base-content/80">{t_infos("DESC")}</p>

      <p className="font-mono text-sm">{outputPath}</p>
      <input
        type="checkbox"
        className="toggle"
        checked={rememberOutputFolder}
        onClick={() => {
          setRememberOutputFolder((oldValue) => {
            if (oldValue === true) {
              setOutputPath("");
            }
            return !oldValue;
          });
          localStorage.setItem(
            "rememberOutputFolder",
            JSON.stringify(!rememberOutputFolder),
          );
        }}
      />
    </div>
  );
}
