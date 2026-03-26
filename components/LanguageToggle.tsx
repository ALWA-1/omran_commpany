"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageToggle() {
    const pathname = usePathname();

    // التحقق من اللغة الحالية
    const isArabic = pathname.startsWith('/ar');
    const targetLang = isArabic ? 'en' : 'ar';

    // بناء الرابط الجديد باللغة المعاكسة
    const newPath = pathname.replace(/^\/(ar|en)/, `/${targetLang}`);

    return (
        <Link
            href={newPath}
            className="text-sm font-bold text-gray-700 hover:text-blue-600 transition px-3 py-2 border border-gray-200 rounded-md"
        >
            {isArabic ? 'English' : 'عربي'}
        </Link>
    );
}