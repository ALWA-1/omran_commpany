import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from "next";
// import { Inter, Cairo } from "next/font/google"; // يمكنك تفعيلها إذا كنت تستخدمها
import "../globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // استدعاء الفوتّر الاحترافي

// 1. تعريف الأنواع بشكل صريح ومتوافق مع Next.js 15
type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// 2. تمرير الأنواع للـ Layout
export default async function RootLayout({ children, params }: LayoutProps) {

  // 3. فك الـ Promise بشكل صحيح (إجباري في Next 15)
  const { locale } = await params;

  // 4. جلب نصوص الترجمة
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* تم إضافة flex و min-h-screen لدفع الفوتّر لأسفل الصفحة دائماً */}
      <body className="selection:bg-blue-600 selection:text-white flex flex-col min-h-screen">

        <NextIntlClientProvider messages={messages}>

          {/* الناف بار الثابت */}
          <Navbar />

          {/* كلاس flex-grow يجعل المحتوى يأخذ المساحة المتبقية لكي ينزل الفوتّر للأسفل */}
          <main className="flex-grow">
            {children}
          </main>

          {/* الفوتّر الاحترافي في نهاية الصفحة */}
          <Footer />

        </NextIntlClientProvider>

      </body>
    </html>
  );
}