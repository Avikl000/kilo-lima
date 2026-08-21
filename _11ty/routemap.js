// Auto-generated schematic route maps.
//
// Draws the same flat "not to scale" dot-and-dash diagram we used to hand-author,
// but straight from an itinerary's day-by-day locations — so the map is a product
// of the itinerary data, not a separate art asset. On-brand (Runway / Sky, Google
// Sans Flex), inline SVG, no runtime JS, no external calls, prints in the PDF.

const RUNWAY = "#314E67";
const SKY = "#37AEE4";
const MUTE = "rgba(49,78,103,0.65)";
const FAINT = "rgba(49,78,103,0.40)";
const GRID = "rgba(49,78,103,0.06)";
const FONT = "'Google Sans Flex', Arial, sans-serif";

const W = 1200;
const H = 675;

const xmlEscape = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// "Cape Leveque, Dampier Peninsula" -> "Cape Leveque"
// "Purnululu — the Bungle Bungles" -> "Purnululu"
// "Kununurra and Lake Argyle"      -> "Kununurra"
function shortName(loc) {
  let s = String(loc || "").trim();
  s = s.split(",")[0];
  s = s.split(/\s[—–]\s/)[0];
  s = s.split(/\sand\s/i)[0];
  return s.trim();
}

// "Days 3–4" -> "DAYS 3–4"; first/last get START · / · END markers.
function dayLabel(raw, isFirst, isLast) {
  const up = String(raw || "").toUpperCase().trim();
  if (isFirst) return up ? `START · ${up}` : "START";
  if (isLast) return up ? `${up} · END` : "END";
  return up;
}

// Collapse each day block to one stop, dropping consecutive repeats of the same place.
function toStops(days) {
  const stops = [];
  for (const d of days || []) {
    const name = shortName(d.location);
    if (!name) continue;
    const prev = stops[stops.length - 1];
    if (prev && prev.name === name) {
      prev.rawLast = d.label; // extend the stay; last label wins the range end
      continue;
    }
    stops.push({ name, rawFirst: d.label, rawLast: d.label });
  }
  return stops;
}

export function routeSchematic(route, days, title) {
  const stops = toStops(days);
  if (stops.length < 2) return ""; // a single point isn't a route

  const n = stops.length;
  const xStart = 150;
  const xEnd = 1050;
  const baseline = 470;
  const arcH = 120;

  const pts = stops.map((s, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const x = xStart + (xEnd - xStart) * t;
    const y = baseline - arcH * Math.sin(Math.PI * t);
    return { ...s, x, y };
  });

  const parts = [];

  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" ` +
      `aria-label="Schematic route map, not to scale: ${xmlEscape(route || pts.map((p) => p.name).join(" to "))}">`
  );
  parts.push(`<rect width="${W}" height="${H}" fill="#FFFFFF"/>`);

  // faint reference grid
  parts.push(`<g stroke="${GRID}" stroke-width="1">`);
  for (let x = 150; x < W; x += 150) parts.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`);
  for (let y = 135; y < H; y += 135) parts.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`);
  parts.push(`</g>`);

  // header
  parts.push(
    `<text x="70" y="92" font-family="${FONT}" font-size="13" font-weight="700" letter-spacing="2.4" fill="${MUTE}">ROUTE — ${xmlEscape(String(title || "").toUpperCase())}</text>`
  );
  if (route) {
    parts.push(
      `<text x="70" y="140" font-family="${FONT}" font-size="44" font-weight="900" letter-spacing="-0.5" fill="${RUNWAY}">${xmlEscape(route)}</text>`
    );
  }

  // dashed connecting path (behind the nodes)
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  parts.push(
    `<path d="${d}" fill="none" stroke="${RUNWAY}" stroke-width="2.5" stroke-dasharray="9 7" stroke-linecap="round" stroke-linejoin="round"/>`
  );

  // nodes + labels
  pts.forEach((p, i) => {
    const isFirst = i === 0;
    const isLast = i === n - 1;
    const endpoint = isFirst || isLast;
    const fill = endpoint ? RUNWAY : SKY;

    // white halo so the dashed line reads cleanly behind the dot
    parts.push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="9" fill="#FFFFFF"/>`);
    parts.push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="6" fill="${fill}"/>`);

    // clamp anchor at the edges so wide labels don't clip
    const anchor = isFirst ? "start" : isLast ? "end" : "middle";
    // alternate above/below by parity so neighbouring labels never share a row
    const below = i % 2 === 0;
    const label = dayLabel(isLast ? p.rawLast : p.rawFirst, isFirst, isLast);

    let nameY;
    let dayY;
    if (below) {
      nameY = p.y + 30;
      dayY = p.y + 48;
    } else {
      nameY = p.y - 18;
      dayY = p.y - 34;
    }

    parts.push(
      `<text x="${p.x.toFixed(1)}" y="${nameY.toFixed(1)}" text-anchor="${anchor}" font-family="${FONT}" font-size="21" font-weight="700" fill="${RUNWAY}">${xmlEscape(p.name)}</text>`
    );
    if (label) {
      parts.push(
        `<text x="${p.x.toFixed(1)}" y="${dayY.toFixed(1)}" text-anchor="${anchor}" font-family="${FONT}" font-size="12.5" font-weight="700" letter-spacing="1.4" fill="${MUTE}">${xmlEscape(label)}</text>`
      );
    }
  });

  parts.push(
    `<text x="1140" y="648" text-anchor="end" font-family="${FONT}" font-size="13" font-weight="700" letter-spacing="1.6" fill="${FAINT}">SCHEMATIC — NOT TO SCALE</text>`
  );

  parts.push(`</svg>`);
  return parts.join("");
}
