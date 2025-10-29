
'use client';
import Hero from "@/components/landing/Hero";
import { Spinner } from "@/theme/ui/components/spinner";
import { useRouter } from "next/navigation";
import { lazy, Suspense, useEffect } from "react";
import { useUser } from "./auth/hooks/useUser";
const Features = lazy(() => import("@/components/landing/Features"));
const Footer = lazy(() => import("@/components/landing/Footer"))
const Info = lazy(() => import("@/components/landing/Info"))
const Testimonials = lazy(() => import("@/components/landing/testimonials"))
const FAQS = lazy(() => import("@/components/landing/FAQS"))
const AutoSliding = lazy(() => import("@/components/landing/autoSliding"))

export default function Home() {
  const router = useRouter();
  const { loading, user } = useUser()

  // User is already logged in → redirect to dashboard this is client side check only to avoid flicker on page load otherwise we handle this in middleware
  useEffect(() => {
    if (!loading && user) {
      router.replace("/protected/dashboard");
    }
  }, [router, loading, user]);

  if (loading) return <Spinner isFullPage={true} />
  return (
    <main className="mt-[3%] flex flex-col gap-20 py-6">
      <Hero />
      <Suspense fallback={<Spinner />}>
        <Features />
        <AutoSliding />
        <Info />
        <Testimonials />
        <FAQS />
        <Footer />
      </Suspense>
    </main>
  );
}
