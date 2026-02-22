"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Local magnetic button component
const MagneticButton = ({ children, href, className }: { children: React.ReactNode, href: string, className: string }) => {
  const btnRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    
    const xTo = gsap.quickTo(btn, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(btn, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = btn.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.4);
      yTo(y * 0.4);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Link ref={btnRef} href={href} className={className}>
      {children}
    </Link>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax
      gsap.to(bgRef.current, {
        yPercent: 20,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text Reveal Animation - Staggered lines
      const tl = gsap.timeline();
      
      tl.from(".reveal-text span", {
        y: 120,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.3,
        rotationZ: 2,
      }).from(
        ".reveal-subtitle",
        {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1"
      ).from(
        ".reveal-btn",
        {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 bg-black">
        <video
          ref={bgRef}
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/20 to-[#0A0A0A]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20">
        <h1 className="reveal-text text-4xl md:text-6xl lg:text-[5rem] font-serif text-verdea-stone max-w-5xl leading-[1.1] mb-8">
          <span className="block overflow-hidden"><span className="block">Transformez votre extérieur</span></span>
          <span className="block overflow-hidden"><span className="block italic text-verdea-stone/80 font-light">en œuvre vivante.</span></span>
        </h1>
        
        <p className="reveal-subtitle text-lg md:text-xl text-verdea-stone/70 max-w-2xl font-light mb-14 tracking-wide">
          Conception et réalisation de jardins sur mesure haut de gamme.
        </p>

        <div className="reveal-btn-container flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">
          <div className="reveal-btn w-full sm:w-auto">
            <MagneticButton
              href="#contact"
              className="rounded-full group flex items-center justify-center gap-4 bg-verdea-stone hover:bg-white text-verdea-deep px-8 sm:px-10 py-4 sm:py-5 font-medium tracking-widest uppercase text-xs transition-colors duration-500 shadow-2xl interactive-hover w-full sm:w-auto"
            >
              Obtenir mon étude
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
            </MagneticButton>
          </div>
          
          <div className="reveal-btn w-full sm:w-auto">
            <MagneticButton
              href="#projects"
              className="rounded-full flex items-center justify-center bg-transparent border border-verdea-stone/30 hover:border-verdea-stone text-verdea-stone px-8 sm:px-10 py-4 sm:py-5 font-medium tracking-widest uppercase text-xs transition-all duration-500 backdrop-blur-sm interactive-hover w-full sm:w-auto"
            >
              Voir nos réalisations
            </MagneticButton>
          </div>
        </div>
      </div>

    </section>
  );
}
