"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // =========================================================
        // التعديل الجديد: إجبار المتصفح على الصعود لأول الصفحة دائماً
        // =========================================================
        // 1. إيقاف الذاكرة الافتراضية للمتصفح
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        // 2. الصعود لأعلى نقطة (0, 0) فوراً قبل حتى أن يختفي اللودر
        window.scrollTo(0, 0);

        // هذه الدالة تتأكد أن الموقع (بكل صوره وملفاته) تم تحميله بالكامل
        const handleLoad = () => {
            // تأخير نصف ثانية إضافية لإعطاء إحساس بالاستقرار والفخامة
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        };

        // إذا كان الموقع محملاً مسبقاً
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            // الانتظار حتى يكتمل التحميل
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    // أنيميشن الاختفاء السينمائي (يصعد لأعلى ويتلاشى مع تأثير زجاجي)
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white"
                >
                    {/* الشعار والنص مع تأثير النبض الهادئ */}
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4], scale: [0.98, 1, 0.98] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-4"
                    >
                        {/* تأكد أن مسار صورة اللوجو صحيح كما لديك */}
                        <img src="/images/logo.png" alt="Omran Tech" className="w-20 h-auto max-h-20 object-contain" />
                        <div className="text-3xl font-black text-gray-900 tracking-tight">
                            عمران <span className="text-blue-600">تك</span>
                        </div>
                    </motion.div>

                    {/* شريط التحميل الاحترافي البسيط */}
                    <div className="w-48 h-1 bg-gray-100 rounded-full mt-10 overflow-hidden relative">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                            initial={{ width: "0%", left: "0%" }}
                            animate={{ width: ["0%", "100%", "100%"], left: ["0%", "0%", "100%"] }}
                            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}