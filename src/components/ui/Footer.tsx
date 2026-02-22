import Link from "next/link";
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-verdea-dark text-verdea-stone pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif">Verdéa</h2>
            <p className="text-verdea-stone/70 max-w-sm">
              Conception et aménagement de jardins contemporains et extérieurs haut de gamme pour particuliers exigeants.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Suivez-nous sur Instagram" className="p-2 bg-verdea-deep rounded-full hover:bg-verdea-gold hover:text-verdea-dark transition-colors">
                <Instagram size={20} aria-hidden="true" />
              </a>
              <a href="#" aria-label="Suivez-nous sur Facebook" className="p-2 bg-verdea-deep rounded-full hover:bg-verdea-gold hover:text-verdea-dark transition-colors">
                <Facebook size={20} aria-hidden="true" />
              </a>
              <a href="#" aria-label="Suivez-nous sur LinkedIn" className="p-2 bg-verdea-deep rounded-full hover:bg-verdea-gold hover:text-verdea-dark transition-colors">
                <Linkedin size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif text-verdea-gold">Navigation</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-verdea-gold transition-colors">Accueil</Link></li>
              <li><Link href="#projects" className="hover:text-verdea-gold transition-colors">Réalisations</Link></li>
              <li><Link href="#process" className="hover:text-verdea-gold transition-colors">Notre Process</Link></li>
              <li><Link href="#philosophy" className="hover:text-verdea-gold transition-colors">Philosophie</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif text-verdea-gold">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-verdea-gold shrink-0 mt-1" size={20} aria-hidden="true" />
                <span>12 Avenue Montaigne,<br />75008 Paris, France</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-verdea-gold shrink-0" size={20} aria-hidden="true" />
                <span>+33 (0)1 42 68 53 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-verdea-gold shrink-0" size={20} aria-hidden="true" />
                <span>contact@verdea-paysage.fr</span>
              </li>
            </ul>
          </div>

          {/* Map/Zone */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif text-verdea-gold">Zone d&apos;intervention</h3>
            <p className="text-verdea-stone/70">
              Nous intervenons principalement en Île-de-France, sur la Côte d&apos;Azur et en Suisse romande pour des projets d&apos;exception.
            </p>
            <div className="w-full h-48 rounded overflow-hidden border border-verdea-stone/10 opacity-80 hover:opacity-100 transition-opacity duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.4608331189495!2d2.300583215674724!3d48.86658097928833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fcc9011709b%3A0xe9c5bafb6020db20!2s12%20Av.%20Montaigne%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Google Maps: Zone d'intervention Verdéa"
                referrerPolicy="no-referrer-when-downgrade"
                className="brightness-90 contrast-125 grayscale-[30%] mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-verdea-stone/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-verdea-stone/50">
          <p>&copy; {new Date().getFullYear()} Verdéa Atelier Paysage. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-verdea-stone transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-verdea-stone transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
