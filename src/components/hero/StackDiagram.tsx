type StackDiagramProps = {
  /** Aktywny etap sekwencji, 1..4. Warstwy narastaja od danych do klienta. */
  stage: number;
};

type NodeBox = { x: number; y: number; w: number; h: number; label: string; caption?: string };

const CLIENT_NODES: NodeBox[] = [
  { x: 2, y: 2, w: 80, h: 30, label: "Angular", caption: "WEB SPA" },
  { x: 90, y: 2, w: 80, h: 30, label: "React Native", caption: "MOBILE" },
  { x: 178, y: 2, w: 80, h: 30, label: "GPS", caption: "TELEMETRIA" },
];

const DATA_NODES: NodeBox[] = [
  { x: 2, y: 160, w: 80, h: 32, label: "PostgreSQL" },
  { x: 90, y: 160, w: 80, h: 32, label: "Kafka" },
  { x: 178, y: 160, w: 80, h: 32, label: "Redis" },
];

/** Warstwa gasnie, dopoki scroll do niej nie dojedzie. */
function layerStyle(stage: number, appearsAt: number): React.CSSProperties {
  const visible = stage >= appearsAt;
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(14px)",
    transition:
      "opacity var(--duration-slow) var(--ease-out-expo), transform var(--duration-slow) var(--ease-out-expo)",
  };
}

function Box({ node, muted }: { node: NodeBox; muted?: boolean }) {
  const textY = node.caption ? node.y + 19 : node.y + node.h / 2 + 4;
  return (
    <>
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx={6}
        fill={muted ? "rgba(25,29,34,0.92)" : "rgba(33,38,44,0.92)"}
        stroke="#4a535d"
      />
      <text
        x={node.x + node.w / 2}
        y={textY}
        fill="var(--color-text)"
        fontFamily="var(--font-plex-sans)"
        fontSize="9"
        fontWeight="600"
        textAnchor="middle"
      >
        {node.label}
      </text>
      {node.caption ? (
        <text
          x={node.x + node.w / 2}
          y={node.y + node.h - 6}
          fill="var(--color-text-faint)"
          fontFamily="var(--font-plex-mono)"
          fontSize="7"
          textAnchor="middle"
        >
          {node.caption}
        </text>
      ) : null}
    </>
  );
}

export function StackDiagram({ stage }: StackDiagramProps) {
  return (
    <svg
      viewBox="0 0 260 250"
      fill="none"
      role="img"
      aria-label="Architektura: klienci Angular, React Native i urządzenia GPS łączą się przez REST API z aplikacją Spring Boot, opartą o PostgreSQL, Kafkę i Redis."
      style={{ display: "block", width: "100%" }}
    >
      <defs>
        <linearGradient id="gosqu-gateway" x1="0" y1="0" x2="260" y2="0">
          <stop offset="0" stopColor="var(--brand-magenta)" />
          <stop offset="1" stopColor="var(--brand-cyan)" />
        </linearGradient>
      </defs>

      {/* etap 4 — klienci */}
      <g style={layerStyle(stage, 4)}>
        {CLIENT_NODES.map((node) => (
          <Box key={node.label} node={node} />
        ))}
      </g>

      <path d="M42 32 L42 46 M130 32 L130 46 M218 32 L218 46" stroke="#4a535d" strokeWidth="1" />

      {/* etap 3 — bramka API, jedyny pelny gradient marki w hero */}
      <g style={layerStyle(stage, 3)}>
        <rect
          x="2"
          y="46"
          width="256"
          height="34"
          rx="6"
          fill="rgba(25,29,34,0.92)"
          stroke="url(#gosqu-gateway)"
          strokeWidth="1.2"
        />
        <text
          x="130"
          y="67"
          fill="var(--color-text)"
          fontFamily="var(--font-plex-sans)"
          fontSize="9.5"
          fontWeight="600"
          textAnchor="middle"
        >
          REST API · JWT · OAuth2
        </text>
      </g>

      <path d="M130 80 L130 96" stroke="#4a535d" strokeWidth="1" />

      {/* etap 2 — rdzen */}
      <g style={layerStyle(stage, 2)}>
        <rect x="46" y="96" width="168" height="48" rx="7" fill="rgba(33,38,44,0.92)" stroke="#4a535d" />
        <text
          x="130"
          y="118"
          fill="var(--color-text)"
          fontFamily="var(--font-bricolage)"
          fontSize="14"
          fontWeight="700"
          textAnchor="middle"
        >
          Spring Boot
        </text>
        <text
          x="130"
          y="134"
          fill="var(--color-text-muted)"
          fontFamily="var(--font-plex-sans)"
          fontSize="8.5"
          textAnchor="middle"
        >
          Domena · JPA · Security
        </text>
      </g>

      <path d="M80 144 L80 160 M130 144 L130 160 M180 144 L180 160" stroke="#4a535d" strokeWidth="1" />

      {/* etap 1 — dane i infrastruktura */}
      <g style={layerStyle(stage, 1)}>
        {DATA_NODES.map((node) => (
          <Box key={node.label} node={node} muted />
        ))}
        <rect x="2" y="200" width="256" height="26" rx="6" fill="rgba(19,22,25,0.92)" stroke="#3a434d" />
        <text
          x="130"
          y="217"
          fill="var(--color-text-faint)"
          fontFamily="var(--font-plex-mono)"
          fontSize="7.5"
          letterSpacing="1"
          textAnchor="middle"
        >
          DOCKER · K8S · NGINX · AWS
        </text>
      </g>
    </svg>
  );
}
