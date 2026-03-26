import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ServiceDetails from "@/components/ServiceDetails";
import Portfolio from "@/components/Portfolio";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  // استخدام await لحل مشكلة undefined
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-white selection:bg-blue-600 selection:text-white">
      <Hero locale={locale} />
      <Services locale={locale} />
      <ServiceDetails locale={locale} />
      
      {/* التعديل هنا: حذفنا locale={locale} لأن مكون Portfolio أصبح يعتمد على نفسه لمعرفة اللغة */}
      <Portfolio />
    </main>
  );
}