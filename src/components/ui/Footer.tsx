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
              <a href="#" className="p-2 bg-verdea-deep rounded-full hover:bg-verdea-gold hover:text-verdea-dark transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-verdea-deep rounded-full hover:bg-verdea-gold hover:text-verdea-dark transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-verdea-deep rounded-full hover:bg-verdea-gold hover:text-verdea-dark transition-colors">
                <Linkedin size={20} />
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
                <MapPin className="text-verdea-gold shrink-0 mt-1" size={20} />
                <span>12 Avenue Montaigne,<br />75008 Paris, France</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-verdea-gold shrink-0" size={20} />
                <span>+33 (0)1 42 68 53 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-verdea-gold shrink-0" size={20} />
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
            <div className="w-full h-32 bg-verdea-deep rounded flex items-center justify-center border border-verdea-stone/10">
              <span className="text-sm tracking-widest uppercase text-verdea-stone/50">Google Maps Embed</span>
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
