import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

/**
 * latin-ext jest konieczny — bez niego polskie znaki diakrytyczne
 * (ł, ą, ę, ś, ć, ż, ź, ń, ó) spadaja na font zapasowy i lamia rytm tekstu.
 * Jedna rodzina na caly serwis, jak w systemie Modernist.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://gosqu-software.pl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gosqu Software — systemy dedykowane, aplikacje webowe i mobilne",
    template: "%s | Gosqu Software",
  },
  description:
    "Projektujemy i wdrażamy systemy dedykowane (TMS/ERP), aplikacje webowe i mobilne oraz rozwiązania GPS. Spring Boot, Angular, React Native, PostgreSQL.",
  applicationName: "Gosqu Software",
  authors: [{ name: "Grzegorz Urban" }],
  alternates: {
    canonical: "/",
    languages: { "pl-PL": "/", "en-US": "/en" },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "Gosqu Software",
    title: "Gosqu Software — od schematu bazy danych po ostatni piksel",
    description:
      "Systemy dedykowane, aplikacje webowe i mobilne oraz rozwiązania GPS/TMS. Jeden zespół odpowiada za całą warstwę.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/brand/Logo.ico" },
};

/** JSON-LD dla lokalnego software house'u — obecna strona nie ma tego wcale. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Gosqu Software",
  url: SITE_URL,
  email: "software@gosqu.pl",
  telephone: "+48730174220",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tarnów",
    addressCountry: "PL",
  },
  areaServed: "PL",
  knowsAbout: [
    "Spring Boot",
    "Angular",
    "React",
    "React Native",
    "PostgreSQL",
    "Systemy GPS",
    "Systemy TMS",
  ],
} as const;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={archivo.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // Dane statyczne, definiowane w tym pliku — brak wejscia od uzytkownika.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
