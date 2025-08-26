"use client";

import CTA from "@/components/landingpage/cta";
import Features from "@/components/landingpage/features";
import Footer from "@/components/landingpage/footer";
import Hero from "@/components/landingpage/hero";
import Stats from "@/components/landingpage/stats";
import MainLoader from "@/components/shared/main-loader";
import Navbar from "@/components/shared/navbar";
import { useMainLoader } from "@/context/MainLoaderContext";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

export default function LandingPage() {
  const { mainLoading, setMainLoading } = useMainLoader();
  const { user } = useUser();

  useEffect(() => {
    setMainLoading(true);
  }, []);

  if (mainLoading || user) {
    return <MainLoader text="Wait a min..." />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      {/* Navigation */}
      <Navbar />
      {/* HeroSection */}
      <Hero />
      {/* Stats Section */}
      <Stats />
      {/* Features Section */}
      <Features />
      {/* CTA Section */}
      <CTA />
      {/* Footer */}
      <Footer />
    </div>
  );
}
