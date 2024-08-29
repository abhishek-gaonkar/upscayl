import { featureFlags } from "@common/feature-flags";
import React from "react";
import Logo from "./icons/Logo";
import { useTranslations } from "next-intl";

export default function Header({ version }: { version: string }) {
  const t_app = useTranslations("APP");
  const t_infos = useTranslations("APP.HEADER");

  return (
    <a
      href="https://github.com/upscayl/upscayl"
      target="_blank"
      className={`outline-none focus-visible:ring-2`}
      data-tooltip-id="tooltip"
      data-tooltip-content={t_infos("GITHUB_STAR_TT_INFO")}
    >
      <div className="flex items-center gap-3 px-5 py-5">
        <Logo className="inline-block h-14 w-14" />
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold">
            {t_app("TITLE")}
            <span className="text-xs">
              {version} {featureFlags.APP_STORE_BUILD && "Mac"}
            </span>
          </h1>
          <p className="">{t_infos("APP_INFO")}</p>
        </div>
      </div>
    </a>
  );
}
