"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl'; // 1. استدعاء useLocale
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';

// 2. إزالة { locale } من هنا ليعمل الناف بار بشكل مستقل في كل الصفحات
export default function Navbar() {
    const t = useTranslations('Navbar');
    const tm = useTranslations('ContactModal');

    // 3. جلب اللغة الحالية برمجياً
    const locale = useLocale();

    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isContactModalOpen || isMobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isContactModalOpen, isMobileMenuOpen]);

    // ========================================================
    // الكود الجديد: الاستماع للرابط لفتح المودال من أي مكان بالموقع
    // ========================================================
    // الاستماع للإشارة اللاسلكية (Custom Event) لفتح النافذة
    // ========================================================
    useEffect(() => {
        // 1. دالة التقاط الإشارة لفتح النافذة
        const handleOpenModal = () => setIsContactModalOpen(true);

        // 2. الاستماع للإشارة
        window.addEventListener('openContactModal', handleOpenModal);

        // (اختياري) لو حد دخل من رابط مباشر آخره #contact
        const checkHash = () => {
            if (window.location.hash === '#contact') {
                setIsContactModalOpen(true);
                window.history.replaceState(null, '', window.location.pathname);
            }
        };
        checkHash();

        return () => {
            window.removeEventListener('openContactModal', handleOpenModal);
        };
    }, []);

    return (
        <>
            <nav className="fixed top-0 inset-x-0 z-50 w-full bg-white/85 backdrop-blur-lg border-b border-gray-200 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* الشعار */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href={`/${locale}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                <img src="/images/logo.png" alt="Omran Tech" className="w-16 h-16 object-contain" />
                                <div className="text-2xl font-black text-gray-900 tracking-tight">
                                    عمران <span className="text-blue-600">تك</span>
                                </div>
                            </Link>
                        </div>

                        {/* روابط القائمة للديسكتوب */}
                        <div className="hidden md:flex items-center gap-6 lg:gap-10">
                            <Link href={`/${locale}`} className="text-gray-900 hover:text-blue-600 font-bold transition">{t('home')}</Link>
                            {/* إضافة / قبل علامة # تضمن الانتقال السليم من أي صفحة فرعية */}
                            <Link href={`/${locale}/#services`} className="text-gray-900 hover:text-blue-600 font-bold transition">{t('services')}</Link>
                            <Link href={`/${locale}/#portfolio`} className="text-gray-900 hover:text-blue-600 font-bold transition">{t('portfolio')}</Link>
                            <Link href={`/${locale}/order`} className="text-gray-900 hover:text-blue-600 font-bold transition">{t('buildSite')}</Link>
                            <button onClick={() => setIsContactModalOpen(true)} className="text-gray-900 hover:text-blue-600 font-bold transition cursor-pointer">
                                {t('contact')}
                            </button>
                        </div>

                        {/* قسم تغيير اللغة */}
                        <div className="hidden md:flex items-center gap-4">
                            <LanguageToggle />
                        </div>

                        {/* زر قائمة الموبايل */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-900 p-2 focus:outline-none">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>

                {/* قائمة الموبايل المنسدلة */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-xl flex flex-col">
                        <div className="px-4 py-6 flex flex-col gap-6">
                            <Link onClick={() => setIsMobileMenuOpen(false)} href={`/${locale}`} className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">{t('home')}</Link>
                            <Link onClick={() => setIsMobileMenuOpen(false)} href={`/${locale}/#services`} className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">{t('services')}</Link>
                            <Link onClick={() => setIsMobileMenuOpen(false)} href={`/${locale}/#portfolio`} className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">{t('portfolio')}</Link>
                            <Link onClick={() => setIsMobileMenuOpen(false)} href={`/${locale}/order`} className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">{t('buildSite')}</Link>
                            <button onClick={() => { setIsMobileMenuOpen(false); setIsContactModalOpen(true); }} className="text-xl font-bold text-gray-900 text-right rtl:text-right ltr:text-left border-b border-gray-100 pb-2">
                                {t('contact')}
                            </button>
                            <div className="pt-2">
                                <LanguageToggle />
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* نافذة التواصل (Modal) */}
            {isContactModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsContactModalOpen(false)}></div>
                    <div className="relative bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-fade-in text-center border border-gray-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-2">{tm('title')}</h3>
                        <p className="text-gray-500 mb-8 font-medium text-sm leading-relaxed">{tm('subtitle')}</p>

                        <div className="flex flex-col gap-4">
                            <a href="tel:+201000000000" className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
                                <span className="text-lg font-bold text-gray-800" dir="ltr">+20 100 000 0000</span>
                            </a>
                            <a href="mailto:hello@omrantech.com" className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
                                <span className="text-lg font-bold text-gray-800">hello@omrantech.com</span>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
                                <span className="text-lg font-bold text-gray-800">صفحتنا على فيسبوك</span>
                            </a>
                        </div>
                        <button onClick={() => setIsContactModalOpen(false)} className="mt-6 w-full p-4 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-black transition-colors">
                            {tm('close')}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
