/**
 * Tlo hero „Siatka”: perspektywiczna podloga z czerwonymi impulsami.
 * Port funkcji drawFloor z gosqu-site/Gosqu Hero v2.dc.html.
 */

const BG = "#171515";
const INK = "243,242,242";
const ACCENT = "236,48,19";
const FLOOR_LINES = 16;
const BASE_STREAKS = 8;
const EXTRA_STREAKS = 16;

/**
 * @param t        czas animacji w sekundach
 * @param progress postep przewijania hero 0..1 — rozpedza podloge i dodaje impulsy
 */
export function drawFloor(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  progress: number,
): void {
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);

  // Poswiata akcentu, lekko dryfujaca.
  const gx = w * (0.72 + 0.04 * Math.sin(t * 0.13));
  const gy = h * (0.42 + 0.05 * Math.cos(t * 0.11));
  const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.6);
  glow.addColorStop(0, `rgba(${ACCENT},${0.14 + 0.16 * progress})`);
  glow.addColorStop(1, `rgba(${ACCENT},0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  const horizon = h * 0.52;
  const vanishX = w * 0.68;
  ctx.lineWidth = 1;

  for (let k = 1; k < 12; k++) {
    const x = (w / 12) * k;
    ctx.strokeStyle = `rgba(${INK},0.04)`;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, horizon);
    ctx.stroke();
  }

  const speed = 0.25 + progress * 0.8;
  const phase = (t * speed) % 1;
  for (let k = 0; k < FLOOR_LINES; k++) {
    const u = (k + phase) / FLOOR_LINES;
    const y = horizon + (h - horizon) * u * u;
    ctx.strokeStyle = `rgba(${INK},${0.03 + 0.15 * u})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  const spread = w / 8;
  for (let j = -14; j <= 14; j++) {
    ctx.strokeStyle = `rgba(${INK},0.09)`;
    ctx.beginPath();
    ctx.moveTo(vanishX, horizon);
    ctx.lineTo(vanishX + j * spread * 1.6, h * 1.4);
    ctx.stroke();
  }

  ctx.strokeStyle = `rgba(${ACCENT},${0.5 + 0.4 * progress})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, horizon);
  ctx.lineTo(w, horizon);
  ctx.stroke();

  const streaks = BASE_STREAKS + Math.floor(progress * EXTRA_STREAKS);
  for (let i = 0; i < streaks; i++) {
    const lane = ((i * 7) % 19) - 9;
    const u = (t * (0.18 + 0.12 * ((i * 5) % 3)) + i * 0.137) % 1;
    const from = u * u;
    const to = Math.min(1, (u + 0.06) * (u + 0.06));
    const endX = vanishX + lane * spread * 1.6;
    const endY = h * 1.4;
    ctx.strokeStyle = `rgba(${ACCENT},${0.25 + 0.75 * u})`;
    ctx.lineWidth = 1 + 3 * u;
    ctx.beginPath();
    ctx.moveTo(vanishX + (endX - vanishX) * from, horizon + (endY - horizon) * from);
    ctx.lineTo(vanishX + (endX - vanishX) * to, horizon + (endY - horizon) * to);
    ctx.stroke();
  }
}
