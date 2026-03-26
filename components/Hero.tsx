"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export default function Hero({ locale }: { locale: string }) {
    const t = useTranslations('Hero');

    const StarIcon = () => (
        <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );

    const RocketIcon = () => (
        <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.196 12.87l-.825 1.426a1.5 1.5 0 002.052 2.053l1.426-.826a7.502 7.502 0 009.68-9.682l1.623-1.624a.75.75 0 00-1.06-1.061l-1.624 1.623a7.502 7.502 0 00-9.68 9.682h.001zM11.5 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
    );

    const FlashIcon = () => (
        <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
    );

    // إعدادات الأنيميشن للقسم الرئيسي (الهيرو)
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    // تجهيز النص ليظهر كلمة بكلمة في قسم "من نحن"
    const aboutText = t('aboutDescription');
    const aboutWords = aboutText.split(" ");

    return (
        <>
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-28 overflow-hidden flex items-center min-h-[75vh]">

                {/* صورة الخلفية */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    // استدعاء الصورة من مجلد public/images مباشرة
                    style={{ backgroundImage: "url('/images/hero.png')" }}
                ></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center max-w-4xl mx-auto flex flex-col items-center"
                    >

                        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight drop-shadow-sm">
                            {t('title1')} <br />
                            <span className="text-blue-600 inline-block">{t('title2')}</span>
                        </motion.h1>

                        <motion.div variants={itemVariants} className="flex flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-2">
                            <Link
                                href={{ pathname: '/order' }}
                                className="flex-1 sm:flex-none text-center px-4 sm:px-10 py-3.5 sm:py-4 bg-gray-900 text-white rounded-full font-bold text-sm sm:text-xl hover:bg-black transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                            >
                                {t('startProject')}
                            </Link>
                            <Link
                                href={{ pathname: `/${locale}`, hash: 'portfolio' } as any}
                                className="flex-1 sm:flex-none text-center px-4 sm:px-10 py-3.5 sm:py-4 bg-white/80 text-gray-900 border-2 border-gray-900 rounded-full font-bold text-sm sm:text-xl hover:bg-gray-900 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg backdrop-blur-md"
                            >
                                {t('viewPortfolio')}
                            </Link>

                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* الشريط المتحرك */}
            <section className="bg-gray-900 py-4 overflow-hidden relative flex items-center border-t border-gray-800">
                <style>{`
          @keyframes marquee-ltr { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
          @keyframes marquee-rtl { 0% { transform: translateX(0%); } 100% { transform: translateX(50%); } }
          .animate-marquee { display: flex; width: max-content; }
          html[dir="ltr"] .animate-marquee { animation: marquee-ltr 25s linear infinite; }
          html[dir="rtl"] .animate-marquee { animation: marquee-rtl 25s linear infinite; }
          .animate-marquee:hover { animation-play-state: paused; }
        `}</style>
                <div className="animate-marquee flex items-center gap-12 md:gap-24 pl-12 md:pl-24 pr-12 md:pr-24 cursor-pointer">
                    {[...Array(6)].map((_, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-row items-center gap-3"><StarIcon /><span className="text-base md:text-lg font-bold text-gray-100 whitespace-nowrap">{t('stat1')}</span></div>
                            <div className="flex flex-row items-center gap-3"><RocketIcon /><span className="text-base md:text-lg font-bold text-gray-100 whitespace-nowrap">{t('stat2')}</span></div>
                            <div className="flex flex-row items-center gap-3"><FlashIcon /><span className="text-base md:text-lg font-bold text-gray-100 whitespace-nowrap">{t('stat3')}</span></div>
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* قسم من نحن - مع أنيميشن ظهور الكلام تدريجياً */}
            <section className="py-24 bg-white relative" id="about">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

                    {/* الحاوية الأب للقسم لتشغيل الأنيميشن المتسلسل عند التمرير */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.15 } } // تسريع بسيط للأنيميشن العام
                        }}
                        className="flex flex-col items-center"
                    >
                        {/* 1. ظهور البادج أولاً */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                            }}
                            className="inline-flex items-center px-6 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8 text-sm font-bold text-blue-700 uppercase tracking-wider"
                        >
                            {t('aboutBadge')}
                        </motion.div>

                        {/* 2. ظهور النص كلمة بكلمة */}
                        <motion.p
                            variants={{
                                hidden: { opacity: 0 },
                                // التعديل هنا: تسريع سرعة ظهور الكلمات (من 0.08 إلى 0.04)
                                visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
                            }}
                            className="text-2xl md:text-4xl text-gray-900 leading-relaxed md:leading-[1.6] font-extrabold flex flex-wrap justify-center"
                        >
                            {aboutWords.map((word, index) => (
                                <span key={index} className="inline-block">
                                    <motion.span
                                        variants={{
                                            hidden: { opacity: 0, y: 15 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
                                        }}
                                        className="inline-block"
                                    >
                                        {word}
                                    </motion.span>
                                    <span className="inline-block">&nbsp;</span>
                                </span>
                            ))}
                        </motion.p>

                        {/* 3. ظهور الخط الأزرق في النهاية */}
                        <motion.div
                            variants={{
                                hidden: { width: 0, opacity: 0 },
                                // التعديل هنا: إضافة delay لكي ينتظر حتى انتهاء الكلام قبل أن يُرسم
                                visible: { width: "5rem", opacity: 1, transition: { duration: 0.6, ease: "circOut", delay: 1.5 } }
                            }}
                            className="h-1.5 bg-blue-600 rounded-full mt-12 mx-auto"
                        />
                    </motion.div>

                </div>
            </section>
        </>
    );
}