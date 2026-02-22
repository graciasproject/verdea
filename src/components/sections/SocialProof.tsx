"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const stats = [
    { value: 120, label: "Projets réalisés", suffix: "+" },
    { value: 15, label: "Ans d'expérience", suffix: "" },
    { value: 98, label: "Satisfaction client", suffix: "%" },
  ];

  const testimonials = [
    {
      name: "Jean-Marc L.",
      role: "Propriétaire, Vésinet",
      text: "L'équipe Verdéa a transformé notre terrain nu en un véritable écosystème luxueux. Leur attention aux détails minéraux est remarquable.",
    },
    {
      name: "Sophie T.",
      role: "Architecte, Paris",
      text: "Je collabore régulièrement avec Verdéa. Ils comprennent parfaitement comment prolonger l'architecture contemporaine vers l'extérieur.",
    },
    {
      name: "Édouard M.",
      role: "Client privé, Neuilly",
      text: "Un accompagnement haut de gamme du premier croquis jusqu'à la dernière plantation. Le résultat dépasse largement nos projections 3D.",
    },
  ];

  const partners = [
    { 
      name: "Minéralia", 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
          <path d="M4 14l8-10 8 10-8 8z" />
          <path d="M4 14l8 6 8-6" />
          <path d="M12 4v16" />
        </svg>
      )
    },
    { 
      name: "Solstice Extérieur", 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2" />
          <path d="M12 21v2" />
          <path d="M4.22 4.22l1.42 1.42" />
          <path d="M18.36 18.36l1.42 1.42" />
          <path d="M1 12h2" />
          <path d="M21 12h2" />
          <path d="M4.22 19.78l1.42-1.42" />
          <path d="M18.36 5.64l1.42-1.42" />
          <circle cx="12" cy="12" r="8" strokeDasharray="2 4" />
        </svg>
      )
    },
    { 
      name: "Atelier Botanica", 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
          <path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" />
          <path d="M12 2v20" />
          <path d="M12 6c-3 0-6 2-6 6" />
          <path d="M12 12c3 0 6 2 6 6" />
        </svg>
      )
    },
    { 
      name: "Aqua Luxe", 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
          <path d="M2 12c2 0 3-3 5-3s3 3 5 3 3-3 5-3 3 3 5 3" />
          <path d="M2 18c2 0 3-3 5-3s3 3 5 3 3-3 5-3 3 3 5 3" />
          <path d="M2 6c2 0 3-3 5-3s3 3 5 3 3-3 5-3 3 3 5 3" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter Animation
      countersRef.current.forEach((counter) => {
        if (!counter) return;
        const target = parseFloat(counter.getAttribute("data-target") || "0");
        
        gsap.to(counter, {
          innerText: target,
          duration: 3,
          ease: "expo.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      });

      // 3D Glass Reveal Animation for cards
      gsap.from(".testimonial-card", {
        y: 80,
        opacity: 0,
        rotationX: 15,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-grid",
          start: "top 80%",
        },
      });

      // Reveal logos
      gsap.fromTo(".partner-logo", 
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".partners-container",
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-verdea-stone text-verdea-dark relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-verdea-gold/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-verdea-dark/10 pb-24">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="text-6xl md:text-[5rem] font-serif text-verdea-deep mb-6 flex items-baseline drop-shadow-sm">
                <span
                  ref={(el) => {
                    countersRef.current[i] = el;
                  }}
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="text-4xl md:text-6xl text-verdea-gold ml-1">{stat.suffix}</span>
              </div>
              <p className="text-sm tracking-[0.2em] uppercase text-verdea-dark/70 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className="partners-container py-20 flex flex-col items-center">
          <p className="text-xs tracking-[0.3em] font-medium uppercase text-verdea-dark/50 mb-12 text-center">
            Matières & Partenaires
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-80">
            {partners.map((partner, i) => (
              <div key={i} className="partner-logo opacity-0 scale-90 flex flex-col items-center gap-4 cursor-default group">
                <div className="text-verdea-dark/60 group-hover:text-verdea-dark group-hover:scale-110 transition-all duration-500">
                  {partner.icon}
                </div>
                <span className="text-xl font-serif text-verdea-dark font-medium border-b border-transparent group-hover:border-verdea-dark/30 transition-all duration-300">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="flex justify-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-verdea-deep text-center">
            Quelques témoignages
          </h2>
        </div>
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {testimonials.map((testi, i) => (
            <div key={i} className={`h-full ${i === 1 ? 'md:pt-16' : 'md:pb-16'}`}>
              <div
                className="testimonial-card interactive-hover h-full backdrop-blur-xl bg-white/40 p-10 md:p-12 rounded-[2.5rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col gap-8 transition-transform hover:-translate-y-3 duration-500"
              >
                <div className="flex gap-1.5 text-verdea-gold">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={18} fill="currentColor" strokeWidth={1} />
                  ))}
                </div>
                <p className="text-verdea-dark/80 italic flex-grow text-lg leading-relaxed font-light">&quot;{testi.text}&quot;</p>
                <div className="pt-6 border-t border-verdea-dark/5">
                  <p className="font-serif text-xl text-verdea-deep">{testi.name}</p>
                  <p className="text-xs tracking-widest uppercase text-verdea-dark/40 mt-2 font-medium">
                    {testi.role}
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
