import { PROJECTS } from "@/content/projects";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectsSection() {
  return (
    <section className="section" id="realizacje" aria-labelledby="realizacje-heading">
      <div className="section__head section__head--split">
        <div>
          <p className="section__eyebrow">03 — Realizacje</p>
          <h2 className="section__title" id="realizacje-heading">
            Wdrożone systemy
          </h2>
        </div>
      </div>

      <div className="bento">
        {PROJECTS.map((project, index) => (
          <Reveal
            as="article"
            key={project.id}
            delay={index * 70}
            className={`tile tile--interactive project ${project.featured ? "project--featured" : ""}`}
          >
            {project.featured ? <div className="project__banner" aria-hidden="true" /> : null}

            <div className="project__body">
              <p className="project__kind">{project.kind}</p>
              <h3 className="project__title">{project.title}</h3>

              <p className="project__text">
                {project.description ?? <Placeholder>OPIS — do uzupełnienia</Placeholder>}
              </p>

              <ul className="chip-row project__chips">
                {project.stack.length > 0 ? (
                  project.stack.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))
                ) : (
                  <li>
                    <Placeholder>STOS</Placeholder>
                  </li>
                )}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
