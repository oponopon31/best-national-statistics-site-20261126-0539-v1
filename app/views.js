/* Page renderers and the hash router. Every control is bound here:
   nav links, year-range selectors, chart tabs, sortable tables,
   the province search box and the province explorer select. */

import * as D from "./data.js";
import { lineChart, barChart, hbarChart, donutChart, PALETTE } from "./charts.js";

const app = document.getElementById("app");

function num(n, d) {
  return Number(n).toLocaleString("en-US", { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 });
}
function kpi(label, value, sub) {
  return '<div class="kpi"><div class="kpi-label">' + label + '</div><div class="kpi-value">' + value + '</div><div class="kpi-sub">' + sub + '</div></div>';
}
function card(title, sub, body, extra) {
  return '<section class="card' + (extra ? " " + extra : "") + '"><h2>' + title + '</h2>' +
    (sub ? '<p class="card-sub">' + sub + '</p>' : "") + body + '</section>';
}
function srcNote(text) { return '<p class="src">Source: ' + text + '</p>'; }

function chartRange(id, current) {
  return '<label class="ctl">Show <select id="' + id + '">' +
    '<option value="all"' + (current === "all" ? " selected" : "") + '>All years</option>' +
    '<option value="recent"' + (current === "recent" ? " selected" : "") + '>Last 5 years</option>' +
    '<option value="early"' + (current === "early" ? " selected" : "") + '>2015–2019</option>' +
    '</select></label>';
}
function sliceSeries(series, range) {
  if (range === "recent") return series.slice(-5);
  if (range === "early") return series.slice(0, 5);
  return series;
}

/* ---- sortable table helper ---- */
function sortRows(rows, key, dir) {
  const copy = rows.slice();
  copy.sort((a, b) => {
    const va = a[key], vb = b[key];
    const c = (typeof va === "number" && typeof vb === "number") ? va - vb : String(va).localeCompare(String(vb));
    return dir === "asc" ? c : -c;
  });
  return copy;
}
function bindSort(tableId, rows, renderRows, initialKey, initialDir) {
  const table = document.getElementById(tableId);
  if (!table) return;
  let key = initialKey, dir = initialDir;
  const body = table.querySelector("tbody");
  const apply = () => {
    body.innerHTML = renderRows(sortRows(rows, key, dir));
    table.querySelectorAll("th[data-sort]").forEach(th => {
      th.classList.remove("sorted-asc", "sorted-desc");
      if (th.dataset.sort === key) th.classList.add(dir === "asc" ? "sorted-asc" : "sorted-desc");
    });
  };
  table.querySelectorAll("th[data-sort]").forEach(th => {
    th.addEventListener("click", () => {
      const k = th.dataset.sort;
      if (k === key) dir = dir === "asc" ? "desc" : "asc";
      else { key = k; dir = k === "name" || k === "region" || k === "capital" ? "asc" : "desc"; }
      apply();
    });
  });
  apply();
}

/* ---- pages ---- */

function pageOverview() {
  const popRange = "all";
  const html =
    '<div class="hero"><h1>Indonesia in Numbers</h1>' +
    '<p>The country at a glance: population, the economy, jobs and poverty — published figures with their source and year.</p></div>' +
    '<div class="kpis">' +
    kpi("Population", "284.4 million", "Mid-2025 · BPS") +
    kpi("GDP", "Rp 22,139 trillion", "2024 · BPS") +
    kpi("GDP per capita", "Rp 78.6 million", "2024 · BPS") +
    kpi("Inflation", "1.57%", "Dec 2024, year-on-year · BPS") +
    kpi("Unemployment", "4.91%", "Aug 2024 · BPS Sakernas") +
    kpi("Poverty rate", "8.47%", "Mar 2025 · BPS Susenas") +
    '</div>' +
    '<div class="grid2">' +
    card("Population trend", "Million people, 2015–2024 · World Bank",
      '<div class="ctl-row">' + chartRange("pop-range", popRange) + '</div><div id="pop-chart"></div>' + srcNote("World Bank, World Development Indicators.")) +
    card("Economic growth", "Real GDP growth, % per year · BPS",
      '<div id="gdp-chart"></div>' + srcNote("BPS, national accounts. 2020 is the pandemic contraction.")) +
    '</div>' +
    card("Latest releases", "What BPS published most recently",
      '<ul class="releases">' + D.RELEASES.map(r =>
        '<li><span class="rel-date">' + r.date + '</span><strong>' + r.title + '</strong><span class="rel-text">' + r.text + '</span></li>').join("") + '</ul>');
  app.innerHTML = html;
  const drawPop = range => {
    const rows = sliceSeries(D.POPULATION_SERIES, range).map(p => ({ x: String(p.year), y: p.value }));
    document.getElementById("pop-chart").innerHTML = lineChart(rows, { unit: "m", decimals: 1, color: PALETTE.teal });
  };
  drawPop(popRange);
  document.getElementById("pop-range").addEventListener("change", e => drawPop(e.target.value));
  document.getElementById("gdp-chart").innerHTML = barChart(
    D.GDP_SERIES.map(g => ({ x: String(g.year), y: g.growth })), { unit: "%", decimals: 2 });
}

function pagePopulation() {
  const rows = D.PROVINCES.map(p => ({
    name: p.name, region: p.region, pop: p.pop, area: p.area,
    density: Math.round(D.density(p))
  }));
  app.innerHTML =
    '<h1>Population</h1><p class="lede">284.4 million people at mid-2025, spread over 38 provinces — more than half of them on Java.</p>' +
    '<div class="grid2">' +
    card("Population by year", "Million people · World Bank",
      '<div id="pop-chart2"></div>' + srcNote("World Bank, World Development Indicators.")) +
    card("Age structure, 2024", "Share of population · World Bank",
      donutChart([
        { label: "0–14 years", value: 24.6, color: PALETTE.teal },
        { label: "15–64 years", value: 68.1, color: PALETTE.navy },
        { label: "65 years and over", value: 7.3, color: PALETTE.amber }
      ], { center: "68.1%", centerSub: "working age" }) + srcNote("World Bank, World Development Indicators.")) +
    '</div>' +
    card("Urban and rural", "Share of population, 2024 · World Bank",
      donutChart([
        { label: "Urban", value: 58.8, color: PALETTE.navy },
        { label: "Rural", value: 41.2, color: PALETTE.teal }
      ], { center: "58.8%", centerSub: "urban" }) + srcNote("World Bank, World Development Indicators. Java holds 55.6% of the population on 7% of the land.")) +
    card("Population by province", "Mid-2025 · BPS. Click a column heading to sort.",
      '<div class="table-wrap"><table id="prov-pop-table" class="sortable"><thead><tr>' +
      '<th data-sort="name">Province</th><th data-sort="region">Island group</th>' +
      '<th data-sort="pop" class="num">Population</th><th data-sort="area" class="num">Land area (km²)</th>' +
      '<th data-sort="density" class="num">Density (per km²)</th></tr></thead><tbody></tbody></table></div>' +
      srcNote("BPS provincial population estimates, mid-2025."));
  document.getElementById("pop-chart2").innerHTML = lineChart(
    D.POPULATION_SERIES.map(p => ({ x: String(p.year), y: p.value })), { unit: "m", decimals: 1, color: PALETTE.teal });
  bindSort("prov-pop-table", rows, rs => rs.map(r =>
    '<tr><td>' + r.name + '</td><td>' + r.region + '</td><td class="num">' + num(r.pop) + '</td><td class="num">' + num(r.area) + '</td><td class="num">' + num(r.density) + '</td></tr>').join(""),
    "pop", "desc");
}

function pageEconomy() {
  app.innerHTML =
    '<h1>Economy</h1><p class="lede">The largest economy in Southeast Asia: GDP of Rp 22,139 trillion in 2024, growing 5.03%.</p>' +
    '<div class="kpis">' +
    kpi("GDP 2024", "Rp 22,139 trillion", "BPS") +
    kpi("GDP growth 2024", "5.03%", "BPS, real") +
    kpi("GDP per capita", "Rp 78.6 million", "US$ 4,960 · BPS") +
    kpi("Inflation Dec 2024", "1.57%", "Year-on-year · BPS") +
    '</div>' +
    card("Trends", "Switch between growth, the size of the economy and prices.",
      '<div class="tabs" role="tablist">' +
      '<button class="tab active" data-tab="growth">GDP growth</button>' +
      '<button class="tab" data-tab="nominal">Nominal GDP</button>' +
      '<button class="tab" data-tab="inflation">Inflation</button></div>' +
      '<div id="econ-chart"></div><p class="src" id="econ-src">Source: BPS, national accounts.</p>') +
    '<div class="grid2">' +
    card("GDP by sector, 2024", "Share of GDP, % · BPS",
      hbarChart(D.GDP_SECTORS.map(s => ({ label: s.sector, value: s.value })), { unit: "%", decimals: 1 }) +
      srcNote("BPS, national accounts. Shares rounded; “All other sectors” is the residual.")) +
    card("Trade, 2024", "Merchandise trade, US$ billion · BPS",
      '<div class="table-wrap"><table><thead><tr><th>Year</th><th class="num">Exports</th><th class="num">Imports</th><th class="num">Balance</th></tr></thead><tbody>' +
      D.TRADE_SERIES.map(t => '<tr><td>' + t.year + '</td><td class="num">' + t.exports.toFixed(1) + '</td><td class="num">' + t.imports.toFixed(1) + '</td><td class="num">' + (t.exports - t.imports).toFixed(1) + '</td></tr>').join("") +
      '</tbody></table></div>' + srcNote("BPS. 2024: exports US$ 264.7 billion, imports US$ 233.7 billion, surplus US$ 31.0 billion.")) +
    '</div>';
  const draw = tab => {
    const el = document.getElementById("econ-chart");
    const src = document.getElementById("econ-src");
    if (tab === "growth") {
      el.innerHTML = barChart(D.GDP_SERIES.map(g => ({ x: String(g.year), y: g.growth })), { unit: "%", decimals: 2, height: 230 });
      src.textContent = "Source: BPS, national accounts. Real GDP growth, percent per year.";
    } else if (tab === "nominal") {
      el.innerHTML = barChart(D.GDP_SERIES.map(g => ({ x: String(g.year), y: g.nominal })), { unit: "", decimals: 0, color: PALETTE.teal, height: 230 });
      src.textContent = "Source: BPS, national accounts. Nominal GDP, Rp trillion.";
    } else {
      el.innerHTML = lineChart(D.INFLATION_SERIES.map(i => ({ x: String(i.year), y: i.value })), { unit: "%", decimals: 2, color: PALETTE.amber, height: 230 });
      src.textContent = "Source: BPS. Consumer price inflation, December year-on-year, percent.";
    }
    document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  };
  document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => draw(b.dataset.tab)));
  draw("growth");
}

function pageEmployment() {
  app.innerHTML =
    '<h1>Employment</h1><p class="lede">152.11 million people in the labour force in August 2024; 144.64 million of them working.</p>' +
    '<div class="kpis">' +
    kpi("Unemployment", "4.91%", "Aug 2024 · BPS Sakernas") +
    kpi("Labour force", "152.11 million", "Aug 2024 · BPS Sakernas") +
    kpi("Employed", "144.64 million", "Aug 2024 · BPS Sakernas") +
    kpi("Labour force participation", "70.63%", "Aug 2024 · BPS Sakernas") +
    kpi("Average wage", "Rp 3.27 million / month", "Aug 2024 · BPS Sakernas") +
    kpi("Formal employment", "42.05%", "Of employed · Aug 2024") +
    '</div>' +
    '<div class="grid2">' +
    card("Unemployment rate", "Open unemployment, August, % · BPS Sakernas",
      '<div class="ctl-row">' + chartRange("unemp-range", "all") + '</div><div id="unemp-chart"></div>' +
      srcNote("BPS, National Labour Force Survey (Sakernas).")) +
    card("Formal and informal work", "Share of employed people, Aug 2024 · BPS",
      donutChart([
        { label: "Formal", value: 42.05, color: PALETTE.teal },
        { label: "Informal", value: 57.95, color: PALETTE.amber }
      ], { center: "42.1%", centerSub: "formal" }) +
      srcNote("BPS Sakernas, August 2024. 60.81 million people worked formally; the rest informally.")) +
    '</div>' +
    card("Employment by sector", "Share of employed people, Aug 2024, % · BPS",
      hbarChart(D.EMPLOYMENT_SECTORS.map(s => ({ label: s.sector, value: s.value })), { unit: "%", decimals: 1 }) +
      srcNote("BPS Sakernas. Shares rounded; “All other sectors” is the residual.")) +
    card("Labour force, 2019–2024", "Million people, August · BPS Sakernas",
      '<div class="table-wrap"><table id="labour-table" class="sortable"><thead><tr>' +
      '<th data-sort="year">Year</th><th data-sort="labour" class="num">Labour force</th>' +
      '<th data-sort="employed" class="num">Employed</th><th data-sort="unemployed" class="num">Unemployed</th></tr></thead><tbody></tbody></table></div>' +
      srcNote("BPS, National Labour Force Survey (Sakernas)."));
  const drawUnemp = range => {
    document.getElementById("unemp-chart").innerHTML = lineChart(
      sliceSeries(D.UNEMPLOYMENT_SERIES, range).map(u => ({ x: String(u.year), y: u.value })),
      { unit: "%", decimals: 2, color: PALETTE.navy });
  };
  drawUnemp("all");
  document.getElementById("unemp-range").addEventListener("change", e => drawUnemp(e.target.value));
  bindSort("labour-table", D.LABOUR_SERIES, rs => rs.map(r =>
    '<tr><td>' + r.year + '</td><td class="num">' + r.labour.toFixed(2) + '</td><td class="num">' + r.employed.toFixed(2) + '</td><td class="num">' + r.unemployed.toFixed(2) + '</td></tr>').join(""),
    "year", "desc");
}

function pagePoverty() {
  const top = D.PROVINCES.slice().sort((a, b) => b.poverty - a.poverty).slice(0, 10);
  const bottom = D.PROVINCES.slice().sort((a, b) => a.poverty - b.poverty).slice(0, 5);
  app.innerHTML =
    '<h1>Poverty</h1><p class="lede">8.47% of Indonesians lived below the poverty line in March 2025 — 23.85 million people, the lowest rate on record.</p>' +
    '<div class="kpis">' +
    kpi("Poverty rate", "8.47%", "Mar 2025 · BPS Susenas") +
    kpi("Poor people", "23.85 million", "Mar 2025 · BPS Susenas") +
    kpi("Poverty line", "Rp 609,160 / month", "Per capita · Mar 2025") +
    kpi("Gini ratio", "0.375", "Mar 2025 · BPS") +
    kpi("Extreme poverty", "0.85%", "Mar 2025 · BPS") +
    kpi("Rural poverty", "11.03%", "Mar 2025 · BPS") +
    '</div>' +
    '<div class="grid2">' +
    card("Poverty rate trend", "March, % · BPS Susenas",
      '<div id="pov-chart"></div>' + srcNote("BPS, National Socio-Economic Survey (Susenas).")) +
    card("Gini ratio", "March · BPS",
      '<div id="gini-chart"></div>' + srcNote("BPS. 0 is perfect equality; 1 is maximum inequality.")) +
    '</div>' +
    '<div class="grid2">' +
    card("Highest poverty rates by province", "March 2025, % · BPS",
      hbarChart(top.map(p => ({ label: p.name, value: p.poverty })), { unit: "%", decimals: 2, highlight: 15 }) +
      srcNote("BPS Susenas, March 2025. Highland Papua 30.03% is the highest in the country.")) +
    card("Lowest poverty rates by province", "March 2025, % · BPS",
      hbarChart(bottom.map(p => ({ label: p.name, value: p.poverty })), { unit: "%", decimals: 2 }) +
      srcNote("BPS Susenas, March 2025. Bali 3.72% is the lowest in the country.")) +
    '</div>' +
    card("Poverty by island group", "March 2025, % · BPS",
      hbarChart(D.POVERTY_BY_ISLAND.map(i => ({ label: i.island, value: i.value })), { unit: "%", decimals: 2, highlight: 10 }) +
      srcNote("BPS Susenas, March 2025. Maluku and Papua, at 18.90%, is far above the national 8.47%."));
  document.getElementById("pov-chart").innerHTML = lineChart(
    D.POVERTY_SERIES.map(p => ({ x: String(p.year), y: p.value })), { unit: "%", decimals: 2, color: PALETTE.teal });
  document.getElementById("gini-chart").innerHTML = lineChart(
    D.GINI_SERIES.map(g => ({ x: String(g.year), y: g.value })), { unit: "", decimals: 3, color: PALETTE.navy });
}

function provincePanel(p) {
  return '<div class="panel"><h3>' + p.name + '</h3><p class="panel-sub">Capital ' + p.capital + ' · ' + p.region + '</p>' +
    '<div class="stat-grid">' +
    '<div class="stat"><span>Population (mid-2025)</span><strong>' + num(p.pop) + '</strong></div>' +
    '<div class="stat"><span>Share of Indonesia</span><strong>' + D.shareOfNational(p).toFixed(2) + '%</strong></div>' +
    '<div class="stat"><span>Land area</span><strong>' + num(p.area) + ' km²</strong></div>' +
    '<div class="stat"><span>Density</span><strong>' + num(Math.round(D.density(p))) + ' / km²</strong></div>' +
    '<div class="stat"><span>Poverty rate (Mar 2025)</span><strong>' + p.poverty.toFixed(2) + '%</strong></div>' +
    '<div class="stat"><span>Poverty line (Mar 2025)</span><strong>Rp ' + num(p.line) + ' / month</strong></div>' +
    '</div><p class="src">Sources: BPS provincial estimates, mid-2025; BPS Susenas, March 2025.</p></div>';
}

function pageProvinces() {
  const rows = D.PROVINCES.map(p => ({
    name: p.name, region: p.region, capital: p.capital, pop: p.pop, area: p.area,
    density: Math.round(D.density(p)), poverty: p.poverty, line: p.line
  }));
  let current = rows.slice();
  app.innerHTML =
    '<h1>Provinces</h1><p class="lede">All 38 provinces, from West Java’s 50.8 million people to South Papua’s 549,700. Pick one to see it in detail, or compare them all below.</p>' +
    '<div class="explorer"><label class="ctl">Province <select id="prov-select">' +
    D.PROVINCES.map((p, i) => '<option value="' + i + '"' + (p.name === "West Java" ? " selected" : "") + '>' + p.name + '</option>').join("") +
    '</select></label><div id="prov-panel"></div></div>' +
    card("Compare all provinces", "Mid-2025 population · BPS; poverty March 2025 · BPS. Click a column heading to sort; type to filter.",
      '<div class="ctl-row"><label class="ctl">Search <input id="prov-search" type="search" placeholder="Type a province name…" aria-label="Search provinces"></label></div>' +
      '<div class="table-wrap"><table id="prov-table" class="sortable"><thead><tr>' +
      '<th data-sort="name">Province</th><th data-sort="region">Island group</th>' +
      '<th data-sort="pop" class="num">Population</th><th data-sort="area" class="num">Area (km²)</th>' +
      '<th data-sort="density" class="num">Density</th><th data-sort="poverty" class="num">Poverty %</th>' +
      '<th data-sort="line" class="num">Poverty line (Rp)</th></tr></thead><tbody></tbody></table></div>' +
      '<p class="src" id="prov-count"></p>');
  const sel = document.getElementById("prov-select");
  const show = i => { document.getElementById("prov-panel").innerHTML = provincePanel(D.PROVINCES[i]); };
  show(sel.value);
  sel.addEventListener("change", e => show(e.target.value));
  const table = document.getElementById("prov-table");
  const body = table.querySelector("tbody");
  let key = "pop", dir = "desc";
  const renderRows = rs => rs.map(r =>
    '<tr><td>' + r.name + '</td><td>' + r.region + '</td><td class="num">' + num(r.pop) + '</td><td class="num">' + num(r.area) +
    '</td><td class="num">' + num(r.density) + '</td><td class="num">' + r.poverty.toFixed(2) + '</td><td class="num">' + num(r.line) + '</td></tr>').join("");
  const apply = () => {
    const q = document.getElementById("prov-search").value.trim().toLowerCase();
    current = rows.filter(r => !q || r.name.toLowerCase().includes(q) || r.region.toLowerCase().includes(q) || r.capital.toLowerCase().includes(q));
    body.innerHTML = renderRows(sortRows(current, key, dir));
    document.getElementById("prov-count").textContent = "Showing " + current.length + " of 38 provinces. Sources: BPS provincial estimates, mid-2025; BPS Susenas, March 2025.";
    table.querySelectorAll("th[data-sort]").forEach(th => {
      th.classList.remove("sorted-asc", "sorted-desc");
      if (th.dataset.sort === key) th.classList.add(dir === "asc" ? "sorted-asc" : "sorted-desc");
    });
  };
  table.querySelectorAll("th[data-sort]").forEach(th => {
    th.addEventListener("click", () => {
      const k = th.dataset.sort;
      if (k === key) dir = dir === "asc" ? "desc" : "asc";
      else { key = k; dir = (k === "name" || k === "region") ? "asc" : "desc"; }
      apply();
    });
  });
  document.getElementById("prov-search").addEventListener("input", apply);
  apply();
}

function pageSources() {
  app.innerHTML =
    '<h1>Sources &amp; methods</h1><p class="lede">Every figure on this site comes from a published release. Figures are shown with their reference period; nothing here is estimated by this site.</p>' +
    card("Sources", "",
      '<div class="table-wrap"><table><thead><tr><th>Source</th><th>What it provides here</th><th>Latest reference</th></tr></thead><tbody>' +
      '<tr><td>BPS — Statistics Indonesia</td><td>Population, GDP, inflation, unemployment, poverty, Gini ratio, trade, provincial figures</td><td>March–August 2025</td></tr>' +
      '<tr><td>World Bank — World Development Indicators</td><td>Population series 2015–2024, age structure, urban share</td><td>2024</td></tr>' +
      '<tr><td>Bank Indonesia</td><td>Trade balance commentary and the 2024 surplus, as published with BPS trade data</td><td>December 2024</td></tr>' +
      '</tbody></table></div>') +
    card("Methods and definitions", "",
      '<ul class="methods">' +
      '<li><strong>Population.</strong> Mid-year estimates. The 284.4 million headline is the BPS mid-2025 estimate; the 2015–2024 series is the World Bank series, which uses a different vintage and is shown separately.</li>' +
      '<li><strong>GDP.</strong> Nominal GDP in current rupiah; growth is real GDP growth at constant 2010 prices, year on year.</li>' +
      '<li><strong>Inflation.</strong> Consumer Price Index, December year-on-year, for the calendar year shown.</li>' +
      '<li><strong>Unemployment.</strong> Open unemployment rate from the National Labour Force Survey (Sakernas), August round, as a share of the labour force.</li>' +
      '<li><strong>Poverty.</strong> Share of people with per-capita monthly expenditure below the poverty line, from the National Socio-Economic Survey (Susenas). The poverty line is the cost of a food and non-food basket per person per month.</li>' +
      '<li><strong>Gini ratio.</strong> 0 means perfect equality of expenditure, 1 means maximum inequality.</li>' +
      '<li><strong>Provincial figures.</strong> Population and land area are BPS mid-2025 estimates; poverty rates and poverty lines are BPS Susenas, March 2025. Provincial unemployment and provincial GDP (GRDP) are published by BPS in the Sakernas booklets and regional accounts, and are not reproduced here.</li>' +
      '<li><strong>Rounding.</strong> Sector shares are rounded to one decimal; “All other sectors” is the residual so the shares sum to 100%.</li>' +
      '</ul>') +
    card("Releases used", "",
      '<ul class="releases">' + D.RELEASES.map(r =>
        '<li><span class="rel-date">' + r.date + '</span><strong>' + r.title + '</strong><span class="rel-text">' + r.text + '</span></li>').join("") + '</ul>');
}

/* ---- router ---- */

const ROUTES = {
  "": pageOverview,
  "population": pagePopulation,
  "economy": pageEconomy,
  "employment": pageEmployment,
  "poverty": pagePoverty,
  "provinces": pageProvinces,
  "sources": pageSources
};

function route() {
  const hash = location.hash.replace(/^#\/?/, "").split("?")[0];
  const fn = ROUTES[hash] || pageOverview;
  fn();
  document.querySelectorAll("nav a").forEach(a => {
    const target = a.getAttribute("href").replace(/^#\/?/, "");
    a.classList.toggle("active", target === hash);
  });
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
route();
