"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PenTool, Box, Hammer, Leaf } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      id: "01",
      title: "Étude personnalisée",
      desc: "Analyse topographique, étude des sols et compréhension profonde de vos aspirations de vie en extérieur.",
      icon: <PenTool size={32} strokeWidth={1} />,
    },
    {
      id: "02",
      title: "Conception 3D",
      desc: "Modélisation architecturale de votre futur jardin. Choix des essences, minéraux et éclairages.",
      icon: <Box size={32} strokeWidth={1} />,
    },
    {
      id: "03",
      title: "Réalisation",
      desc: "Chantier orchestré par nos maîtres paysagistes avec des matériaux nobles et un respect strict des délais.",
      icon: <Hammer size={32} strokeWidth={1} />,
    },
    {
      id: "04",
      title: "Livraison & Suivi",
      desc: "Accompagnement continu pour s'assurer que votre jardin évolue et s'épanouit saison après saison.",
      icon: <Leaf size={32} strokeWidth={1} />,
    },
  ];

  useEffect(() => {
    // Only apply horizontal pinning on larger screens
    let ctx = gsap.context(() => {});
    
    // Slight timeout to ensure DOM is ready for calculations
    const timer = setTimeout(() => {
      if (window.innerWidth >= 1024 && wrapperRef.current && containerRef.current) {
        ctx = gsap.context(() => {
          const sections = gsap.utils.toArray(".step-panel");
          
          gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              scrub: 1,
              snap: {
                snapTo: 1 / (sections.length - 1),
                duration: { min: 0.2, max: 0.8 },
                ease: "power1.inOut"
              },
              end: () => "+=" + wrapperRef.current?.offsetWidth,
            }
          });
        }, containerRef);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="process" className="bg-verdea-stone text-verdea-dark overflow-hidden relative">
      <div className="py-24 md:py-32 h-auto lg:h-screen flex flex-col justify-center">
        <div className="container mx-auto px-6 md:px-12 mb-12 lg:mb-20">
          <p className="text-verdea-gold font-medium tracking-widest uppercase text-xs mb-4">
            Notre Méthodologie
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-verdea-deep">
            Un processus d&apos;excellence.
          </h2>
        </div>

        {/* Timeline wrapper */}
        <div 
          ref={wrapperRef}
          className="flex flex-col lg:flex-row w-full lg:w-[400vw] h-full"
        >
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="step-panel w-full lg:w-screen px-6 md:px-12 flex flex-col justify-center border-l border-verdea-dark/10 relative py-12 lg:py-0 group"
            >
              {/* Large Background Number */}
              <div className="absolute top-1/2 left-12 -translate-y-1/2 text-[15rem] md:text-[20rem] font-serif font-black text-verdea-dark/5 pointer-events-none z-0 transition-transform duration-700 group-hover:scale-110">
                {step.id}
              </div>

              <div className="relative z-10 max-w-xl mx-auto lg:mx-0 lg:ml-[10vw]">
                {/* Icon Circle */}
                <div className="w-20 h-20 mb-8 bg-white/50 backdrop-blur-md border border-white rounded-full flex items-center justify-center text-verdea-gold shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-colors duration-500">
                  {step.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-3xl lg:text-4xl font-serif text-verdea-deep mb-6">{step.title}</h3>
                  <p className="text-lg lg:text-xl text-verdea-dark/70 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
