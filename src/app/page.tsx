"use client";
import { Testimonials } from "@/components/landing/testimonials";
import Instructions from "@/components/landing/Instructions";
import { FAQ } from "@/components/landing/faq";
import HeroSection from "@/components/landingPage/hero-section";
import AgentSection from "@/components/landingPage/agent-section";
import FeatureSection from "@/components/landingPage/feature-section";
import PricingSection from "@/components/landingPage/pricing-section";
import WaitingList from "@/components/landingPage/waiting-list";
import IphoneModal from "@/components/landing/iphonemodal";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Blog1 from "@/components/landing/blog1";
import Blogone from "@/components/landing/blog1";
import { VideoModal } from "@/components/Modal/video-model";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/ui/footer";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen sm:max-w-screen md:w-auto px-1 lg:px-2 xl:px-8 2xl:px-6">
      
      <HeroSection />

      <AgentSection />

      <Instructions />

      <FeatureSection />

      <PricingSection />

      {/* Testimonial Section */}
      {/* <Testimonials /> */}

      <WaitingList />

      {/* FAQ Section */}
      <FAQ />

      <Blogone />
      <Footer />
      {/*video Model */}
      {/* <VideoModal
        videoSrc="https://cdn.pixabay.com/video/2025/05/13/278750_large.mp4"
        title="Sample Video - Big Buck Bunny"
      /> */}
    </div>
  );
}
