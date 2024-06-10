---
theme: dark
title: US College Majors
toc: false
---

```js
import aq, { renameLower } from "../utils/arquero.js"
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

display(dt.view())
```

```js
const medians = aq.agg(dt, (d) => ({
  medianGrads: aq.op.median(d.graduates),
  medianEarningmedian: aq.op.median(d.median_salary),
}))
```

```js
Plot.plot({
  grid: true,
  inset: 10,
  x: { type: "log" },
  y: { type: "log" },
  marks: [
    Plot.dot(dt, {
      y: "graduates",
      x: "median_salary",
      tip: true,
      fill: "major_category",
      stroke: "black",
    }),
    Plot.ruleX([medians.medianEarningmedian]),
    Plot.ruleY([medians.medianGrads]),
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
    graduates: (d) => aq.op.sum(d.graduates),
    medOfMedianSalaries: (d) => aq.op.median(d.median_salary),
  })
  .derive({
    pctGrads: (d) => d.graduates / aq.op.sum(d.graduates),
    pctSalaries: (d) =>
      d.medOfMedianSalaries / aq.op.sum(d.medOfMedianSalaries),
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
