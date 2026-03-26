"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
// 1. استدعاء AnimatePresence و motion لعمل أنيميشن تبديل التبويبات
import { motion, AnimatePresence, Variants } from 'framer-motion';

type TabType = 'ecommerce' | 'restaurants' | 'corporate';

const tabImages = {
    ecommerce: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    restaurants: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    corporate: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
};

export default function ServiceDetails({ locale }: { locale: string }) {
    const t = useTranslations('ServiceDetails');
    const [activeTab, setActiveTab] = useState<TabType>('ecommerce');

    const currentFeatures = t.raw(`${activeTab}.features`) as string[];

    const CheckIcon = () => (
        <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
    );

    // ================= إعدادات الأنيميشن =================
    // أنيميشن حاوية المحتوى (دخول متسلسل وخروج ناعم)
    const contentVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.15 // تأخير بسيط بين ظهور النصوص والصورة
            }
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } } // عند التبديل لتبويب آخر
    };

    // أنيميشن العناصر الفردية (النصوص والصور)
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="py-24 bg-gray-50 border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* أزرار التبويبات (Tabs) - مع أنيميشن الانزلاق السحري */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-8 md:mb-16"
                >
                    <div className="relative inline-flex bg-white border border-gray-200 rounded-full p-1.5 shadow-sm overflow-x-auto max-w-full z-10">
                        {(['ecommerce', 'restaurants', 'corporate'] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-6 md:px-10 py-3 rounded-full text-sm md:text-base font-bold transition-colors duration-300 whitespace-nowrap ${activeTab === tab ? 'text-white' : 'text-gray-600 hover:text-black hover:bg-gray-50'
                                    }`}
                            >
                                {/* تأثير انزلاق الخلفية السوداء (Premium Effect) */}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="active-tab-indicator"
                                        className="absolute inset-0 bg-black rounded-full -z-10 shadow-md"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{t(`tabs.${tab}`)}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* محتوى التبويب النشط (يتبدل بانسيابية عند الضغط) */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100"
                    >

                        {/* الجانب النصي */}
                        <div className="w-full text-center lg:text-start rtl:lg:text-right ltr:lg:text-left">

                            <motion.h3 variants={itemVariants} className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight">
                                {t(`${activeTab}.title`)}
                            </motion.h3>
                            <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                                {t(`${activeTab}.desc`)}
                            </motion.p>

                            {/* شبكة المميزات */}
                            <motion.ul variants={itemVariants} className="grid grid-cols-2 gap-y-4 gap-x-2 md:gap-x-6 mb-10 text-sm md:text-base">
                                {currentFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-center justify-start gap-2 text-gray-800 font-medium text-start">
                                        <CheckIcon />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </motion.ul>

                            {/* الأزرار المزدوجة */}
                            <motion.div variants={itemVariants} className="flex flex-row items-center justify-center lg:justify-start gap-3 w-full">
                                <Link
                                    href={`/${locale}/order`}
                                    className="flex-1 lg:flex-none text-center px-2 py-3.5 md:px-8 md:py-4 text-sm md:text-lg font-bold text-white bg-black rounded-full hover:bg-gray-800 transition-colors shadow-md"
                                >
                                    {t(`${activeTab}.cta`)}
                                </Link>
                                <Link
                                    // الحل السحري: فصلنا المسار (pathname) عن الـ (hash)
                                    href={{ pathname: `/${locale}`, hash: 'portfolio' } as any}
                                    className="flex-1 lg:flex-none text-center px-2 py-3.5 md:px-8 md:py-4 text-sm md:text-lg font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    {t('viewWork')}
                                </Link>
                            </motion.div>
                        </div>

                        {/* الجانب الصوري */}
                        <motion.div variants={itemVariants} className="relative w-full aspect-square md:aspect-video lg:aspect-square bg-gray-100 rounded-[2rem] overflow-hidden flex flex-col justify-end p-6 border border-gray-200 group shadow-lg">

                            {/* أضفنا key للصورة لتتغير بنعومة أيضاً */}
                            <motion.img
                                key={`img-${activeTab}`}
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                src={tabImages[activeTab]}
                                alt={t(`tabs.${activeTab}`)}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>

                            {/* بطاقات الإحصائيات */}
                            <motion.div variants={itemVariants} className="relative z-10 flex gap-3 md:gap-4 mt-auto">
                                <div className="bg-white/95 backdrop-blur-sm p-3 md:px-6 md:py-4 rounded-xl shadow-sm border border-white/50 flex-1 text-center">
                                    <span className="block text-xl md:text-2xl font-extrabold text-gray-900">{t(`${activeTab}.delivery`)}</span>
                                    <span className="text-xs md:text-sm font-medium text-gray-600">{t(`${activeTab}.deliveryLabel`)}</span>
                                </div>
                                <div className="bg-white/95 backdrop-blur-sm p-3 md:px-6 md:py-4 rounded-xl shadow-sm border border-white/50 flex-1 text-center">
                                    <span className="block text-xl md:text-2xl font-extrabold text-gray-900">{t(`${activeTab}.responsive`)}</span>
                                    <span className="text-xs md:text-sm font-medium text-gray-600">{t(`${activeTab}.responsiveLabel`)}</span>
                                </div>
                            </motion.div>
                        </motion.div>

                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    );
}