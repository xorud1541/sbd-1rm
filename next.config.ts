import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// TODO: PWA 전환 위치
const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
