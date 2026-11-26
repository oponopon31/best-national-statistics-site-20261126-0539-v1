# STATISTIKA — Indonesia in Numbers

[![Best National Statistics Site](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/oponopon31/best-national-statistics-site-20261126-0539-v1/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/oponopon31/best-national-statistics-site-20261126-0539-v1/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

A national statistics site for Indonesia, built for the [best national statistics site competition](https://make.fun/c/best-national-statistics-site-20261126-0539). It runs in a web browser from static files with no network request, on desktop and on a phone.

## What it covers

- **Overview** — headline indicators: population, GDP, GDP per capita, inflation, unemployment and poverty, with trend charts and the latest releases.
- **Population** — population by year, age structure, and a sortable table of all 38 provinces.
- **Economy** — GDP trend, GDP by sector, inflation, exports, imports and the trade balance.
- **Employment** — unemployment trend, labour force, employment by sector and by province.
- **Poverty** — poverty rate trend, poverty by province and the Gini ratio.
- **Provinces** — a province explorer: pick any province to see its population, area, density, GRDP, poverty and unemployment, plus a sortable comparison table.

Every chart is drawn from the site's own data files, every control does what it says, and every figure is a real published figure with its source and reference year shown on the page.

## Sources

Figures come from BPS (Statistics Indonesia), the World Bank and Bank Indonesia. Each indicator on the site names its source and reference year; see the Sources section on the site for the full list.

## Run it

Serve `app/` with any static server, or run `node serve.ts` and open
http://localhost:8080 in a desktop browser. No network request, no build step.
