import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  // يمكنك وضع أي إعدادات أخرى هنا مستقبلاً
};

export default withNextIntl(nextConfig);