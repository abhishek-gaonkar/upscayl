import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { MAPPED_LOCALE, LOCALES_MAP } from "@/messages/locales";
import Link from "next/link";
import { ICONS } from "@/messages/icons";
import Image from "next/image";

const LanguageSelect = () => {
  const router = useRouter();
  const [activeLocale, setActiveLocale] = useState(
    MAPPED_LOCALE[router.locale],
  );
  const t_infos = useTranslations("APP.INFOS.LANGUAGE");

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{t_infos("TITLE")}</p>
      <div className="flex gap-2">
        <Image
          src={ICONS[activeLocale.value]}
          alt={activeLocale.value}
          height={50}
          className="shadow-lg"
        />
        <select
          data-choose-theme
          className="select select-primary w-full"
          onChange={(e) => {
            setActiveLocale(MAPPED_LOCALE[e.target.value]);
            router.push(router.route, router.route, {
              locale: e.target.value,
            });
          }}
        >
          {LOCALES_MAP.map((lang) => {
            return (
              <option className="my-10" value={lang.value} key={lang.value}>
                <Link href={router.route} locale={activeLocale.value}>
                  {lang.label.toLocaleUpperCase()}
                </Link>
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelect;
