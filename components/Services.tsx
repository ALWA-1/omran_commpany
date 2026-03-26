"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

type ServiceType = 'ecommerce' | 'restaurants' | 'corporate';

export default function Services({ locale }: { locale: string }) {
    const t = useTranslations('Services');
    const [activeService, setActiveService] = useState<ServiceType | null>(null);

    const ecommerceFeatures = t.raw('ecommerce.features') as string[];
    const restaurantsFeatures = t.raw('restaurants.features') as string[];
    const corporateFeatures = t.raw('corporate.features') as string[];

    // 1. صور النماذج الخاصة بكل خدمة
    const portfolioImages = {
        ecommerce: [
            '/images/alsafahome.png',
            '/images/e2.png'
        ],
        restaurants: [
            '/images/breshtahome.png',
            '/images/r2.png'
        ],
        corporate: [
            '/images/c2.png',
            '/images/c1.png'
        ]
    };

    // 2. مصفوفة بيانات الخدمات
    const servicesData = [
        {
            key: 'ecommerce' as ServiceType,
            imageSrc: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
            features: ecommerceFeatures,
            previewLink: 'https://example-ecommerce.com'
        },
        {
            key: 'restaurants' as ServiceType,
            imageSrc: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
            features: restaurantsFeatures,
            previewLink: 'https://example-restaurant.com'
        },
        {
            key: 'corporate' as ServiceType,
            imageSrc: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
            features: corporateFeatures,
            previewLink: 'https://example-corporate.com'
        },
    ];

    // إيقاف التمرير عند فتح الدرج الجانبي
    useEffect(() => {
        if (activeService) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [activeService]);

    const CheckIcon = () => (
        <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
        </svg>
    );

    // ================= إعدادات الأنيميشن للموقع الرئيسي =================
    const headerVariants: Variants = {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const cardsContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    // ================= إعدادات الأنيميشن السينمائي والبطيء داخل النافذة =================
    const drawerContentVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
                delayChildren: 0.4
            }
        }
    };

    const drawerItemVariants: Variants = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section id="services" className="py-24 bg-gray-50 relative border-t border-gray-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* العناوين العلوية للقسم */}
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-600 text-sm font-bold tracking-wider uppercase mb-3 block bg-blue-50 w-fit mx-auto px-4 py-1.5 rounded-full">
                        {t('badge')}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        {t('mainTitle')}
                    </h2>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* شبكة البطاقات الثلاثة */}
                <motion.div
                    variants={cardsContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
                >
                    {servicesData.map((service) => (
                        <motion.div variants={cardVariants} key={service.key} className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2 overflow-hidden">

                            {/* --- التعديل هنا: تم حذف الديف الخاص بالنص والزر بالكامل لتكون الصورة في الأعلى مباشرة --- */}

                            <div className="relative w-full h-56 overflow-hidden">
                                <img
                                    src={service.imageSrc}
                                    alt={t(`${service.key}.title`)}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                                <div className="absolute bottom-6 px-8 w-full text-start ltr:text-left rtl:text-right">
                                    <h3 className="text-2xl font-bold text-white mb-1 leading-snug">{t(`${service.key}.title`)}</h3>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow text-start ltr:text-left rtl:text-right">
                                <p className="text-gray-500 mb-8 min-h-[48px] font-medium leading-relaxed">{t(`${service.key}.desc`)}</p>
                                <ul className="space-y-4 mb-8 flex-grow">
                                    {service.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-800 font-medium text-start ltr:text-left rtl:text-right">
                                            <CheckIcon /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => setActiveService(service.key)} className="group/btn w-full inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-black hover:text-white text-gray-900 font-bold py-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100/50">
                                    {t('learnMore')}
                                    <span className="transition-transform duration-300 group-hover/btn:rtl:-translate-x-1 group-hover/btn:ltr:translate-x-1">→</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* ================= النافذة الجانبية (Drawer) للتفاصيل ================= */}

            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${activeService ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setActiveService(null)}
            ></div>

            <div
                className={`fixed top-0 bottom-0 ${locale === 'ar' ? 'left-0' : 'right-0'} w-full md:w-[85vw] lg:w-[60vw] bg-white z-[101] shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${activeService ? 'translate-x-0' : (locale === 'ar' ? '-translate-x-full' : 'translate-x-full')}`}
            >
                {activeService && (
                    <>
                        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 p-6 flex justify-between items-center z-10 shadow-sm">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                                {t(`drawer.details.${activeService}.title`)}
                            </h3>
                            <button
                                onClick={() => setActiveService(null)}
                                className="w-10 h-10 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-full flex items-center justify-center transition-colors focus:outline-none shrink-0"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <motion.div
                            variants={drawerContentVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12"
                        >

                            {/* 1. تأثير الخدمة */}
                            <motion.div variants={drawerItemVariants} className="bg-blue-50 rounded-3xl p-8 border border-blue-100 text-start ltr:text-left rtl:text-right">
                                <h4 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📈</span> {t('drawer.impactTitle')}
                                </h4>
                                <p className="text-blue-800 leading-relaxed font-medium text-lg">
                                    {t(`drawer.details.${activeService}.impact`)}
                                </p>
                            </motion.div>

                            {/* 2. المميزات التفصيلية */}
                            <motion.div variants={drawerItemVariants}>
                                <h4 className="text-2xl font-bold text-gray-900 mb-6 text-start ltr:text-left rtl:text-right">{t('drawer.featuresTitle')}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(t.raw(`drawer.details.${activeService}.extendedFeatures`) as string[]).map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-start ltr:text-left rtl:text-right">
                                            <div className="mt-0.5"><CheckIcon /></div>
                                            <span className="text-gray-800 font-medium leading-snug">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* 3. صور الأعمال */}
                            <motion.div variants={drawerItemVariants}>
                                <h4 className="text-2xl font-bold text-gray-900 mb-6 text-start ltr:text-left rtl:text-right">{t('drawer.workTitle')}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {portfolioImages[activeService].map((imgUrl, idx) => (
                                        <div key={idx} className="w-full aspect-video rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative group bg-gray-100">
                                            <img
                                                src={imgUrl}
                                                alt={`Portfolio ${idx + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* 4. الأزرار السفلية */}
                            <motion.div variants={drawerItemVariants} className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4">
                                <Link
                                    href={{ pathname: `/${locale}/order` } as any}
                                    onClick={() => setActiveService(null)}
                                    className="flex-1 w-full text-center py-4 px-8 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-md"
                                >
                                    {t('drawer.orderNow')}
                                </Link>
                                <Link

                                    // التعديل هنا: توجيه للصفحة الرئيسية مع إضافة hash للنزول لقسم الأعمال
                                    href={{ pathname: `/${locale}`, hash: 'portfolio' } as any}
                                    onClick={() => setActiveService(null)}
                                    className="flex-1 w-full text-center py-4 px-8 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl font-bold text-lg hover:bg-blue-100 hover:text-blue-800 transition-colors"
                                >
                                    {t('drawer.viewPortfolio')}
                                </Link>
                            </motion.div>

                        </motion.div>
                    </>
                )}
            </div>

        </section>
    );
}