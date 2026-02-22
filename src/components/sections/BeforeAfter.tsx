"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeftRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 100,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section className="py-32 bg-[#0A0A0A] text-verdea-stone overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-verdea-gold mb-6">Métamorphose</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 text-verdea-stone leading-tight">
            L&apos;art de la transformation.
          </h2>
          <p className="text-verdea-stone/70 text-lg font-light">
            Découvrez comment nous métamorphosons les espaces bruts en lieux de vie exceptionnels.
          </p>
        </div>

        <div
          ref={containerRef}
          className="interactive-hover relative w-full max-w-6xl mx-auto aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] rounded-[2.5rem] overflow-hidden cursor-ew-resize select-none shadow-2xl border border-white/5"
          onMouseDown={(e) => {
            isDragging.current = true;
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            isDragging.current = true;
            handleMove(e.touches[0].clientX);
          }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* After image (background) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2600&auto=format&fit=crop"
              alt="Jardin aménagé - Après"
              fill
              className="object-cover"
            />
            <div className="absolute top-8 right-8 bg-verdea-dark/60 backdrop-blur-md px-6 py-2 rounded-full text-xs tracking-widest uppercase text-verdea-stone font-medium border border-white/10">
              Après
            </div>
          </div>

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 w-full h-full border-r border-verdea-gold shadow-[5px_0_20px_rgba(0,0,0,0.8)]"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src="https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=2600&auto=format&fit=crop"
              alt="Terrain brut - Avant"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-xs tracking-widest uppercase text-white font-medium border border-white/20">
              Avant
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-[1px] flex items-center justify-center bg-verdea-gold/50"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="w-14 h-14 bg-verdea-dark/80 backdrop-blur-xl border border-verdea-gold/50 rounded-full flex items-center justify-center text-verdea-gold shadow-2xl transition-transform hover:scale-110">
              <ArrowLeftRight size={20} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
