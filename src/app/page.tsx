import { ContactSection } from "@/components/contact/ContactSection";
import { Hero } from "@/components/hero/Hero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ClosingMarquee } from "@/components/marquee/ClosingMarquee";
import { TechMarquee } from "@/components/marquee/TechMarquee";
import { OffersSection } from "@/components/offers/OffersSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { StatementSection } from "@/components/statement/StatementSection";
import { TechSection } from "@/components/tech/TechSection";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <TechMarquee />
        <OffersSection />
        <StatementSection />
        <ProjectsSection />
        <ProcessSection />
        <TechSection />
        <ContactSection />
        <ClosingMarquee />
      </main>
      <SiteFooter />
    </>
  );
}
