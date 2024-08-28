/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    externalDir: true,
  },
  i18n: {
    locales: ["en-US", "zh-CN", "fr-FR", "ja-JP", "es-ES", "ru-RU"],
    defaultLocale: "en-US",
  },
};

module.exports = nextConfig;
