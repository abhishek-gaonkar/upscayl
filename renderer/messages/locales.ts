export const LOCALES_MAP = [
  { label: `English (US)`, value: "en-US" },
  { label: `Japanese`, value: "ja-JP" },
];

export const MAPPED_LOCALE = LOCALES_MAP.reduce((accumulator, current) => {
  accumulator[current.value] = current;
  return accumulator;
}, {});
