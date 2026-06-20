import type { Metadata, Viewport } from "next";
import { site } from "@/config/site";
import "./globals.css";
import NeuralCanvas from "@/components/NeuralCanvas";
import Preloader from "@/components/Preloader";

export const viewport: Viewport = { themeColor: "#070a12" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | ${site.role}`,
  description: site.pitch,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: `${site.name} | ${site.role}`, description: site.pitch, url: site.url },
  twitter: { card: "summary_large_image", title: `${site.name} | ${site.role}`, description: site.pitch },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  knowsAbout: ["Generative AI", "Machine Learning", "RAG", "NLP", "Quantitative Finance", "Python"],
  sameAs: [site.socials.github, site.socials.linkedin],
};

const fontHref =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Hanken+Grotesk:wght@300..800&family=JetBrains+Mono:wght@400;500;700&family=Press+Start+2P&family=VT323&display=swap";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="aurora">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href={fontHref} rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Preloader />
        <a href="#main" className="skip-link">Skip to content</a>
        <div className="aurora" aria-hidden="true"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
        <NeuralCanvas />
        <div className="grain" aria-hidden="true" />
        <div className="fx-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
