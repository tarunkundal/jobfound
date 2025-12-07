
'use client';;
import { Spinner } from "@/theme/ui/components/spinner";
import { useRouter } from "next/navigation";
import { lazy, Suspense, useEffect } from "react";
import { useUser } from "../(auth)/_hooks/useUser";
import Hero from "./_components/Hero";
import HomeHeader from "./_components/header";
import CTASection from "./_components/CTASection";
const Features = lazy(() => import("./_components/Features"));
const Footer = lazy(() => import("./_components/Footer"))
const Info = lazy(() => import("./_components/Info"))
const Testimonials = lazy(() => import("./_components/testimonials"))
const FAQS = lazy(() => import("./_components/FAQS"))
const AutoSliding = lazy(() => import("./_components/autoSliding"))

export default function Home() {
  const router = useRouter();
  const { loading, session } = useUser()

  // User is already logged in → redirect to dashboard this is client side check only to avoid flicker on page load otherwise we handle this in middleware
  useEffect(() => {
    if (!loading && session) {
      router.replace("/dashboard");
    }
  }, [router, loading, session]);

  if (loading) return <Spinner isFullPage={true} />
  return (
    <>
      <HomeHeader />
      <main className="mt-[3%] flex flex-col gap-16 py-6">
        <Hero />
        <Suspense fallback={<Spinner />}>
          <Features />
          <AutoSliding />
          <Info />
          <Testimonials />
          <FAQS />
          <CTASection />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
