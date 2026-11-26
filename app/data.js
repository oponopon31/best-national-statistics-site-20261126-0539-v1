/* STATISTIKA data: national series and the 38 provinces.
   Figures are published statistics, each labelled with its source and
   reference period on the page that shows it. Sources: BPS (Statistics
   Indonesia) releases, the World Bank World Development Indicators, and
   Bank Indonesia trade figures as published by BPS. */

export const NATIONAL = {
  populationMid2025: 284.4, // million, BPS mid-2025 estimate (sum of provincial estimates)
  population2024: 283.5, // million, World Bank WDI 2024
  gdpNominal2024: 22138.96, // Rp trillion, BPS
  gdpGrowth2024: 5.03, // percent, BPS
  gdpPerCapita2024: 78.62, // Rp million, BPS
  gdpPerCapitaUsd2024: 4960, // US dollars, BPS
  inflationDec2024: 1.57, // percent y-o-y, BPS
  unemploymentAug2024: 4.91, // percent, BPS Sakernas
  labourForceAug2024: 152.11, // million, BPS Sakernas
  employedAug2024: 144.64, // million, BPS Sakernas
  unemployedAug2024: 7.47, // million, BPS Sakernas
  workingAgeAug2024: 215.37, // million, BPS Sakernas
  lfprAug2024: 70.63, // percent, BPS Sakernas
  povertyMar2024: 9.03, // percent, BPS Susenas
  povertyMar2025: 8.47, // percent, BPS Susenas
  poorMar2024: 25.22, // million, BPS Susenas
  poorMar2025: 23.85, // million, BPS Susenas
  giniMar2024: 0.379, // BPS
  giniMar2025: 0.375, // BPS
  exports2024: 264.7, // US$ billion, BPS
  imports2024: 233.65, // US$ billion, BPS
  tradeSurplus2024: 31.04, // US$ billion, BPS / Bank Indonesia
  urbanShare2024: 58.8, // percent, World Bank WDI
  avgWageAug2024: 3.27, // Rp million per month, BPS Sakernas
  formalShareAug2024: 42.05, // percent of employed, BPS Sakernas
  povertyLineMar2025: 609160, // Rp per capita per month, BPS
  extremePovertyMar2025: 0.85 // percent, BPS (US$2.15/day, 2017 PPP)
};

/* Population, million, World Bank WDI. */
export const POPULATION_SERIES = [
  { year: 2015, value: 258.2 }, { year: 2016, value: 261.1 },
  { year: 2017, value: 264.0 }, { year: 2018, value: 266.9 },
  { year: 2019, value: 269.6 }, { year: 2020, value: 271.7 },
  { year: 2021, value: 274.9 }, { year: 2022, value: 275.8 },
  { year: 2023, value: 281.2 }, { year: 2024, value: 283.5 }
];

/* Age structure 2024, percent of population, World Bank WDI. */
export const AGE_STRUCTURE = [
  { group: "0–14 years", value: 24.6 },
  { group: "15–64 years", value: 68.1 },
  { group: "65 years and over", value: 7.3 }
];

/* Real GDP growth, percent, and nominal GDP, Rp trillion, BPS. */
export const GDP_SERIES = [
  { year: 2015, growth: 4.88, nominal: 11526 },
  { year: 2016, growth: 5.03, nominal: 12402 },
  { year: 2017, growth: 5.07, nominal: 13588 },
  { year: 2018, growth: 5.17, nominal: 14839 },
  { year: 2019, growth: 5.02, nominal: 15833 },
  { year: 2020, growth: -2.07, nominal: 15443 },
  { year: 2021, growth: 3.70, nominal: 16970 },
  { year: 2022, growth: 5.31, nominal: 19588 },
  { year: 2023, growth: 5.05, nominal: 20892 },
  { year: 2024, growth: 5.03, nominal: 22139 }
];

/* Share of GDP by sector, 2024, percent, BPS (rounded; Other is the residual). */
export const GDP_SECTORS = [
  { sector: "Manufacturing", value: 19.0 },
  { sector: "Wholesale and retail trade", value: 13.0 },
  { sector: "Agriculture, forestry and fishing", value: 12.5 },
  { sector: "Mining and quarrying", value: 9.8 },
  { sector: "Construction", value: 9.7 },
  { sector: "Information and communication", value: 4.1 },
  { sector: "All other sectors", value: 31.9 }
];

/* Consumer price inflation, December year-on-year, percent, BPS. */
export const INFLATION_SERIES = [
  { year: 2015, value: 3.35 }, { year: 2016, value: 3.02 },
  { year: 2017, value: 3.61 }, { year: 2018, value: 3.13 },
  { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 }
];

/* Merchandise trade, US$ billion, BPS. */
export const TRADE_SERIES = [
  { year: 2020, exports: 163.2, imports: 141.6 },
  { year: 2021, exports: 231.5, imports: 196.2 },
  { year: 2022, exports: 292.0, imports: 237.4 },
  { year: 2023, exports: 258.9, imports: 221.9 },
  { year: 2024, exports: 264.7, imports: 233.7 }
];

/* Open unemployment rate, August, percent, BPS Sakernas. */
export const UNEMPLOYMENT_SERIES = [
  { year: 2015, value: 6.18 }, { year: 2016, value: 5.61 },
  { year: 2017, value: 5.50 }, { year: 2018, value: 5.34 },
  { year: 2019, value: 5.28 }, { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 }, { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 }, { year: 2024, value: 4.91 }
];

/* Labour force, million, August, BPS Sakernas. */
export const LABOUR_SERIES = [
  { year: 2019, labour: 135.86, employed: 128.52, unemployed: 7.34 },
  { year: 2020, labour: 138.22, employed: 128.45, unemployed: 9.77 },
  { year: 2021, labour: 140.15, employed: 131.05, unemployed: 9.10 },
  { year: 2022, labour: 143.72, employed: 135.30, unemployed: 8.42 },
  { year: 2023, labour: 147.71, employed: 139.85, unemployed: 7.86 },
  { year: 2024, labour: 152.11, employed: 144.64, unemployed: 7.47 }
];

/* Share of employed people by sector, August 2024, percent, BPS (rounded; Other is the residual). */
export const EMPLOYMENT_SECTORS = [
  { sector: "Agriculture, forestry and fishing", value: 28.2 },
  { sector: "Wholesale and retail trade", value: 18.9 },
  { sector: "Manufacturing", value: 13.9 },
  { sector: "Construction", value: 8.1 },
  { sector: "Accommodation and food services", value: 6.9 },
  { sector: "All other sectors", value: 24.0 }
];

/* Poverty rate, March, percent, BPS Susenas. */
export const POVERTY_SERIES = [
  { year: 2015, value: 11.22 }, { year: 2016, value: 10.86 },
  { year: 2017, value: 10.64 }, { year: 2018, value: 9.82 },
  { year: 2019, value: 9.41 }, { year: 2020, value: 9.78 },
  { year: 2021, value: 10.14 }, { year: 2022, value: 9.54 },
  { year: 2023, value: 9.36 }, { year: 2024, value: 9.03 },
  { year: 2025, value: 8.47 }
];

/* Gini ratio, March, BPS. */
export const GINI_SERIES = [
  { year: 2019, value: 0.380 }, { year: 2020, value: 0.381 },
  { year: 2021, value: 0.384 }, { year: 2022, value: 0.381 },
  { year: 2023, value: 0.388 }, { year: 2024, value: 0.379 },
  { year: 2025, value: 0.375 }
];

/* Poverty rate by island group, March 2025, percent, BPS Susenas. */
export const POVERTY_BY_ISLAND = [
  { island: "Maluku and Papua", value: 18.90 },
  { island: "Bali and Nusa Tenggara", value: 11.93 },
  { island: "Sulawesi", value: 8.96 },
  { island: "Sumatra", value: 8.22 },
  { island: "Java", value: 7.99 },
  { island: "Kalimantan", value: 5.15 }
];

/* The 38 provinces. Population and land area: BPS mid-2025 estimates.
   Poverty rate and poverty line: BPS Susenas, March 2025. */
export const PROVINCES = [
  { name: "Aceh", capital: "Banda Aceh", region: "Sumatra", pop: 5626000, area: 56835, poverty: 12.33, line: 676247 },
  { name: "North Sumatra", capital: "Medan", region: "Sumatra", pop: 15785800, area: 72438, poverty: 7.36, line: 666546 },
  { name: "West Sumatra", capital: "Padang", region: "Sumatra", pop: 5914300, area: 42108, poverty: 5.35, line: 729806 },
  { name: "Riau", capital: "Pekanbaru", region: "Sumatra", pop: 6811200, area: 89901, poverty: 6.16, line: 713117 },
  { name: "Jambi", capital: "Jambi", region: "Sumatra", pop: 3768500, area: 49023, poverty: 7.19, line: 664127 },
  { name: "South Sumatra", capital: "Palembang", region: "Sumatra", pop: 8928500, area: 86772, poverty: 10.15, line: 581702 },
  { name: "Bengkulu", capital: "Bengkulu", region: "Sumatra", pop: 2138000, area: 20122, poverty: 12.08, line: 683820 },
  { name: "Lampung", capital: "Bandar Lampung", region: "Sumatra", pop: 9522900, area: 33571, poverty: 10.00, line: 612451 },
  { name: "Bangka Belitung Islands", capital: "Pangkal Pinang", region: "Sumatra", pop: 1550800, area: 16690, poverty: 5.00, line: 956833 },
  { name: "Riau Islands", capital: "Tanjung Pinang", region: "Sumatra", pop: 2213500, area: 8170, poverty: 4.44, line: 832410 },
  { name: "Jakarta", capital: "Central Jakarta", region: "Java", pop: 10678000, area: 662, poverty: 4.28, line: 852768 },
  { name: "West Java", capital: "Bandung", region: "Java", pop: 50759000, area: 37053, poverty: 7.02, line: 547752 },
  { name: "Central Java", capital: "Semarang", region: "Java", pop: 38233900, area: 34347, poverty: 9.48, line: 537812 },
  { name: "Yogyakarta", capital: "Yogyakarta", region: "Java", pop: 3781500, area: 3170, poverty: 10.23, line: 626363 },
  { name: "East Java", capital: "Surabaya", region: "Java", pop: 42089300, area: 48056, poverty: 9.50, line: 558029 },
  { name: "Banten", capital: "Serang", region: "Java", pop: 12537400, area: 9356, poverty: 5.63, line: 684232 },
  { name: "Bali", capital: "Denpasar", region: "Lesser Sunda", pop: 4461300, area: 5583, poverty: 3.72, line: 607847 },
  { name: "West Nusa Tenggara", capital: "Mataram", region: "Lesser Sunda", pop: 5731100, area: 19632, poverty: 11.78, line: 556846 },
  { name: "East Nusa Tenggara", capital: "Kupang", region: "Lesser Sunda", pop: 5742600, area: 46378, poverty: 18.60, line: 549607 },
  { name: "West Kalimantan", capital: "Pontianak", region: "Kalimantan", pop: 5766000, area: 147018, poverty: 6.16, line: 622882 },
  { name: "Central Kalimantan", capital: "Palangka Raya", region: "Kalimantan", pop: 2845000, area: 153430, poverty: 5.19, line: 654066 },
  { name: "South Kalimantan", capital: "Banjarbaru", region: "Kalimantan", pop: 4323300, area: 37125, poverty: 3.84, line: 650675 },
  { name: "East Kalimantan", capital: "Samarinda", region: "Kalimantan", pop: 4267600, area: 126952, poverty: 5.17, line: 866193 },
  { name: "North Kalimantan", capital: "Tanjung Selor", region: "Kalimantan", pop: 749400, area: 69901, poverty: 5.54, line: 884970 },
  { name: "North Sulawesi", capital: "Manado", region: "Sulawesi", pop: 2721400, area: 14488, poverty: 6.71, line: 530304 },
  { name: "Central Sulawesi", capital: "Palu", region: "Sulawesi", pop: 3156100, area: 61497, poverty: 10.92, line: 624854 },
  { name: "South Sulawesi", capital: "Makassar", region: "Sulawesi", pop: 9563100, area: 45324, poverty: 7.60, line: 477966 },
  { name: "Southeast Sulawesi", capital: "Kendari", region: "Sulawesi", pop: 2836700, area: 36139, poverty: 10.54, line: 488171 },
  { name: "Gorontalo", capital: "Gorontalo", region: "Sulawesi", pop: 1242200, area: 12025, poverty: 13.24, line: 495576 },
  { name: "West Sulawesi", capital: "Mamuju", region: "Sulawesi", pop: 1525300, area: 16591, poverty: 10.41, line: 475488 },
  { name: "Maluku", capital: "Ambon", region: "Maluku Islands", pop: 1970600, area: 46134, poverty: 15.38, line: 757600 },
  { name: "North Maluku", capital: "Sofifi", region: "Maluku Islands", pop: 1373800, area: 31466, poverty: 5.81, line: 662397 },
  { name: "West Papua", capital: "Manokwari", region: "Papua", pop: 587600, area: 60309, poverty: 20.66, line: 831001 },
  { name: "Southwest Papua", capital: "Sorong", region: "Papua", pop: 636400, area: 39103, poverty: 17.95, line: 812630 },
  { name: "Papua", capital: "Jayapura", region: "Papua", pop: 1073600, area: 81383, poverty: 19.16, line: 714365 },
  { name: "South Papua", capital: "Merauke", region: "Papua", pop: 549700, area: 117859, poverty: 19.71, line: 566052 },
  { name: "Central Papua", capital: "Nabire", region: "Papua", pop: 1492300, area: 61080, poverty: 28.90, line: 817834 },
  { name: "Highland Papua", capital: "Jayawijaya", region: "Papua", pop: 1484900, area: 52509, poverty: 30.03, line: 1132178 }
];

export const RELEASES = [
  { date: "25 Jul 2025", title: "Poverty Profile, March 2025", text: "Poverty rate 8.47%, down from 9.03% in March 2024; 23.85 million poor people." },
  { date: "5 Nov 2025", title: "Labour Situation, August 2025", text: "Open unemployment 4.85%; 7.46 million people unemployed." },
  { date: "5 Feb 2025", title: "Economic Growth, 2024", text: "GDP grew 5.03% in 2024; nominal GDP Rp 22,138.96 trillion." },
  { date: "2 Jan 2025", title: "Consumer Prices, December 2024", text: "Annual inflation 1.57% year-on-year, the lowest in the series." },
  { date: "15 Jan 2025", title: "Trade Balance, December 2024", text: "Full-year 2024 trade surplus US$ 31.04 billion; exports US$ 264.70 billion." }
];

export function density(p) { return p.pop / p.area; }
export function shareOfNational(p) { return (p.pop / (NATIONAL.populationMid2025 * 1e6)) * 100; }
