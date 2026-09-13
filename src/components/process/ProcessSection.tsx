import { PROCESS_STEPS } from "@/content/tech";

export function ProcessSection() {
  return (
    <section className="section" id="proces" aria-labelledby="proces-heading">
      <div className="section__head">
        <p className="section__eyebrow">02 — Proces</p>
        <h2 className="section__title" id="proces-heading">
          Jak pracujemy
        </h2>
      </div>

      <ol className="process">
        {PROCESS_STEPS.map((step) => (
          <li key={step.number} className="tile process__step">
            <span className="process__number" style={{ color: step.accent }}>
              {step.number}
            </span>
            <h3 className="process__title">{step.title}</h3>
            <p className="process__text">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
