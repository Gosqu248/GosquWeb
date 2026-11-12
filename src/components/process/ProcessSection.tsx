import { PROCESS_STEPS } from "@/content/tech";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

export function ProcessSection() {
  return (
    <section className="section" id="proces" aria-labelledby="proces-heading">
      <SectionHead
        id="proces-heading"
        eyebrow="03 — Proces"
        title="Jak pracujemy."
        aside={
          <p className="section-head__aside">
            Cztery etapy, za każdym razem z czymś konkretnym do obejrzenia.
          </p>
        }
      />
      <ol className="steps">
        {PROCESS_STEPS.map((step, index) => (
          <Reveal as="li" key={step.number} className="card step" delay={index * 80}>
            <span className="step__number">{step.number}</span>
            <h3 className="step__title">{step.title}</h3>
            <p className="step__text">{step.description}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
