"use client";

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
// استدعاء مكتبة الأنيميشن
import { motion, Variants } from 'framer-motion';

export default function Footer() {
    const t = useTranslations();
    const locale = useLocale();
    const currentYear = new Date().getFullYear();

    // ================= إعدادات الأنيميشن للفوتر =================
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    return (
        <footer className="bg-[#050505] text-gray-300 pt-24 pb-8 border-t border-gray-900 relative overflow-hidden">

            {/* إضاءة خلفية خافتة جداً في المنتصف تعطي إحساساً بالعمق */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* الحاوية الأب للأنيميشن المتسلسل */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16"
                >

                    {/* ================= 1. العمود الأول: الشعار والوصف ================= */}
                    <motion.div variants={itemVariants} className="lg:col-span-4">
                         <Link href={`/${locale}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                                       <img src="/images/logo.png" alt="Omran Tech" className="w-16 h-16 object-contain" />
                                                       <div className="text-2xl font-white text-white-900 tracking-tight">
                                                           عمران <span className="text-blue-600">تك</span>
                                                       </div>
                                                   </Link>
                        <p className="text-gray-400 text-base leading-relaxed mb-8 pr-0 lg:pr-6 font-medium">
                            {t('Footer.desc')}
                        </p>

                        <div className="flex items-center gap-4">
                            <motion.a whileHover={{ scale: 1.1, y: -4 }} href="https://facebook.com" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all shadow-lg">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z" /></svg>
                            </motion.a>
                            <motion.a whileHover={{ scale: 1.1, y: -4 }} href="https://wa.me/201000000000" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all shadow-lg">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.122.553 4.195 1.603 6.014L.266 23.439l5.539-1.452a11.968 11.968 0 006.226 1.734c6.645 0 12.03-5.385 12.03-12.03S18.676 0 12.031 0zm6.656 17.203c-.282.795-1.636 1.543-2.257 1.636-.583.087-1.334.128-3.79-.893-2.955-1.228-4.846-4.25-4.994-4.445-.148-.195-1.192-1.587-1.192-3.023 0-1.437.747-2.146 1.018-2.427.271-.282.593-.353.79-.353.197 0 .393.003.565.01.182.008.427-.071.65.467.234.565.795 1.944.867 2.088.071.144.118.315.02.505-.1.19-.148.307-.295.478-.147.171-.31.365-.443.488-.147.135-.304.286-.138.574.166.288.74 1.225 1.595 1.986 1.103.98 2.028 1.282 2.316 1.417.288.135.457.113.626-.08.17-.193.73-8.852.925-1.143.196-.291.392-.243.655-.145.263.098 1.666.786 1.95 9.27.284.144.475.234.542.364.067.13.067.755-.215 1.55z" /></svg>
                            </motion.a>
                            <motion.a whileHover={{ scale: 1.1, y: -4 }} href="mailto:hello@omrantech.com" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#EA4335] hover:text-white hover:border-[#EA4335] transition-all shadow-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* ================= 2. العمود الثاني: الروابط ================= */}
                    <motion.div variants={itemVariants} className="lg:col-span-4 grid grid-cols-2 gap-4 sm:gap-8">
                        {/* روابط هامة */}
                        <div>
                            <h4 className="text-white text-base md:text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                                {t('Footer.quickLinks')}
                            </h4>
                            <ul className="space-y-4 font-medium text-sm md:text-base">
                                <li><Link href={{ pathname: `/${locale}/` } as any} className="text-gray-400 hover:text-white hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all">{t('Navbar.home')}</Link></li>
                                <li><Link href={{ pathname: `/${locale}`, hash: 'services' } as any} className="text-gray-400 hover:text-white hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all">{t('Navbar.services')}</Link></li>
                                <li><Link href={{ pathname: `/${locale}`, hash: 'portfolio' } as any} className="text-gray-400 hover:text-white hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all">{t('Navbar.portfolio')}</Link></li>
                                <li><Link href={{ pathname: `/${locale}/order` } as any} className="text-gray-400 hover:text-white hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all">{t('Navbar.buildSite')}</Link></li>
                            </ul>
                        </div>

                        {/* أبرز خدماتنا */}
                        <div>
                            <h4 className="text-white text-base md:text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                                {t('Footer.ourServices')}
                            </h4>
                            <ul className="space-y-4 font-medium text-sm md:text-base">
                                <li><Link href={{ pathname: `/${locale}`, hash: 'services' } as any} className="text-gray-400 hover:text-white hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all">تصميم المتاجر</Link></li>
                                <li><Link href={{ pathname: `/${locale}`, hash: 'services' } as any} className="text-gray-400 hover:text-white hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all">مواقع الشركات</Link></li>
                                <li><Link href={{ pathname: `/${locale}`, hash: 'services' } as any} className="text-gray-400 hover:text-white hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all">منيو المطاعم</Link></li>
                                <li><Link href={{ pathname: `/${locale}/order` } as any} className="text-gray-400 hover:text-white hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all">برمجة خاصة</Link></li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* ================= 3. العمود الثالث: معلومات التواصل (الاحترافية) ================= */}
                    <motion.div variants={itemVariants} className="lg:col-span-4">
                        <h4 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                            {t('Footer.contact')}
                        </h4>

                        <div className="flex flex-col gap-3">
                            {/* بطاقة واتساب */}
                            <a href="https://wa.me/201000000000" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group">
                                <div className="w-12 h-12 rounded-xl bg-gray-800/80 flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300 shadow-sm shrink-0">
                                    <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.122.553 4.195 1.603 6.014L.266 23.439l5.539-1.452a11.968 11.968 0 006.226 1.734c6.645 0 12.03-5.385 12.03-12.03S18.676 0 12.031 0zm6.656 17.203c-.282.795-1.636 1.543-2.257 1.636-.583.087-1.334.128-3.79-.893-2.955-1.228-4.846-4.25-4.994-4.445-.148-.195-1.192-1.587-1.192-3.023 0-1.437.747-2.146 1.018-2.427.271-.282.593-.353.79-.353.197 0 .393.003.565.01.182.008.427-.071.65.467.234.565.795 1.944.867 2.088.071.144.118.315.02.505-.1.19-.148.307-.295.478-.147.171-.31.365-.443.488-.147.135-.304.286-.138.574.166.288.74 1.225 1.595 1.986 1.103.98 2.028 1.282 2.316 1.417.288.135.457.113.626-.08.17-.193.73-8.852.925-1.143.196-.291.392-.243.655-.145.263.098 1.666.786 1.95 9.27.284.144.475.234.542.364.067.13.067.755-.215 1.55z" /></svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-bold tracking-wide uppercase mb-0.5">{t('Footer.whatsapp')}</span>
                                    <span className="text-gray-200 font-bold group-hover:text-white transition-colors duration-300" dir="ltr">+20 100 000 0000</span>
                                </div>
                            </a>

                            {/* بطاقة البريد الإلكتروني */}
                            <a href="mailto:hello@omrantech.com" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group">
                                <div className="w-12 h-12 rounded-xl bg-gray-800/80 flex items-center justify-center group-hover:bg-[#EA4335] transition-colors duration-300 shadow-sm shrink-0">
                                    <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-bold tracking-wide uppercase mb-0.5">{t('Footer.email')}</span>
                                    <span className="text-gray-200 font-bold group-hover:text-white transition-colors duration-300">hello@omrantech.com</span>
                                </div>
                            </a>

                            {/* بطاقة الموقع */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="w-12 h-12 rounded-xl bg-gray-800/80 flex items-center justify-center shadow-sm shrink-0">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-bold tracking-wide uppercase mb-0.5">{t('Footer.location')}</span>
                                    <span className="text-gray-200 font-bold">القاهرة، مصر</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>

                {/* ================= شريط حقوق النشر السفلي ================= */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="pt-8 border-t border-gray-800/60 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-gray-500 text-sm font-medium">
                        {t('Footer.rights', { year: currentYear })}
                    </p>
                    <div className="flex gap-6 text-sm font-medium">
                        <Link href={{ pathname: `/${locale}/` } as any} className="text-gray-500 hover:text-white transition-colors">سياسة الخصوصية</Link>
                        <Link href={{ pathname: `/${locale}/` } as any} className="text-gray-500 hover:text-white transition-colors">الشروط والأحكام</Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}