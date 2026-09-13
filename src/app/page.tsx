import { ContactSection } from "@/components/contact/ContactSection";
import { Hero } from "@/components/hero/Hero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { OffersSection } from "@/components/offers/OffersSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { TechMarquee } from "@/components/marquee/TechMarquee";
import { TechSection } from "@/components/tech/TechSection";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <TechMarquee />
        <OffersSection />
        <hr className="hairline" />
        <ProcessSection />
        <hr className="hairline" />
        <ProjectsSection />
        <hr className="hairline" />
        <TechSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
