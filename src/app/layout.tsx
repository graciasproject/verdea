import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Verdéa Atelier Paysage | Paysagiste haut de gamme",
  description:
    "Conception et aménagement de jardins contemporains et extérieurs haut de gamme pour particuliers exigeants.",
  openGraph: {
    title: "Verdéa Atelier Paysage",
    description: "Conception et aménagement de jardins contemporains et extérieurs haut de gamme.",
    url: "https://verdea-paysage.fr",
    siteName: "Verdéa",
    images: [
      {
        url: "https://images.unsplash.com/photo-1613490900233-141c548a8cb9?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Verdéa Jardin Contemporain",
      }
    ],
    locale: "fr_FR",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Verdéa Atelier Paysage",
  "image": "https://images.unsplash.com/photo-1613490900233-141c548a8cb9?q=80&w=1200",
  "telephone": "+33142685300",
  "email": "contact@verdea-paysage.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12 Avenue Montaigne",
    "addressLocality": "Paris",
    "postalCode": "75008",
    "addressCountry": "FR"
  },
  "url": "https://verdea-paysage.fr",
  "priceRange": "$$$$"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Navigation />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
