"use client";

import { Fragment, useEffect, useRef, type KeyboardEvent } from "react";
import type { ProjectDetails, ProjectStatus } from "@/content/projects";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/Icons";
import "./project-dialog.css";

export type ProjectView = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  href?: string;
  linkLabel?: string;
  details: ProjectDetails;
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: "W realizacji",
  nda: "W realizacji · NDA",
  done: "Zrealizowany",
};

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const pad = (n: number) => String(n).padStart(2, "0");
const domainOf = (href: string) => href.replace(/^https?:\/\//, "").replace(/\/$/, "");

type ProjectDialogProps = {
  projects: readonly ProjectView[];
  activeIndex: number | null;
  onChange: (index: number | null) => void;
};

/** Odtwarza wejscie elementow oznaczonych data-a. Pomijane przy prefers-reduced-motion. */
function play(root: HTMLElement, entering: boolean) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (entering) {
    root.animate([{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 1000, easing: EASE });
  }
  const base = entering ? 300 : 0;
  root.querySelectorAll<HTMLElement>("[data-a]").forEach((el) => {
    const kind = el.dataset.a;
    const delay = base + (Number(el.dataset.d) || 0);
    const frames =
      kind === "mask"
        ? [{ transform: "translateY(105%)" }, { transform: "none" }]
        : kind === "wipe"
          ? [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }]
          : [{ opacity: 0, transform: "translateY(48px)" }, { opacity: 1, transform: "none" }];
    el.animate(frames, { duration: kind === "wipe" ? 1000 : 800, delay, easing: EASE, fill: "backwards" });
  });
}

export function ProjectDialog({ projects, activeIndex, onChange }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const wasOpen = useRef(false);
  const project = activeIndex === null ? null : projects[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add("is-dialog-open");
    }
    if (!project && dialog.open) dialog.close();
  }, [project]);

  // Po zmianie projektu: powrot na gore i ponowne odtworzenie animacji wejscia.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || activeIndex === null) {
      wasOpen.current = false;
      return;
    }
    dialog.scrollTo({ top: 0 });
    // Fokus na elemencie, ktory zniknal przy zmianie projektu, trafia na body — wtedy strzalki przestalyby dzialac.
    if (!dialog.contains(document.activeElement)) dialog.focus({ preventScroll: true });
    const frame = requestAnimationFrame(() => play(dialog, !wasOpen.current));
    wasOpen.current = true;
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  const handleClose = () => {
    document.documentElement.classList.remove("is-dialog-open");
    onChange(null);
  };

  const close = () => dialogRef.current?.close();

  const step = (delta: number) => {
    if (activeIndex === null) return;
    onChange((activeIndex + delta + projects.length) % projects.length);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  if (!project || activeIndex === null) {
    return <dialog ref={dialogRef} className="pd" aria-labelledby="pd-title" onClose={handleClose} />;
  }

  const { details } = project;
  const live = details.status !== "done";
  const next = projects[(activeIndex + 1) % projects.length];
  const loopHalf = [...details.stack, ...details.stack, ...details.stack];
  const facts = [
    ["Branża", details.sector],
    ["Klient", details.client],
    ["Nasza rola", details.role],
    ["Współpraca", details.collaboration],
  ];

  return (
    <dialog ref={dialogRef} className="pd" aria-labelledby="pd-title" tabIndex={-1} onClose={handleClose} onKeyDown={onKeyDown}>
      <header className="pd__bar">
        <div className="pd__wrap pd__bar-inner">
          <button type="button" className="pd__back" onClick={close}>
            <ArrowRightIcon style={{ transform: "rotate(180deg)" }} />
            Realizacje
          </button>
          <div className="pd__bar-right">
            {project.href && (
              <a className="pd__bar-link" href={project.href} target="_blank" rel="noopener noreferrer">
                {domainOf(project.href)}
                <ArrowUpRightIcon size={14} />
              </a>
            )}
            <span className="label pd__count">
              Projekt <span>{pad(activeIndex + 1)}</span> / {pad(projects.length)}
            </span>
            <div className="pd__nav">
              <button type="button" onClick={() => step(-1)} aria-label="Poprzedni projekt">
                <ArrowRightIcon style={{ transform: "rotate(180deg)" }} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Następny projekt">
                <ArrowRightIcon />
              </button>
              <button type="button" className="pd__close" onClick={close} aria-label="Zamknij szczegóły projektu">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="pd__progress">
          <span style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }} />
        </div>
      </header>

      <section className="pd__wrap pd__hero" key={project.id}>
        <div className="pd__hero-main">
          <span className="pd__index" data-a="rise" aria-hidden="true">
            {pad(activeIndex + 1)}
          </span>
          <span className="eyebrow" data-a="rise" data-d="80">
            {project.kicker}
          </span>
          <h2 id="pd-title" className="pd__title">
            {project.title.split(" ").map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                {/* Spacja tylko dla czytnikow ekranu — w kontenerze flex nie wplywa na uklad. */}
                {i > 0 && " "}
                <span className="pd__word">
                  <span data-a="mask" data-d={160 + i * 90}>
                    {word}
                  </span>
                </span>
              </Fragment>
            ))}
          </h2>
          <span className={`pd__status${live ? " pd__status--live" : ""}`} data-a="rise" data-d="420">
            <span className="pd__status-dot" aria-hidden="true" />
            {STATUS_LABEL[details.status]}
          </span>
        </div>

        <div className="pd__hero-side">
          {project.href ? (
            <a className="pd__platform" href={project.href} target="_blank" rel="noopener noreferrer" data-a="wipe" data-d="220">
              <div className="pd__platform-top">
                <span className="pd__platform-label">Platforma online</span>
                <span className="pd__orbit" aria-hidden="true" />
              </div>
              <div className="pd__platform-bottom">
                <span>{project.linkLabel ? "Przejdź na platformę" : "Zobacz projekt"}</span>
                <div className="pd__platform-domain">
                  <strong>{domainOf(project.href)}</strong>
                  <ArrowUpRightIcon size={44} />
                </div>
              </div>
            </a>
          ) : (
            <div className="pd__nolink" data-a="wipe" data-d="220">
              <span className="label">Link publiczny</span>
              <div>
                <p>
                  {details.status === "nda"
                    ? "Projekt objęty NDA. System działa wewnątrz firmy klienta."
                    : "Ten projekt nie ma publicznej strony."}
                </p>
                <a href="#kontakt" onClick={close}>
                  Zapytaj o szczegóły
                  <ArrowRightIcon />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="pd__marquee" aria-label="Technologie">
        <div className="pd__marquee-track">
          {[...loopHalf, ...loopHalf].map((tech, i) => (
            <span key={i} aria-hidden={i >= details.stack.length || undefined}>
              {tech}
              <i />
            </span>
          ))}
        </div>
      </div>

      <div className="pd__wrap pd__content" key={`${project.id}-content`}>
        <dl className="pd__facts">
          {facts.map(([label, value], i) => (
            <div key={label} data-a="rise" data-d={i * 70}>
              <dt className="label">
                {label}
                <span>{pad(i + 1)}</span>
              </dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="pd__columns">
          <div className="pd__about" data-a="rise">
            <span className="label">O projekcie</span>
            <p>{project.description}</p>
            {details.status === "nda" && (
              <p className="pd__note">
                Szczegóły techniczne i nazwa klienta są objęte umową o poufności. Chętnie opowiemy więcej w rozmowie.
              </p>
            )}
          </div>
          <div>
            <h3 className="pd__heading">Zakres prac</h3>
            <ol className="pd__scope">
              {details.scope.map((item, i) => (
                <li key={item} data-a="rise" data-d={120 + i * 70}>
                  <span>{pad(i + 1)}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="pd__cta">
          <h3>Masz podobny projekt?</h3>
          <a className="button button--primary" href="#kontakt" onClick={close}>
            Porozmawiajmy o podobnym
            <ArrowRightIcon />
          </a>
        </div>
      </div>

      <button type="button" className="pd__next" onClick={() => step(1)}>
        <div className="pd__wrap pd__next-inner">
          <div>
            <span className="pd__next-label">Następny projekt · {pad(((activeIndex + 1) % projects.length) + 1)}</span>
            <span className="pd__next-title">{next.title}</span>
          </div>
          <ArrowRightIcon size={56} />
        </div>
      </button>
    </dialog>
  );
}
