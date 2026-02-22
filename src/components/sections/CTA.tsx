"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowLeft } from "lucide-react";

// --- Custom Select Component ---
const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  label 
}: { 
  options: {value: string, label: string}[], 
  value: string, 
  onChange: (val: string) => void, 
  label: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative group" ref={dropdownRef}>
      <div 
        className="w-full bg-transparent border-b-2 border-verdea-stone/30 py-4 text-verdea-stone text-lg flex justify-between items-center cursor-pointer transition-colors hover:border-verdea-gold"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-verdea-stone" : "text-transparent"}>
          {selectedOption ? selectedOption.label : "Sélectionnez"}
        </span>
        <div className={`transition-transform duration-300 text-verdea-stone/50 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </div>
      </div>
      
      <label 
        className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest font-medium ${
          value || isOpen 
            ? "-top-4 text-xs text-verdea-gold" 
            : "top-4 text-sm text-verdea-stone/60 group-hover:text-verdea-gold"
        }`}
      >
        {label}
      </label>

      {/* Dropdown Menu */}
      <div 
        className={`absolute z-50 w-full left-0 top-full mt-2 bg-verdea-deep/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top flex flex-col ${
          isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={`px-6 py-4 cursor-pointer transition-colors duration-200 text-sm md:text-base ${
              value === option.value 
                ? "bg-verdea-gold/20 text-verdea-gold" 
                : "text-verdea-stone hover:bg-white/10 hover:text-white"
            }`}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const PROJECT_OPTIONS = [
  { value: "creation", label: "Création complète" },
  { value: "renovation", label: "Rénovation d'exception" },
  { value: "terrasse", label: "Aménagement Terrasse" },
  { value: "piscine", label: "Intégration Bassin/Piscine" }
];

const BUDGET_OPTIONS = [
  { value: "15k-30k", label: "15k€ - 30k€" },
  { value: "30k-75k", label: "30k€ - 75k€" },
  { value: "75k+", label: "+ 75k€" }
];

const DELAY_OPTIONS = [
  { value: "urgent", label: "Immédiat" },
  { value: "3mois", label: "Sous 3 mois" },
  { value: "6mois", label: "Sous 6 mois" }
];

export default function CTA() {
  const [step, setStep] = useState(1);
  const formRef = useRef<HTMLDivElement>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    projectType: "",
    location: "",
    budget: "",
    delay: "",
    name: "",
    email: "",
    phone: "",
  });

  const nextStep = () => {
    // Only proceed if required fields of step 1 are filled
    if (!formData.projectType || !formData.location) return;

    const ctx = gsap.context(() => {
      gsap.to(".step-1", {
        x: -50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setStep(2);
          gsap.fromTo(
            ".step-2",
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
          );
        },
      });
    }, formRef);
    return () => ctx.revert();
  };

  const prevStep = () => {
    const ctx = gsap.context(() => {
      gsap.to(".step-2", {
        x: 50,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setStep(1);
          gsap.fromTo(
            ".step-1",
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
          );
        },
      });
    }, formRef);
    return () => ctx.revert();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    const ctx = gsap.context(() => {
      gsap.to(".step-2", {
        y: -30,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setStep(3); // Success step
          gsap.fromTo(
            ".step-3",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
          );
        }
      });
    }, formRef);
    return () => ctx.revert();
  };

  return (
    <section id="contact" className="py-32 bg-verdea-deep text-verdea-stone relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-verdea-gold/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-verdea-stone/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-serif mb-8 leading-tight">
              Parlons de <br className="hidden lg:block"/>
              <span className="italic text-verdea-gold">votre projet.</span>
            </h2>
            <p className="text-verdea-stone/70 text-lg md:text-xl font-light mb-12 leading-relaxed">
              Chaque grand jardin commence par une rencontre. Confiez-nous vos envies, nos architectes paysagistes vous recontacteront sous 48h pour imaginer avec vous l'exception.
            </p>

            {/* Step Indicators */}
            {step < 3 && (
              <div className="flex justify-center lg:justify-start gap-3 items-center mt-12">
                <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 1 ? "w-16 bg-verdea-gold" : "w-8 bg-verdea-stone/20"}`} />
                <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= 2 ? "w-16 bg-verdea-gold" : "w-8 bg-verdea-stone/20"}`} />
              </div>
            )}
          </div>

          {/* Form Area */}
          <div className="w-full lg:w-[500px] shrink-0 bg-white/5 backdrop-blur-xl p-10 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative" ref={formRef}>
            
            {/* Step 1 */}
            {step === 1 && (
              <div className="step-1 flex flex-col gap-8">
                <div className="w-full">
                  <CustomSelect
                    options={PROJECT_OPTIONS}
                    value={formData.projectType}
                    onChange={(val) => setFormData({...formData, projectType: val})}
                    label="Nature de l'intervention"
                  />
                </div>

                <div className="relative group mt-4">
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b-2 border-verdea-stone/30 py-4 text-verdea-stone text-lg focus:outline-none focus:border-verdea-gold transition-colors interactive-hover"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                  <label className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest font-medium ${formData.location ? "-top-4 text-xs text-verdea-gold" : "top-4 text-sm text-verdea-stone/60 group-focus-within:-top-4 group-focus-within:text-xs group-focus-within:text-verdea-gold"}`}>
                    Localisation (Ville / CP)
                  </label>
                </div>

                <button 
                  onClick={nextStep}
                  disabled={!formData.projectType || !formData.location}
                  className="mt-8 w-full flex items-center justify-between bg-verdea-gold text-verdea-dark px-8 py-5 rounded-full font-medium uppercase tracking-widest text-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed group interactive-hover"
                >
                  Continuer
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="step-2 flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="w-full">
                    <CustomSelect
                      options={BUDGET_OPTIONS}
                      value={formData.budget}
                      onChange={(val) => setFormData({...formData, budget: val})}
                      label="Enveloppe"
                    />
                  </div>
                  
                  <div className="w-full">
                    <CustomSelect
                      options={DELAY_OPTIONS}
                      value={formData.delay}
                      onChange={(val) => setFormData({...formData, delay: val})}
                      label="Horizon"
                    />
                  </div>
                </div>

                <div className="relative group mt-2">
                  <input 
                    required type="text" 
                    className="w-full bg-transparent border-b-2 border-verdea-stone/30 py-3 text-verdea-stone focus:outline-none focus:border-verdea-gold transition-colors interactive-hover"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <label className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest font-medium ${formData.name ? "-top-4 text-[10px] text-verdea-gold" : "top-3 text-[11px] text-verdea-stone/60 group-focus-within:-top-4 group-focus-within:text-[10px] group-focus-within:text-verdea-gold"}`}>
                    Nom complet
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-2">
                  <div className="relative group">
                    <input 
                      required type="email" 
                      className="w-full bg-transparent border-b-2 border-verdea-stone/30 py-3 text-verdea-stone focus:outline-none focus:border-verdea-gold transition-colors interactive-hover"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <label className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest font-medium ${formData.email ? "-top-4 text-[10px] text-verdea-gold" : "top-3 text-[10px] text-verdea-stone/60 group-focus-within:-top-4 group-focus-within:text-verdea-gold"}`}>
                      Courriel
                    </label>
                  </div>
                  <div className="relative group">
                    <input 
                      required type="tel" 
                      className="w-full bg-transparent border-b-2 border-verdea-stone/30 py-3 text-verdea-stone focus:outline-none focus:border-verdea-gold transition-colors interactive-hover"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <label className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-widest font-medium ${formData.phone ? "-top-4 text-[10px] text-verdea-gold" : "top-3 text-[10px] text-verdea-stone/60 group-focus-within:-top-4 group-focus-within:text-verdea-gold"}`}>
                      Téléphone
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button 
                    type="button"
                    onClick={prevStep}
                    className="flex items-center justify-center p-5 rounded-full border border-verdea-stone/30 text-verdea-stone hover:bg-white hover:text-verdea-dark transition-colors interactive-hover shrink-0"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-verdea-gold text-verdea-dark px-6 py-5 rounded-full font-medium uppercase tracking-widest text-sm hover:bg-white transition-colors interactive-hover text-center"
                  >
                    Confirmer
                  </button>
                </div>
              </form>
            )}

            {/* Step 3 - Success */}
            {step === 3 && (
              <div className="step-3 flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-verdea-gold/20 border border-verdea-gold shadow-[0_0_30px_rgba(198,167,94,0.3)] text-verdea-gold rounded-full flex items-center justify-center mb-8">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-serif text-verdea-gold mb-4">Privilège accordé</h3>
                <p className="text-base font-light text-verdea-stone/80 leading-relaxed max-w-[280px]">
                  Merci {formData.name}. L'atelier étudie votre projet à {formData.location}. Un de nos architectes vous contactera sous peu.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
