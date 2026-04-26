"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';

type Category = 'all' | 'ecommerce' | 'restaurants' | 'corporate';

// =========================================================================
// مصفوفة المشاريع
// =========================================================================
const projectsData = [
    {
        id: 'p1', category: 'ecommerce', techStack: ['React', 'Node.js', 'MongoDB'],
        link: 'https://alsafa-store.netlify.app/',
        images: [
            { url: '/images/alsafahome.png', captionAr: 'تصميم الواجهة الرئيسية الجذاب', captionEn: 'Attractive Main Interface Design' },
            { url: '/images/al2.png', captionAr: 'صفحة عرض المنتجات وتفاصيلها', captionEn: 'Products Display and Details Page' },
            { url: '/images/al3.png', captionAr: 'صفحه عرض تفاصيل المنتج ومقاساته ', captionEn: 'Shopping Cart and Secure Payment System' }
        ]
    },
    {
        id: 'p2', category: 'ecommerce', techStack: ['Next.js', 'Tailwind', 'Stripe'],
        link: 'https://omran-menu.vercel.app/',
        images: [
            { url: '/images/gg2.png', captionAr: 'الواجهة الرئيسية للمتجر', captionEn: 'Main Store Interface' },
            { url: '/images/gg1.png', captionAr: 'تصنيف المنتجات الذكي', captionEn: 'Smart Product Categorization' },
            { url: '/images/gg3.png', captionAr: 'لوحة تحكم إدارة المبيعات', captionEn: 'Sales Management Dashboard' }
        ]
    },
    {
        id: 'p3', category: 'ecommerce', techStack: ['Vue.js', 'Firebase', 'Express'],
        link: 'https://alrouha.netlify.app/',
        images: [
            { url: '/images/k12.png', captionAr: 'صفحة الموقع  الرئيسيه', captionEn: 'Offers and Discounts Screen' },
            { url: '/images/k13.png', captionAr: 'عرض الاقسام بشكل جذاب', captionEn: 'Advanced Search System' },
            { url: '/images/k11.png', captionAr: 'صفحه لوحه التحكم ', captionEn: 'Order Status Tracking' }
        ]
    },
    {
        id: 'p4', category: 'restaurants', techStack: ['React', 'Node.js', 'Framer Motion'],
        link: 'https://jolly-snickerdoodle-031e9e.netlify.app/',
        images: [
            { url: '/images/breshtahome.png', captionAr: 'تصميم المنيو الرقمي الجذاب', captionEn: 'Attractive Digital Menu Design' },
            { url: '/images/br1.png', captionAr: 'قسم العروض عباره عن كرت بيتحرك بشكل لطيف', captionEn: 'Advance Table Reservation System' },
            { url: '/images/br2.png', captionAr: 'صفحة البيتزا ', captionEn: 'Delivery Order Checkout Page' }
        ]
    },
    {
        id: 'p5', category: 'restaurants', techStack: ['Next.js', 'Tailwind', 'PostgreSQL'],
        link: 'https://test10102.netlify.app/',
        images: [
            { url: '/images/telandhome.png', captionAr: 'الواجهة الرئيسية المفتوحة للشهية', captionEn: 'Appetizing Main Interface' },
            { url: '/images/t1.png', captionAr: 'صفحة الموقع والوجبات', captionEn: 'Meals Details and Ingredients' },
            { url: '/images/t2.png', captionAr: 'صفحه التقيمات', captionEn: 'Kitchen Orders Dashboard' }
        ]
    },
    {
        id: 'p6', category: 'restaurants', techStack: ['HTML/CSS', 'JS', 'PHP'],
        link: 'https://www.costacoffee.eg',
        images: [
            { url: '/images/r2.png', captionAr: 'صفحة العروض والوجبات السريعة', captionEn: 'Fast Food and Offers Page' },
            { url: '/images/r3.png', captionAr: 'صفحه الاقسام ', captionEn: 'Delivery Location System' },
            { url: '/images/r4.png', captionAr: 'صفحه الوجبات ', captionEn: 'Cashier Control Panel' }
        ]
    },
    {
        id: 'p7', category: 'corporate', techStack: ['Next.js', 'TypeScript', 'Prisma'],
        link: 'https://ibtkarre.com/',
        images: [
            { url: '/images/o11.png', captionAr: 'الصفحة الرئيسة  للشركة', captionEn: 'Company Landing Page' },
            { url: '/images/o12.png', captionAr: 'معرض  الأعمال', captionEn: 'Portfolio and Previous Work' },
            { url: '/images/o13.png', captionAr: 'صفحه التواصل', captionEn: 'Custom Quote Request Form' }
        ]
    },
    {
        id: 'p8', category: 'corporate', techStack: ['React', 'Redux', 'AWS'],
        link: 'https://tourtk-app.vercel.app/',
        images: [
            { url: '/images/p11.png', captionAr: 'الصفحه الرئيسيه للموقع ', captionEn: 'Financial Consulting Platform' },
            { url: '/images/p12.png', captionAr: 'صفحه البقاات وشراء البقات المتاحه ', captionEn: 'Online Appointment Booking System' },
            { url: '/images/p13.png', captionAr: 'لوحة تحكم الاداره', captionEn: 'Clients Dashboard' }
        ]
    },
    {
        id: 'p9', category: 'corporate', techStack: ['WordPress', 'Custom Theme'],
        link: 'https://sar.sarpemium.com/#reviews',
        images: [
            { url: '/images/z11.png', captionAr: 'الصفحة الرئيسيه ', captionEn: 'Digital Marketing Agency Site' },
            { url: '/images/z12.png', captionAr: 'صفحة الباقات', captionEn: 'Packages and Services Display' },
            { url: '/images/z13.png', captionAr: 'صفحه التواصل', captionEn: 'Content Management System (Blog)' }
        ]
    }
];

export default function Portfolio() {
    const t = useTranslations('Portfolio');
    const locale = useLocale();

    const [activeFilter, setActiveFilter] = useState<Category>('all');
    const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

    useEffect(() => {
        if (selectedProject) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedProject]);

    const filteredProjects = activeFilter === 'all'
        ? projectsData
        : projectsData.filter(p => p.category === activeFilter);

    // ================= إعدادات الأنيميشن =================
    const headerVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const modalContentVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const modalItemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    // --- تجهيز النصوص للأنيميشن المتسلسل (CTA) ---
    const ctaTitleText = t('CTA.title');
    const ctaTitleWords = ctaTitleText.split(" ");
    const ctaDescText = t('CTA.desc');
    const ctaDescWords = ctaDescText.split(" ");

    const ctaContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const ctaWordVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <>
            <section className="py-24 bg-gray-50" id="portfolio">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* العناوين مع أنيميشن الدخول */}
                    <motion.div
                        variants={headerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t('title')}</h2>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-2xl font-bold text-blue-600">{t('subtitle')}</span>
                            <span className="text-lg text-gray-500">{t('desc')}</span>
                        </div>
                    </motion.div>

                    {/* أزرار الفلترة */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12 relative z-10">
                        {(['all', 'ecommerce', 'restaurants', 'corporate'] as Category[]).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`relative px-8 py-3 rounded-full text-base font-bold transition-colors duration-300 ${activeFilter === filter ? 'text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900'
                                    }`}
                            >
                                {activeFilter === filter && (
                                    <motion.div
                                        layoutId="active-filter"
                                        className="absolute inset-0 bg-black rounded-full -z-10 shadow-md"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{t(`filters.${filter}`)}</span>
                            </button>
                        ))}
                    </div>

                    {/* شبكة الأعمال - مع أنيميشن الفلترة (Layout Animation) */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredProjects.map((project) => (
                                <motion.div
                                    layout
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    onClick={() => setSelectedProject(project)}
                                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-xl transition-shadow flex flex-col"
                                >
                                    <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                                        <img
                                            src={project.images[0].url}
                                            alt={t(`projects.${project.id}.title`)}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{t(`projects.${project.id}.title`)}</h3>
                                        <span className="text-sm text-gray-500 font-medium">{t(`filters.${project.category}`)}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                </div>

                {/* ================= نافذة تفاصيل المشروع مع أنيميشن الانبثاق ================= */}
                <AnimatePresence>
                    {selectedProject && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                                onClick={() => setSelectedProject(null)}
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                            >

                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 rtl:left-4 ltr:right-4 z-50 w-10 h-10 bg-white hover:bg-gray-100 shadow-md border border-gray-100 rounded-full flex items-center justify-center text-gray-900 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>

                                {/* الحل السحري الجذري: حولناها لـ Grid لضمان عمل السكرول بقوة */}
                                <motion.div
                                    variants={modalContentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="w-full flex-1 min-h-0 overflow-y-auto md:overflow-hidden grid grid-cols-1 md:grid-cols-3"
                                >

                                    {/* عمود النص: يأخذ مساحة ثلث الشاشة تقريباً ومسموح له بالسكرول وحده */}
                                    <div className="md:col-span-1 p-6 pt-16 md:p-10 border-b md:border-b-0 md:border-l border-gray-100 flex flex-col md:overflow-y-auto md:min-h-0">
                                        <motion.span variants={modalItemVariants} className="text-sm font-bold text-gray-500 mb-2 block">{t(`filters.${selectedProject.category}`)}</motion.span>

                                        <motion.div variants={modalItemVariants} className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-8">
                                            <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                                                {t(`projects.${selectedProject.id}.title`)}
                                            </h3>
                                            <a
                                                href={selectedProject.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-800 text-xs md:text-sm font-bold rounded-full hover:bg-gray-200 transition-all shadow-sm border border-gray-200 group/link"
                                            >
                                                اعرض الموقع
                                                <span className="transition-transform duration-300 group-hover/link:rtl:-translate-x-1 group-hover/link:ltr:translate-x-1">→</span>
                                            </a>
                                        </motion.div>

                                        <motion.div variants={modalItemVariants} className="mb-10">
                                            <h4 className="text-lg font-bold text-gray-900 mb-3">{t('modal.aboutProject')}</h4>
                                            <p className="text-gray-600 leading-relaxed font-medium">
                                                {t(`projects.${selectedProject.id}.desc`)}
                                            </p>
                                        </motion.div>

                                        <motion.div variants={modalItemVariants} className="mb-10">
                                            <h4 className="text-lg font-bold text-gray-900 mb-4">{t('modal.techStack')}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.techStack.map((tech, idx) => (
                                                    <span key={idx} className="px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* عمود الصور: يأخذ مساحة الثلثين ومسموح له بالسكرول باستقلالية تامة */}
                                    <div className="md:col-span-2 bg-gray-50 p-6 md:p-10 flex flex-col gap-8 md:overflow-y-auto md:min-h-0">
                                        {selectedProject.images.map((imgObj, idx) => (
                                            <motion.div variants={modalItemVariants} key={idx} className="flex flex-col gap-4">
                                                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                                                    <img
                                                        src={imgObj.url}
                                                        alt={`Project Image ${idx + 1}`}
                                                        className="w-full h-auto object-cover"
                                                    />
                                                </div>
                                                <p className="text-center text-lg font-bold text-gray-800">
                                                    {locale === 'ar' ? imgObj.captionAr : imgObj.captionEn}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>

                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </section>

            {/* ========================================================================= */}
            {/* سكشن الـ CTA الجديد */}
            {/* ========================================================================= */}
            <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={ctaContainerVariants}
                        className="flex flex-col items-center"
                    >
                        {/* ظهور الرسالة الحماسية (العنوان) كلمة بكلمة */}
                        <motion.h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight flex flex-wrap justify-center">
                            {ctaTitleWords.map((word, index) => (
                                <span key={index} className="inline-block">
                                    <motion.span
                                        variants={ctaWordVariants}
                                        className="inline-block"
                                    >
                                        {word}
                                    </motion.span>
                                    <span className="inline-block">&nbsp;</span>
                                </span>
                            ))}
                        </motion.h2>

                        {/* ظهور النص الوصفي كلمة بكلمة */}
                        <motion.p className="text-base md:text-xl text-gray-700 mb-12 max-w-2xl font-medium leading-relaxed flex flex-wrap justify-center">
                            {ctaDescWords.map((word, index) => (
                                <span key={index} className="inline-block">
                                    <motion.span
                                        variants={ctaWordVariants}
                                        className="inline-block"
                                    >
                                        {word}
                                    </motion.span>
                                    <span className="inline-block">&nbsp;</span>
                                </span>
                            ))}
                        </motion.p>
                        {/* ظهور الأزرار بالألوان الاحترافية */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
                        >
                            <Link
                                href={{ pathname: `/${locale}/order` } as any}
                                className="w-full sm:w-auto text-center px-10 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-md transform hover:-translate-y-1"
                            >
                                أنشئ موقعك الآن 
                            </Link>

                            {/* التعديل السحري هنا: حولناه لزر يرسل الإشارة اللاسلكية */}
                            <button
                                onClick={() => window.dispatchEvent(new Event('openContactModal'))}
                                className="w-full sm:w-auto text-center px-10 py-4 bg-transparent border-2 border-black text-black rounded-xl font-bold text-lg hover:bg-black hover:text-white transition-all transform hover:-translate-y-1 cursor-pointer"
                            >
                                تواصل معنا للتفاصيل
                            </button>
                        </motion.div>

                    </motion.div>

                </div>
            </section>
        </>
    );
}
