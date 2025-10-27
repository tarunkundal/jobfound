
'use client';;
import AutoSliding from "@/components/landing/autoSliding";
import FAQS from "@/components/landing/FAQS";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Info from "@/components/landing/Info";
import Testimonials from "@/components/landing/testimonials";
import { Spinner } from "@/theme/ui/components/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "./auth/hooks/useUser";

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
      <Features />
      <AutoSliding />
      <Info />
      <Testimonials />
      <FAQS />
      <Footer />
    </main>
  );
}
