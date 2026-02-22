"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2600&auto=format&fit=crop",
      title: "Villa Lumina",
      location: "Mougins",
      span: "md:col-span-2 md:row-span-2",
      speed: 1.1,
    },
    {
      src: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2000&auto=format&fit=crop",
      title: "Jardin Minéral",
      location: "Paris 16e",
      span: "md:col-span-1 md:row-span-1",
      speed: 0.9,
    },
    {
      src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000&auto=format&fit=crop",
      title: "Terrasse d'Éden",
      location: "Genève",
      span: "md:col-span-1 md:row-span-2",
      speed: 1.2,
    },
    {
      src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2000&auto=format&fit=crop",
      title: "Refuge Zen",
      location: "Annecy",
      span: "md:col-span-1 md:row-span-1",
      speed: 0.95,
    },
    {
      src: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=2000&auto=format&fit=crop",
      title: "Patio d'Ombre",
      location: "Aix-en-Provence",
      span: "md:col-span-1 md:row-span-1",
      speed: 1.15,
    },
    {
      src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2600&auto=format&fit=crop",
      title: "Oasis Urbaine",
      location: "Bordeaux",
      span: "md:col-span-2 md:row-span-1",
      speed: 1.05,
    },
    {
      src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
      title: "Cour Sécrète",
      location: "Lyon",
      span: "md:col-span-1 md:row-span-1",
      speed: 0.9,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".gallery-card");
      
      cards.forEach((card) => {
        const image = card.querySelector(".parallax-bg");
        const speed = parseFloat(card.dataset.speed || "1");
        
        // Initial setup for image scale to allow parallax without seeing edges
        gsap.set(image, { scale: 1.2, yPercent: -10 * speed });

        gsap.to(image, {
          yPercent: 10 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

      // Staggered fade in
      gsap.from(".gallery-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-32 bg-white text-verdea-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center justify-center mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-verdea-deep mb-8 leading-tight">
              Nos Réalisations
            </h2>
            <p className="text-verdea-dark/70 text-lg font-light leading-relaxed">
              Une sélection de nos aménagements extérieurs les plus emblématiques, où chaque détail reflète notre exigence et notre passion pour le végétal et le minéral.
            </p>
          </div>
          <a
            href="#"
            className="interactive-hover inline-block px-10 py-5 bg-transparent border border-verdea-dark/20 text-verdea-dark font-medium tracking-widest uppercase text-xs hover:border-verdea-dark transition-colors whitespace-nowrap rounded-full"
          >
            Voir tout le portfolio
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[350px] gap-6 md:gap-8">
          {images.map((img, i) => (
            <div
              key={i}
              data-speed={img.speed}
              className={`gallery-card interactive-hover group relative overflow-hidden rounded-[2.5rem] bg-verdea-stone ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="parallax-bg object-cover"
              />
              
              {/* Refined Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-verdea-dark/90 via-verdea-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              
              {/* Text info */}
              <div className="absolute bottom-0 left-0 p-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                <p className="text-verdea-gold text-xs tracking-[0.3em] uppercase font-medium mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150">
                  {img.location}
                </p>
                <h3 className="text-white font-serif text-3xl md:text-4xl">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
