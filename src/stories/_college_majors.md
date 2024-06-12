---
theme: dark
title: US College Majors
toc: false
---

# US College Majors

The data shown in this page comes from the American Community Survey 2010-2012.
It contains details mainly about college majors, graduates and salaries.

Some basic questions arised when starting to look at the data. Like, which where the majors with most/least graduates? per major category?

```js
const topG = dt
  .select(["graduates", "major", "major_category"])
  .orderby(aq.desc("graduates"))
  .slice(0, 5)
```

<!-- It looks like Psychology and Business related majors were the most popular at the time of the survey. But when looking at how Psychology, the t -->

Psychology was the most popular major at the time of the survey. Nevertheless, it was one of the least paid jobs.



```js
Plot.plot({
  marginLeft: 5,
  maxWidth: 200,
  height: 200,
  // color: { legend: true },
  marks: [
    Plot.barX(topG, {
      x: "graduates",
      y: "major",
      fill: "major",
      sort: { y: "-x" },
    }),
    Plot.axisX({
      anchor: "top",
      ticks: 3,
      label: "Graduates",
      labelAnchor: "left",
      tickSize: 0,
      tickPadding: 2,
      labelOffset: 20,
    }),
    Plot.axisY({
      label: null,
      fontWeight: "600",
      tickSize: 0,
      textAnchor: "start",
      dx: 14,
      fill: "black",
    }),
  ],
})
```

```js
import aq, { op, renameLower } from "../utils/arquero.js"
```

```js
const recentGrads = FileAttachment(
  "../data/538-college-mayor-economic-guide.csv"
).csv({ typed: true })
```

```js
const dt = aq
  .from(recentGrads)
  .rename(renameLower)
  .rename({ total: "graduates", median: "median_salary" })
  .select(
    aq.not([
      "rank",
      "major_code",
      "full_time",
      "part_time",
      "full_time_year_round",
    ])
  )
  .relocate("major_category", { before: 0 })
  .orderby(aq.desc('graduates'))
  .derive({
    rankGrads: op.dense_rank()
  })
  .unorder()
  .orderby(aq.desc('median_salary'))
  .derive({
    rankMedSal: op.dense_rank()
  })
  .unorder()
  .orderby(aq.desc('unemployment_rate'))
  .derive({
    rankUnempRate: op.dense_rank()
  })
  .unorder()

// display(dt.view())
```

```js
const medians = aq.agg(dt, (d) => ({
  medianGrads: op.median(d.graduates),
  medianEarningmedian: op.median(d.median_salary),
}))
```

```js
dt.select([
  'rankGrads',
  'rankMedSal',
  'rankUnempRate',
  "major_category",
  "major",
  "graduates",
  "employed",
  "unemployed",
  "unemployment_rate",
  "median_salary",
]).view({ rows: 5, reverse: true, sort: "median_salary" })
```

```js
const pctiles = dt
  .select([
    "major",
    "major_category",
    "graduates",
    "median_salary",
    "p25th",
    "p75th",
  ])
  .filter((d) => d.graduates)
  .fold(["p25th", "median_salary", "p75th"], {
    as: ["percentile", "value"],
  })
  .orderby("graduates")
```

```js
Plot.plot({
  width,
  grid: true,
  inset: 10,
  x: {
    domain: pctiles.dedupe("major").array("major"),
    grid: false,
  },
  y: { type: "log" },
  color: {
    domain: [false, true],
    range: ["#555", "var(--theme-foreground-focus)"],
  },
  marks: [
    Plot.axisX({ anchor: "bottom", tickRotate: 45 }),
    Plot.lineY(pctiles, {
      x: "major",
      y: "value",
      stroke: (d) => d.percentile === "median_salary",
      strokeWidth: { channel: "stroke" },
      marker: true,
      // tip: true,
      channels: {
        median: (d) => d.percentile === "median_salary",
      },
      tip: {
        format: {
          stroke: false,
          z: false,
          median: true,
        },
      },
      curve: "monotone-y",
    }),
  ],
})
```

```js
Plot.plot({
  width,
  grid: true,
  inset: 10,
  x: { type: "log" },
  y: { type: "log" },
  color: {
    domain: [false, true],
    range: ["#555", "var(--theme-foreground-focus)"],
  },
  marks: [
    Plot.lineY(pctiles, {
      x: "graduates",
      y: "value",
      z: "percentile",
      stroke: (d) => d.percentile === "median_salary",
      tip: true,
      curve: "monotone-y",
      // filter: d => d.graduates > 200 // no altera el dominio
      marker: true,
    }),
  ],
})
```

```js
Plot.plot({
  width,
  grid: true,
  inset: 10,
  x: { type: "log" },
  y: { type: "log" },
  r: { range: [2, 25] },
  marks: [
    Plot.dot(dt, {
      x: "graduates",
      y: "median_salary",
      r: "sample_size",
      fill: "major",
      stroke: "black",
      tip: true,
    }),
    Plot.ruleX([medians.medianGrads]),
    Plot.ruleY([medians.medianEarningmedian]),
  ],
})
```

---

## Scrap Work

```js
const pcts = dt
  .select(["major", "major_category", "graduates", "median_salary"])
  .groupby("major_category")
  .rollup({
    graduates: (d) => op.sum(d.graduates),
    medOfMedianSalaries: (d) => op.median(d.median_salary),
  })
  .derive({
    pctGrads: (d) => d.graduates / op.sum(d.graduates),
    // this step doesn't make any sense xd
    pctSalaries: (d) =>
      d.medOfMedianSalaries / op.sum(d.medOfMedianSalaries),
  })
  .orderby("pctGrads")

const pctFold = pcts
  .fold(["pctGrads", "pctSalaries"], {
    as: ["type", "value"],
  })
  .orderby(["type"])
```

```js
Plot.plot({
  height: 800,
  y: { axis: null },
  x: {
    domain: ["pctGrads", "pctSalaries"],
    axis: "top",
    label: null,
    tickSize: 0,
    padding: 0.1,
  },
  marks: [
    Plot.areaY(
      pctFold,
      Plot.stackY({
        x: "type",
        y: "value",
        fill: "major_category",
        curve: "bump-x",
        stroke: "white",
      })
    ),
    Plot.text(
      pctFold,
      Plot.stackY({
        x: "type",
        y: "value",
        text: "major_category",
        filter: (d) => d.type === "pctGrads",
        textAnchor: "start",
        fill: "white",
        fontWeight: "bold",
        dx: +8,
      })
    ),
  ],
})
```
