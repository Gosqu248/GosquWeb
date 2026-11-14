const STAGE_LABELS = ["Dane", "Domena", "API", "Klienci"] as const;

const CLIENTS = [
  { name: "Angular", kind: "WEB" },
  { name: "React Native", kind: "MOBILE" },
  { name: "Integracje", kind: "B2B" },
] as const;

const DATA_STORES = ["PostgreSQL", "Kafka", "Redis"] as const;

interface StackDiagramProps {
  /** Aktywny etap 1..4 — warstwy odslaniaja sie od dolu (dane) do gory (klienci). */
  stage: number;
  tail: boolean;
}

function Connectors({ columns }: { columns: 1 | 3 }) {
  return (
    <div className={`stack__links stack__links--${columns}`} aria-hidden="true">
      {Array.from({ length: columns }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

export function StackDiagram({ stage, tail }: StackDiagramProps) {
  const label = tail ? "Gotowe" : `0${stage} · ${STAGE_LABELS[stage - 1]}`;

  return (
    <aside className="stack" aria-label="Nasz stos technologiczny">
      <div className="stack__head">
        <span className="stack__title">Nasz stos</span>
        <span className="stack__stage">{label}</span>
      </div>

      <div className="stack__layer stack__clients" data-visible={stage >= 4}>
        {CLIENTS.map((client) => (
          <div key={client.name} className="stack__box">
            <span className="stack__box-name">{client.name}</span>
            <span className="stack__box-kind">{client.kind}</span>
          </div>
        ))}
      </div>

      <Connectors columns={3} />

      <div className="stack__layer stack__api" data-visible={stage >= 3}>
        REST API · JWT · OAuth2
      </div>

      <Connectors columns={1} />

      <div className="stack__layer stack__core" data-visible={stage >= 2}>
        <span className="stack__core-name">Spring Boot</span>
        <span className="stack__core-meta">Domena · JPA · Security</span>
      </div>

      <Connectors columns={3} />

      <div className="stack__layer stack__data" data-visible={stage >= 1}>
        <div className="stack__stores">
          {DATA_STORES.map((store) => (
            <span key={store} className="stack__store">
              {store}
            </span>
          ))}
        </div>
        <span className="stack__infra">DOCKER · K8S · NGINX · AWS</span>
      </div>
    </aside>
  );
}
