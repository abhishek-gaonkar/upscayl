import { useAtom, useAtomValue } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { themeChange } from "theme-change";
import { TModelsList, modelsListAtom } from "../../../atoms/modelsListAtom";
import useLog from "../../hooks/useLog";
import {
  noImageProcessingAtom,
  savedOutputPathAtom,
  progressAtom,
  rememberOutputFolderAtom,
  scaleAtom,
  customWidthAtom,
  useCustomWidthAtom,
} from "../../../atoms/userSettingsAtom";
import { featureFlags } from "@common/feature-flags";
import getModelScale from "@common/check-model-scale";
import COMMAND from "@common/commands";
import Select from "react-select";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { ImageScaleSelect } from "@/components/settings-tab/ImageScaleSelect";
import { useTranslations } from "next-intl";

interface IProps {
  selectImageHandler: () => Promise<void>;
  selectFolderHandler: () => Promise<void>;
  handleModelChange: (e: any) => void;
  upscaylHandler: () => Promise<void>;
  batchMode: boolean;
  setBatchMode: React.Dispatch<React.SetStateAction<boolean>>;
  imagePath: string;
  doubleUpscayl: boolean;
  setDoubleUpscayl: React.Dispatch<React.SetStateAction<boolean>>;
  dimensions: {
    width: number | null;
    height: number | null;
  };
  setSaveImageAs: React.Dispatch<React.SetStateAction<string>>;
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
  setGpuId: React.Dispatch<React.SetStateAction<string>>;
}

function LeftPaneImageSteps({
  selectImageHandler,
  selectFolderHandler,
  handleModelChange,
  upscaylHandler,
  batchMode,
  setBatchMode,
  imagePath,
  doubleUpscayl,
  setDoubleUpscayl,
  dimensions,
  setSaveImageAs,
  model,
  setModel,
  setGpuId,
}: IProps) {
  const [currentModel, setCurrentModel] = useState<TModelsList[0]>({
    label: null,
    value: null,
  });

  const modelOptions = useAtomValue(modelsListAtom);
  const [scale, setScale] = useAtom(scaleAtom);
  const noImageProcessing = useAtomValue(noImageProcessingAtom);
  const [outputPath, setOutputPath] = useAtom(savedOutputPathAtom);
  const [progress, setProgress] = useAtom(progressAtom);
  const rememberOutputFolder = useAtomValue(rememberOutputFolderAtom);
  const [open, setOpen] = React.useState(false);
  const [customWidth, setCustomWidth] = useAtom(customWidthAtom);
  const [useCustomWidth, setUseCustomWidth] = useAtom(useCustomWidthAtom);

  const [targetWidth, setTargetWidth] = useState<number>(null);
  const [targetHeight, setTargetHeight] = useState<number>(null);

  const { logit } = useLog();
  const { toast } = useToast();
  const t_infos = useTranslations("App.Infos.LEFT_PANE_PROCESS");
  const outputHandler = async () => {
    var path = await window.electron.invoke(COMMAND.SELECT_FOLDER);
    if (path !== null) {
      logit("🗂 Setting Output Path: ", path);
      setOutputPath(path);
    } else {
      setOutputPath(null);
    }
  };

  useEffect(() => {
    themeChange(false);

    if (!localStorage.getItem("saveImageAs")) {
      logit("⚙️ Setting saveImageAs to png");
      localStorage.setItem("saveImageAs", "png");
    } else {
      const currentlySavedImageFormat = localStorage.getItem("saveImageAs");
      logit(
        "⚙️ Getting saveImageAs from localStorage: ",
        currentlySavedImageFormat,
      );
      setSaveImageAs(currentlySavedImageFormat);
    }

    if (!localStorage.getItem("model")) {
      setCurrentModel(modelOptions[0]);
      setModel(modelOptions[0].value);
      localStorage.setItem("model", JSON.stringify(modelOptions[0]));
      logit("🔀 Setting model to", modelOptions[0].value);
    } else {
      const currentlySavedModel = JSON.parse(
        localStorage.getItem("model"),
      ) as (typeof modelOptions)[0];
      setCurrentModel(currentlySavedModel);
      setModel(currentlySavedModel.value);
      logit(
        "⚙️ Getting model from localStorage: ",
        JSON.stringify(currentlySavedModel),
      );
    }

    if (!localStorage.getItem("gpuId")) {
      localStorage.setItem("gpuId", "");
      logit("⚙️ Setting gpuId to empty string");
    } else {
      const currentlySavedGpuId = localStorage.getItem("gpuId");
      setGpuId(currentlySavedGpuId);
      logit("⚙️ Getting gpuId from localStorage: ", currentlySavedGpuId);
    }
  }, []);

  useEffect(() => {
    logit("🔀 Setting model to", currentModel.value);
  }, [currentModel]);

  useEffect(() => {
    setTargetWidth(getUpscaleResolution().width);
    setTargetHeight(getUpscaleResolution().height);
  }, [dimensions.width, dimensions.height, doubleUpscayl, scale]);

  const getUpscaleResolution = useCallback(() => {
    const newDimensions = {
      width: dimensions.width,
      height: dimensions.height,
    };

    let doubleScale = parseInt(scale) * parseInt(scale);
    let singleScale = parseInt(scale);

    if (doubleUpscayl) {
      if (useCustomWidth) {
        newDimensions.width = customWidth;
        newDimensions.height = Math.round(
          customWidth * (dimensions.height / dimensions.width),
        );
      } else {
        const newWidth = dimensions.width * doubleScale;
        const newHeight = dimensions.height * doubleScale;
        newDimensions.width = newWidth;
        newDimensions.height = newHeight;
      }
    } else {
      if (useCustomWidth) {
        newDimensions.width = customWidth;
        newDimensions.height = Math.round(
          customWidth * (dimensions.height / dimensions.width),
        );
      } else {
        newDimensions.width = dimensions.width * singleScale;
        newDimensions.height = dimensions.height * singleScale;
      }
    }

    return newDimensions;
  }, [dimensions.width, dimensions.height, doubleUpscayl, scale]);

  return (
    <div
      className={`animate-step-in animate flex h-screen flex-col gap-7 overflow-y-auto overflow-x-hidden p-5`}
    >
      {/* BATCH OPTION */}
      <div className="flex flex-row items-center gap-2">
        <input
          type="checkbox"
          className="toggle"
          defaultChecked={batchMode}
          onClick={() => {
            if (!rememberOutputFolder) {
              setOutputPath("");
            }
            setProgress("");
            setBatchMode((oldValue) => !oldValue);
          }}
        ></input>
        <p
          className="mr-1 inline-block cursor-help text-sm"
          data-tooltip-id="tooltip"
          data-tooltip-content={t_infos("BATCH.TT_INFO")}
        >
          {t_infos("BATCH.TITLE")}
        </p>
      </div>

      {/* STEP 1 */}
      <div className="animate-step-in">
        <p className="step-heading">{t_infos("STEP_1.TITLE")}</p>
        <button
          className="btn btn-primary"
          onClick={!batchMode ? selectImageHandler : selectFolderHandler}
          data-tooltip-id="tooltip"
          data-tooltip-content={imagePath}
        >
          {batchMode ? t_infos("STEP_1.BATCH_YES") : t_infos("STEP_1.BATCH_NO")}
        </button>
      </div>

      {/* STEP 2 */}
      <div className="animate-step-in group flex flex-col gap-4">
        <div>
          <p className="step-heading">{t_infos("STEP_2.TITLE")}</p>
          <p className="mb-2 text-sm">{t_infos("STEP_2.SELECT_MODEL")}</p>

          <Select
            onMenuOpen={() => setOpen(true)}
            onMenuClose={() => setOpen(false)}
            options={modelOptions}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => null,
            }}
            onChange={(e) => {
              handleModelChange(e);
              setCurrentModel({ label: e.label, value: e.value });
            }}
            className={cn(
              "react-select-container transition-all group-hover:w-full group-active:w-full focus:w-full",
              open && "!w-full",
            )}
            classNamePrefix="react-select"
            value={currentModel}
          />
        </div>

        {!batchMode && (
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              className="checkbox"
              checked={doubleUpscayl}
              onChange={(e) => {
                if (e.target.checked) {
                  setDoubleUpscayl(true);
                } else {
                  setDoubleUpscayl(false);
                }
              }}
            />
            <p
              className="cursor-pointer text-sm"
              onClick={(e) => {
                setDoubleUpscayl(!doubleUpscayl);
              }}
            >
              {t_infos("DOUBLE_UPSCAYL.TITLE")}
            </p>
            <button
              className="badge badge-neutral badge-sm cursor-help"
              data-tooltip-id="tooltip"
              data-tooltip-content={t_infos("DOUBLE_UPSCAYL.TT_INFO")}
            >
              ?
            </button>
          </div>
        )}

        <ImageScaleSelect scale={scale} setScale={setScale} hideInfo />
      </div>

      {/* STEP 3 */}
      <div className="animate-step-in">
        <div className="flex flex-col pb-2">
          <div className="step-heading flex items-center gap-2">
            <span className="leading-none">{t_infos("STEP_3.TITLE")}</span>
            {featureFlags.APP_STORE_BUILD && (
              <button
                className="badge badge-outline badge-sm cursor-pointer"
                onClick={() => alert(t_infos("STEP_3.MACOS_RESTRICTION_ALERT"))}
              >
                ?
              </button>
            )}
          </div>
          {!outputPath && featureFlags.APP_STORE_BUILD && (
            <div className="text-xs">
              <span className="rounded-btn bg-base-200 px-2 font-medium uppercase text-base-content/50">
                {t_infos("STEP_3.NOT_SELECTED")}
              </span>
            </div>
          )}
        </div>
        {!batchMode && !featureFlags.APP_STORE_BUILD && (
          <p className="mb-2 text-sm">
            {!batchMode
              ? t_infos("STEP_3.DEFAULT_IMG_PATH")
              : t_infos("STEP_3.DEFAULT_FOLDER_PATH")}
          </p>
        )}
        <button
          className="btn btn-primary"
          data-tooltip-content={outputPath}
          data-tooltip-id="tooltip"
          onClick={outputHandler}
        >
          {t_infos("STEP_3.SET_OUTPUT_FOLDER")}
        </button>
      </div>

      {/* STEP 4 */}
      <div className="animate-step-in">
        <p className="step-heading">{t_infos("STEP_4.TITLE")}</p>
        {dimensions.width && dimensions.height && (
          <p className="mb-2 text-sm">
            {t_infos("STEP_4.UPSCAYL_FROM")}
            <span className="font-bold">
              {dimensions.width}x{dimensions.height}
            </span>
            {t_infos("STEP_4.UPSCAYL_TO")}
            <span className="font-bold">
              {getUpscaleResolution().width}x{getUpscaleResolution().height}
            </span>
          </p>
        )}
        <button
          className="btn btn-secondary"
          onClick={
            progress.length > 0 || !outputPath
              ? () =>
                  toast({
                    description: t_infos("STEP_4.FOLDER_ALERT"),
                  })
              : upscaylHandler
          }
        >
          {progress.length > 0
            ? t_infos("STEP_4.PROCESS_IN_PROGRESS")
            : t_infos("STEP_4.PROCESS_START")}
        </button>
      </div>

      <Tooltip
        className="z-[999] max-w-sm break-words !bg-secondary"
        id="tooltip"
      />
    </div>
  );
}

export default LeftPaneImageSteps;
