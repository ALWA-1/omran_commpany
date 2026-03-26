import OrderForm from "@/components/OrderForm";

// تحديث الـ params لتكون متوافقة مع Next.js 15
export default async function OrderPage({ params }: { params: Promise<{ locale: string }> }) {
  // فك الـ Promise
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-gray-50 selection:bg-blue-600 selection:text-white pt-20">
      {/* تم حذف استدعاء الناف بار من هنا لأنه أصبح يعمل تلقائياً من ملف الـ layout 
        وتم إضافة pt-20 للـ main لكي لا يختفي المحتوى تحت الناف بار الثابت
      */}
      <OrderForm locale={locale} />
    </main>
  );
}