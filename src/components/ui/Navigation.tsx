"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.6,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Réalisations", href: "#projects" },
    { name: "Notre Process", href: "#process" },
    { name: "Philosophie", href: "#positioning" },
  ];

  return (
    <>
      <header
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 transition-all duration-500 rounded-[2.5rem] border ${
          scrolled
            ? "bg-verdea-stone/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] py-3 px-2 border-white/20"
            : "bg-transparent py-5 px-2 border-transparent"
        }`}
      >
        <div className="w-full px-6 md:px-8 flex justify-between items-center">
          <Link href="/" className="z-50 relative flex items-center">
            <img 
              src="/logo-inline.png" 
              alt="Verdéa Logo" 
              className={`h-10 sm:h-12 md:h-32 md:-my-6 w-auto object-contain transition-all duration-300 drop-shadow-sm ${!scrolled && !isOpen ? 'brightness-0 invert' : ''}`} 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm tracking-widest font-medium uppercase transition-colors hover:text-verdea-gold ${
                  scrolled ? "text-verdea-dark" : "text-verdea-stone"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className={`px-6 py-3 rounded-full text-sm tracking-widest uppercase font-medium transition-all ${
                scrolled
                  ? "bg-verdea-deep text-verdea-stone hover:bg-verdea-gold hover:text-verdea-deep"
                  : "bg-verdea-stone text-verdea-deep hover:bg-verdea-gold hover:text-verdea-deep"
              }`}
            >
              Étude personnalisée
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden z-50 relative p-2 ${
              isOpen ? "text-verdea-stone" : scrolled ? "text-verdea-dark" : "text-verdea-stone"
            }`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-verdea-deep z-40 translate-x-full md:hidden flex flex-col justify-center items-center"
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-serif text-verdea-stone hover:text-verdea-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="mt-8 px-8 py-4 bg-verdea-gold text-verdea-deep text-lg uppercase tracking-widest font-medium hover:bg-verdea-stone transition-colors rounded-8xl"
            onClick={() => setIsOpen(false)}
          >
            Étude personnalisée
          </Link>
        </nav>
      </div>
    </>
  );
}
