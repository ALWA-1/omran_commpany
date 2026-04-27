"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type ProjectType = 'ecommerce' | 'restaurant' | 'corporate' | 'other' | null;
type DashboardType = 'yes' | 'no' | null;
type ContractType = 'buy' | 'rent' | null;

// نقلنا مصفوفة الدول خارج المكون ليتعرف عليها TypeScript بشكل سليم
const countryKeys = ['sa', 'ae', 'eg', 'kw', 'qa', 'bh', 'om', 'jo', 'other'];

export default function OrderForm({ locale }: { locale: string }) {
    const t = useTranslations('OrderForm');

    // حالات النموذج الأساسي
    const [type, setType] = useState<ProjectType>(null);
    const [customName, setCustomName] = useState('');
    const [customDesc, setCustomDesc] = useState('');
    const [dashboard, setDashboard] = useState<DashboardType>(null);
    const [contract, setContract] = useState<ContractType>(null);

    // حالات النافذة المنبثقة (Modal)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientName, setClientName] = useState('');
    const [clientCountry, setClientCountry] = useState('');

    // إيقاف التمرير في الصفحة عند فتح النافذة
    useEffect(() => {
        if (isModalOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isModalOpen]);

    // رقم الواتساب الخاص بك (قم بتغييره)
    const whatsappNumber = "96555237906";

    // دالة الإرسال النهائي
    const handleFinalSubmit = () => {
        // تجميع البيانات
        let message = `مرحباً عمران تك، أريد بناء مشروع جديد.%0a%0a`;

        // بيانات العميل (تم حل مشكلة TypeScript هنا باستخدام as any للمفتاح الديناميكي)
        message += `👤 *الاسم:* ${clientName}%0a`;
        message += `🌍 *الدولة:* ${t(`modal.countries.${clientCountry}` as any)}%0a`;
        message += `------------------------%0a`;

        // بيانات المشروع
        if (type === 'other') {
            message += `📌 *نوع المشروع:* فكرة خاصة%0a`;
            message += `🏷️ *اسم المشروع:* ${customName}%0a`;
            message += `📝 *الوصف:* ${customDesc}%0a`;
        } else {
            message += `📌 *نوع المشروع:* ${t(`types.${type}`)}%0a`;
        }

        message += `📊 *لوحة التحكم:* ${dashboard === 'yes' ? 'نعم مطلوب' : 'غير مطلوب'}%0a`;
        message += `🤝 *نظام التعاقد:* ${contract === 'buy' ? 'شراء الموقع' : 'إيجار (شامل الاستضافة)'}`;

        // فتح واتساب وإغلاق النافذة
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        setIsModalOpen(false);
    };

    return (
        <section className="py-24 bg-gray-50 min-h-screen relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{t('title')}</h1>
                    <p className="text-lg text-gray-600">{t('subtitle')}</p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100 space-y-12 relative z-10">

                    {/* الخطوة 1: نوع المشروع */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('step1')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(['ecommerce', 'restaurant', 'corporate', 'other'] as ProjectType[]).map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setType(item)}
                                    className={`p-5 rounded-2xl border-2 text-right rtl:text-right ltr:text-left transition-all font-bold text-lg ${type === item ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:border-blue-300'
                                        }`}
                                >
                                    {t(`types.${item}`)}
                                </button>
                            ))}
                        </div>

                        {/* الحقول الإضافية إذا اختار "أخرى" */}
                        {type === 'other' && (
                            <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-4 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('customProject.nameLabel')}</label>
                                    <input
                                        type="text"
                                        value={customName}
                                        onChange={(e) => setCustomName(e.target.value)}
                                        placeholder={t('customProject.namePlaceholder')}
                                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{t('customProject.descLabel')}</label>
                                    <textarea
                                        rows={3}
                                        value={customDesc}
                                        onChange={(e) => setCustomDesc(e.target.value)}
                                        placeholder={t('customProject.descPlaceholder')}
                                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* الخطوة 2: لوحة التحكم */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('step2')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => setDashboard('yes')}
                                className={`p-5 rounded-2xl border-2 text-right rtl:text-right ltr:text-left transition-all font-bold ${dashboard === 'yes' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:border-blue-300'
                                    }`}
                            >
                                {t('dashboard.yes')}
                            </button>
                            <button
                                onClick={() => setDashboard('no')}
                                className={`p-5 rounded-2xl border-2 text-right rtl:text-right ltr:text-left transition-all font-bold ${dashboard === 'no' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:border-blue-300'
                                    }`}
                            >
                                {t('dashboard.no')}
                            </button>
                        </div>
                    </div>

                    {/* الخطوة 3: نظام الشراء */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('step3')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => setContract('buy')}
                                className={`p-6 rounded-2xl border-2 text-right rtl:text-right ltr:text-left transition-all ${contract === 'buy' ? 'border-black bg-gray-900 text-white' : 'border-gray-200 text-gray-700 hover:border-gray-400'
                                    }`}
                            >
                                <span className="block font-extrabold text-xl mb-2">{t('contract.buy')}</span>
                                <span className={`text-sm ${contract === 'buy' ? 'text-gray-300' : 'text-gray-500'}`}>{t('contract.buyDesc')}</span>
                            </button>
                            <button
                                onClick={() => setContract('rent')}
                                className={`p-6 rounded-2xl border-2 text-right rtl:text-right ltr:text-left transition-all ${contract === 'rent' ? 'border-black bg-gray-900 text-white' : 'border-gray-200 text-gray-700 hover:border-gray-400'
                                    }`}
                            >
                                <span className="block font-extrabold text-xl mb-2">{t('contract.rent')}</span>
                                <span className={`text-sm ${contract === 'rent' ? 'text-gray-300' : 'text-gray-500'}`}>{t('contract.rentDesc')}</span>
                            </button>
                        </div>
                    </div>

                    {/* زر المتابعة (يفتح النافذة) */}
                    <div className="pt-8 border-t border-gray-100">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            disabled={!type || !dashboard || !contract || (type === 'other' && (!customName || !customDesc))}
                            className="w-full p-5 rounded-2xl bg-blue-600 text-white font-extrabold text-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            {t('submit')}
                        </button>
                    </div>
                </div>

            </div>

            {/* ================= النافذة المنبثقة (Modal) ================= */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* خلفية معتمة */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* صندوق النافذة */}
                    <div className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-fade-in">

                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            {t('modal.title')}
                        </h3>

                        <div className="space-y-5 mb-8">
                            {/* حقل الاسم */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t('modal.nameLabel')}</label>
                                <input
                                    type="text"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    placeholder={t('modal.namePlaceholder')}
                                    // التعديل هنا: أضفنا text-gray-900 للنص المكتوب، و placeholder:text-gray-400 للنص الإرشادي
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all text-gray-900 placeholder:text-gray-400"
                                />
                            </div>

                            {/* حقل الدولة */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t('modal.countryLabel')}</label>
                                <select
                                    value={clientCountry}
                                    onChange={(e) => setClientCountry(e.target.value)}
                                    // التعديل هنا: أضفنا text-gray-900 ليصبح النص الأسود هو الأساسي
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all cursor-pointer appearance-none text-gray-900"
                                >
                                    <option value="" disabled className="text-gray-500">{t('modal.countryPlaceholder')}</option>
                                    {countryKeys.map((key) => (
                                        // التعديل هنا: تأكيد لون الخيارات ليكون أسود
                                        <option key={key} value={key} className="text-gray-900 font-medium">
                                            {t(`modal.countries.${key}` as any)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* أزرار النافذة */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleFinalSubmit}
                                disabled={!clientName || !clientCountry}
                                className="w-full p-4 rounded-xl bg-green-600 text-white font-bold text-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                                {t('modal.finalSubmit')}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full p-4 rounded-xl bg-gray-100 text-gray-700 font-bold text-lg hover:bg-gray-200 transition-colors"
                            >
                                {t('modal.close')}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </section>
    );
}
