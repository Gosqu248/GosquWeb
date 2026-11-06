import { PROCESS_STEPS } from "@/content/tech";
import { Reveal } from "@/components/ui/Reveal";

export function ProcessSection() {
  return (
    <section className="section" id="proces" aria-labelledby="proces-heading">
      <div className="section__head">
        <p className="section__eyebrow">02 — Proces</p>
        <h2 className="section__title" id="proces-heading">
          Jak pracujemy
        </h2>
      </div>

      <div className="process">
        <Reveal className="tile tile--raised process__intro">
          <span className="process__intro-rule" aria-hidden="true" />
          <p className="process__intro-eyebrow">Nasza zasada</p>
          <p className="process__intro-quote">
            Jeden zespół odpowiada za całą warstwę — od modelu danych po interfejs, który widzi
            klient.
          </p>
          <p className="process__intro-note">
            Bez przekazywania projektu między firmami na każdym etapie i bez utraty kontekstu po
            drodze.
          </p>
        </Reveal>

        <ol className="process__grid">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 70} className="tile process__step">
              <span className="process__number" style={{ color: step.accent }}>
                {step.number}
              </span>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__text">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
