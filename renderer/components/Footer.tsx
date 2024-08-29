import { newsAtom, showNewsModalAtom } from "@/atoms/newsAtom";
import { useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import React from "react";

function Footer() {
  const setShowNewsModal = useSetAtom(showNewsModalAtom);
  const news = useAtomValue(newsAtom);

  const t_app = useTranslations("APP");
  const t_infos = useTranslations("APP.FOOTER");

  return (
    <div className="p-2 text-center text-xs text-base-content/50">
      {news && !news?.data?.dontShow && (
        <button
          className="badge badge-neutral mb-2"
          onClick={() => setShowNewsModal(true)}
        >
          {t_infos("NEWS_TITLE")}
        </button>
      )}
      <p>
        {t_infos("COPYRIGHT")} {new Date().getFullYear()} -{" "}
        <a
          className="font-bold"
          href="https://github.com/upscayl/upscayl"
          target="_blank"
        >
          {t_app("TITLE")}
        </a>
      </p>
      <p>
        {t_infos("BY")}
        <a
          href="https://github.com/upscayl"
          className="font-bold"
          target="_blank"
        >
          {t_infos("APP_TEAM")}
        </a>
      </p>
    </div>
  );
}

export default Footer;
