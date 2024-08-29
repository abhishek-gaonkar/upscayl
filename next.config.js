/**
 * @type {import('next').NextConfig}
 **/

/**
 * Define LOCALES
 * These values should match
 * with ones in renderer/messages/locales.ts
 */
const DEFAULT_LOCALE = "en-US";
const LOCALES = ["en-US", "ja-JP"];

/**
 * nextConfig definition
 */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  experimental: {
    externalDir: true,
  },
  i18n: {
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  },
};

module.exports = nextConfig;
