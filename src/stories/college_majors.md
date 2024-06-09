---
theme: dark
title: US College Majors
toc: false
---

```js
import aq from "../utils/arquero.js"
```

```js
const recentGrads = FileAttachment(
  "../data/538-college-mayor-economic-guide.csv"
).csv({ typed: true })
```

```js
Inputs.table(recentGrads)
```

```js
const medians = aq
  .from(recentGrads)
  .rollup({
    medianGrads: aq.op.median("Total"),
    medianEarningmedian: aq.op.median("Median"),
  })
  .objects()[0]
```

```js
Plot.plot({
  grid: true,
  inset: 10,
  x: { type: "log" },
  y: { type: "log" },
  marks: [
    Plot.dot(recentGrads, {
      y: "Total",
      x: "Median",
      tip: true,
      fill: "Major_category",
      stroke: "black",
    }),
    Plot.ruleX([medians.medianEarningmedian]),
    Plot.ruleY([medians.medianGrads]),
  ],
})
```

```js
aq.from(recentGrads)
  .rollup({
    medianGrads: aq.op.median("Total"),
    medianEarningmedian: aq.op.median("Median"),
  })
  .view({ maxWidth: 400 })
```

