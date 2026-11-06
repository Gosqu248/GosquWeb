import {
  FEATURED_PROJECT,
  NDA_PROJECTS,
  PAST_PROJECTS,
  type CurrentProject,
} from "@/content/projects";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

function ProjectIcon({ icon }: { icon: CurrentProject["icon"] }) {
  if (icon === "bolt") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--color-accent)" aria-hidden="true">
        <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" aria-hidden="true">
      <path d="M3 13l2-6h14l2 6v5H3z" />
      <circle cx="7.5" cy="16" r="1.5" fill="var(--color-accent)" />
      <circle cx="16.5" cy="16" r="1.5" fill="var(--color-accent)" />
    </svg>
  );
}

export function ProjectsSection() {
  return (
    <section className="section" id="realizacje" aria-labelledby="realizacje-heading">
      <div className="projects__head">
        <SectionHead
          id="realizacje-heading"
          eyebrow="02 — Realizacje"
          title="Gdzie pracuję teraz."
          aside={
            <span className="status-pill">
              <span className="status-pill__dot" aria-hidden="true" />
              Aktywne projekty
            </span>
          }
        />
      </div>

      <div className="bento">
        <Reveal className="bento__wide">
          <a
            className="card featured-project"
            href={FEATURED_PROJECT.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="featured-project__disc" aria-hidden="true" />
            <span className="featured-project__ring" aria-hidden="true" />
            <span className="label">{FEATURED_PROJECT.kicker}</span>
            <h3 className="featured-project__title">{FEATURED_PROJECT.title}</h3>
            <p className="featured-project__text">{FEATURED_PROJECT.description}</p>
            <span className="button button--light">
              {FEATURED_PROJECT.linkLabel}
              <ArrowUpRightIcon />
            </span>
          </a>
        </Reveal>

        <div className="bento__narrow nda-stack">
          {NDA_PROJECTS.map((project, index) => (
            <Reveal as="article" key={project.id} className="card nda-card" delay={index * 90}>
              <div className="nda-card__top">
                <span className="label">{project.kicker}</span>
                <ProjectIcon icon={project.icon} />
              </div>
              <h3 className="nda-card__title">{project.title}</h3>
              <p className="nda-card__text">{project.description}</p>
              <span className="label">Szczegóły objęte NDA</span>
            </Reveal>
          ))}
        </div>
      </div>

      <h3 className="past__title">Wcześniejsze projekty</h3>
      <ul className="past-list">
        {PAST_PROJECTS.map((project, index) => (
          <li key={project.id}>
            <a className="past-row" href="#kontakt">
              <span className="past-row__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="past-row__name">{project.title}</span>
              <span className="past-row__text">{project.description}</span>
              <span className="past-row__kind">{project.kind}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
