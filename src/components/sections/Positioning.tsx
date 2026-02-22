"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Positioning() {
  const containerRef = useRef<HTMLDivElement>(null);

  const points = [
    "Sélection rigoureuse des minéraux",
    "Sourcing végétal d'exception",
    "Maîtrise d'œuvre intégrée",
    "Garantie décennale aménagement",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for the quote using simple span wrapper strategy
      const quoteWords = gsap.utils.toArray(".quote-word");
      
      gsap.from(quoteWords, {
        y: 40,
        opacity: 0,
        rotationX: -45,
        duration: 1.2,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".quote-container",
          start: "top 75%",
        },
      });

      // Reveal list items
      gsap.from(".point-item", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".points-container",
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const quote = "Nous ne faisons pas des jardins. Nous créons des espaces de vie.";

  return (
    <section id="positioning" ref={containerRef} className="py-32 bg-[#0A0A0A] text-verdea-stone relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-24 relative z-10">
        <div className="flex-1 quote-container">
          <p className="text-verdea-gold font-medium tracking-widest uppercase text-xs mb-8">
            Notre Philosophie
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-serif italic text-white leading-tight mb-8 perspective-1000">
            {quote.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-3 mb-2">
                <span className="quote-word inline-block origin-bottom">{word}</span>
              </span>
            ))}
          </h2>
          <div className="w-24 h-px bg-verdea-gold/50" />
        </div>

        <div className="flex-1 flex flex-col justify-center points-container">
          <p className="text-verdea-stone/70 text-xl font-light leading-relaxed mb-12">
            La frontière entre l&apos;intérieur et l&apos;extérieur s&apos;efface. Nous concevons vos extérieurs avec la même exigence architecturale que vos pièces maîtresses.
          </p>
          <ul className="space-y-6">
            {points.map((point, i) => (
              <li key={i} className="point-item flex items-center gap-6 group cursor-default">
                <div className="w-12 h-12 rounded-full border border-verdea-gold/30 flex items-center justify-center text-verdea-gold bg-white/5 backdrop-blur-sm group-hover:bg-verdea-gold group-hover:text-verdea-dark transition-colors duration-500">
                  <Check size={18} strokeWidth={1.5} />
                </div>
                <span className="text-xl font-serif text-white/90 group-hover:text-white transition-colors duration-300">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
