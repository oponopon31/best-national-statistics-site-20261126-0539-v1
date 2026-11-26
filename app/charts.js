/* Hand-rolled SVG charts. No library: every chart is drawn from the
   data passed in, so each page can re-render on a control change. */

const NAVY = "#0b3d5c";
const TEAL = "#0e7a6b";
const BLUE = "#2a7fbf";
const AMBER = "#c47a12";
const GREY = "#8a97a3";
const GRID = "#e3e8ec";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function niceTicks(min, max, count) {
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  const step0 = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const norm = step0 / mag;
  const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const out = [];
  for (let v = lo; v <= hi + step * 0.001; v += step) out.push(v);
  return out;
}

function fmtTick(v) {
  if (Math.abs(v) >= 1000) return String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(2).replace(/0$/, "");
}

/* Line chart. points: [{x (label), y}]. opts: {unit, decimals, color, height} */
export function lineChart(points, opts) {
  const o = Object.assign({ unit: "", decimals: 1, color: TEAL, height: 260 }, opts || {});
  const W = 640, H = o.height, PL = 52, PR = 14, PT = 14, PB = 30;
  const ys = points.map(p => p.y);
  let min = Math.min.apply(null, ys), max = Math.max.apply(null, ys);
  const pad = (max - min) * 0.15 || 1;
  min -= pad; max += pad;
  const ticks = niceTicks(min, max, 4);
  min = Math.min(min, ticks[0]); max = Math.max(max, ticks[ticks.length - 1]);
  const X = i => PL + (i * (W - PL - PR)) / Math.max(1, points.length - 1);
  const Y = v => PT + (1 - (v - min) / (max - min)) * (H - PT - PB);
  let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Line chart">';
  ticks.forEach(t => {
    s += '<line x1="' + PL + '" y1="' + Y(t).toFixed(1) + '" x2="' + (W - PR) + '" y2="' + Y(t).toFixed(1) + '" stroke="' + GRID + '"/>';
    s += '<text x="' + (PL - 6) + '" y="' + (Y(t) + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="#5a6b78">' + esc(fmtTick(t)) + o.unit + '</text>';
  });
  const line = points.map((p, i) => (i ? "L" : "M") + X(i).toFixed(1) + "," + Y(p.y).toFixed(1)).join(" ");
  s += '<path d="' + line + '" fill="none" stroke="' + o.color + '" stroke-width="2.5"/>';
  points.forEach((p, i) => {
    s += '<circle cx="' + X(i).toFixed(1) + '" cy="' + Y(p.y).toFixed(1) + '" r="3.5" fill="#fff" stroke="' + o.color + '" stroke-width="2"/>';
    s += '<text x="' + X(i).toFixed(1) + '" y="' + (Y(p.y) - 10).toFixed(1) + '" text-anchor="middle" font-size="11" fill="#33424e">' + p.y.toFixed(o.decimals) + '</text>';
    if (i % 2 === 0 || points.length <= 6)
      s += '<text x="' + X(i).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="#5a6b78">' + esc(p.x) + '</text>';
  });
  s += '<line x1="' + PL + '" y1="' + (H - PB) + '" x2="' + (W - PR) + '" y2="' + (H - PB) + '" stroke="#c9d2d9"/></svg>';
  return s;
}

/* Vertical bar chart. bars: [{x, y}]. Negative values draw below the zero line. */
export function barChart(bars, opts) {
  const o = Object.assign({ unit: "%", decimals: 1, color: NAVY, height: 260 }, opts || {});
  const W = 640, H = o.height, PL = 52, PR = 14, PT = 22, PB = 30;
  const ys = bars.map(b => b.y);
  let min = Math.min(0, Math.min.apply(null, ys));
  let max = Math.max(0, Math.max.apply(null, ys));
  const pad = (max - min) * 0.12 || 1;
  min -= pad; max += pad;
  const ticks = niceTicks(min, max, 4);
  min = Math.min(min, ticks[0]); max = Math.max(max, ticks[ticks.length - 1]);
  const slot = (W - PL - PR) / bars.length;
  const bw = Math.min(44, slot * 0.62);
  const Y = v => PT + (1 - (v - min) / (max - min)) * (H - PT - PB);
  let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Bar chart">';
  ticks.forEach(t => {
    s += '<line x1="' + PL + '" y1="' + Y(t).toFixed(1) + '" x2="' + (W - PR) + '" y2="' + Y(t).toFixed(1) + '" stroke="' + GRID + '"/>';
    s += '<text x="' + (PL - 6) + '" y="' + (Y(t) + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="#5a6b78">' + esc(fmtTick(t)) + o.unit + '</text>';
  });
  bars.forEach((b, i) => {
    const x = PL + i * slot + (slot - bw) / 2;
    const y0 = Y(0), y1 = Y(b.y);
    const fill = b.y < 0 ? "#b3402e" : o.color;
    s += '<rect x="' + x.toFixed(1) + '" y="' + Math.min(y0, y1).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.abs(y1 - y0).toFixed(1) + '" fill="' + fill + '" rx="2"/>';
    const ly = b.y < 0 ? y1 + 15 : y1 - 7;
    s += '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" font-size="11" fill="#33424e">' + b.y.toFixed(o.decimals) + '</text>';
    s += '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="#5a6b78">' + esc(b.x) + '</text>';
  });
  s += '<line x1="' + PL + '" y1="' + Y(0).toFixed(1) + '" x2="' + (W - PR) + '" y2="' + Y(0).toFixed(1) + '" stroke="#c9d2d9"/></svg>';
  return s;
}

/* Horizontal bars. rows: [{label, value}]. highlight: value at/above which bars turn teal. */
export function hbarChart(rows, opts) {
  const o = Object.assign({ unit: "%", decimals: 1, color: NAVY, highlight: null, height: null }, opts || {});
  const W = 640, LH = 30, PT = 6, PB = 8;
  const H = o.height || PT + rows.length * LH + PB;
  const max = Math.max.apply(null, rows.map(r => r.value)) * 1.08;
  const LX = 210, RX = 46;
  let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Horizontal bar chart">';
  rows.forEach((r, i) => {
    const y = PT + i * LH;
    const w = Math.max(2, (r.value / max) * (W - LX - RX));
    const fill = (o.highlight !== null && r.value >= o.highlight) ? TEAL : o.color;
    s += '<text x="' + (LX - 8) + '" y="' + (y + 15) + '" text-anchor="end" font-size="12" fill="#33424e">' + esc(r.label) + '</text>';
    s += '<rect x="' + LX + '" y="' + (y + 4) + '" width="' + w.toFixed(1) + '" height="16" fill="' + fill + '" rx="2"/>';
    s += '<text x="' + (LX + w + 6).toFixed(1) + '" y="' + (y + 17) + '" font-size="12" fill="#33424e">' + r.value.toFixed(o.decimals) + o.unit + '</text>';
  });
  s += '</svg>';
  return s;
}

/* Donut chart with a legend. slices: [{label, value, color}]. */
export function donutChart(slices, opts) {
  const o = Object.assign({ unit: "%", height: 220 }, opts || {});
  const total = slices.reduce((a, s) => a + s.value, 0);
  const R = 78, CX = 110, CY = 110, IR = 46;
  let s = '<svg viewBox="0 0 640 ' + o.height + '" role="img" aria-label="Share chart">';
  let a0 = -Math.PI / 2;
  slices.forEach(sl => {
    const frac = sl.value / total;
    const a1 = a0 + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = CX + R * Math.cos(a0), y0 = CY + R * Math.sin(a0);
    const x1 = CX + R * Math.cos(a1), y1 = CY + R * Math.sin(a1);
    const xi1 = CX + IR * Math.cos(a1), yi1 = CY + IR * Math.sin(a1);
    const xi0 = CX + IR * Math.cos(a0), yi0 = CY + IR * Math.sin(a0);
    s += '<path d="M' + x0.toFixed(1) + ',' + y0.toFixed(1) + ' A' + R + ',' + R + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ',' + y1.toFixed(1) +
      ' L' + xi1.toFixed(1) + ',' + yi1.toFixed(1) + ' A' + IR + ',' + IR + ' 0 ' + large + ' 0 ' + xi0.toFixed(1) + ',' + yi0.toFixed(1) + ' Z" fill="' + sl.color + '"/>';
    a0 = a1;
  });
  s += '<text x="' + CX + '" y="' + (CY - 4) + '" text-anchor="middle" font-size="20" font-weight="700" fill="#0b3d5c">' + esc(o.center || "") + '</text>';
  s += '<text x="' + CX + '" y="' + (CY + 16) + '" text-anchor="middle" font-size="11" fill="#5a6b78">' + esc(o.centerSub || "") + '</text>';
  slices.forEach((sl, i) => {
    const y = 52 + i * 34;
    s += '<rect x="250" y="' + (y - 11) + '" width="14" height="14" fill="' + sl.color + '"/>';
    s += '<text x="272" y="' + (y + 1) + '" font-size="13" fill="#33424e">' + esc(sl.label) + ' — ' + sl.value.toFixed(1) + o.unit + '</text>';
  });
  s += '</svg>';
  return s;
}

export const PALETTE = { navy: NAVY, teal: TEAL, blue: BLUE, amber: AMBER, grey: GREY };
