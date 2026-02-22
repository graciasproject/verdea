import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Process from "@/components/sections/Process";
import Gallery from "@/components/sections/Gallery";
import Positioning from "@/components/sections/Positioning";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <BeforeAfter />
      <Process />
      <Gallery />
      <Positioning />
      <CTA />
    </>
  );
}
