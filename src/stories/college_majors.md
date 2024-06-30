---
title: US College Majors
toc: false
---

#  Popular majors in the US were not near the highest paid ones

Despite having the highest number of graduates,
<span class="psychology">Psychology</span> reported earnings 3.5 times less
than <span class="petroleum">Petroleum Engineering</span>, the highest paid
career.

_Lines represent majors, connecting total graduates and median salaries._

```html
<style>
  .petroleum {
    font-weight: bold;
    border-bottom: solid 2px ${topMColors[0]}
  }
  .psychology {
    font-weight: bold;
    border-bottom: solid 2px ${topMColors[1]}
  }
</style>
```

```js
Plot.plot({
  caption: html`Source: American Community Survey 2010-2012 Public Use Microdata
    Series. Curated by the social data project
    <a
      href="https://github.com/rfordatascience/tidytuesday/tree/master/data/2018/2018-10-16"
      >#Tidytuesday</a
    >.`,
  insetRight: 10,
  height: 250,
  marginLeft: 5,
  marginRight: 20,
  x: { axis: null },
  y: { padding: 0 },
  color: {
    domain: topMajors,
    range: topMColors,
  },
  marks: [
    Plot.axisY({
      label: null,
      tickPadding: 9,
      tickSize: 0,
      fontWeight: "600",
      tickSize: 0,
      textAnchor: "start",
      tickFormat: (x) => `${x} →`,
      dx: 6,
      dy: -12,
    }),
    Plot.ruleY(cols, { strokeWidth: 0.1 }),
    Plot.line(dtFold, {
      x: (d) => scls.get(d.dimension)(d.value),
      y: "dimension",
      z: "major",
      strokeWidth: 0.5,
      strokeOpacity: 0.1,
    }),
    Plot.line(top, {
      x: (d) => scls.get(d.dimension)(d.value),
      y: "dimension",
      z: "major",
      stroke: "major",
      strokeWidth: 2,
    }),
    Plot.text(colTicks, {
      x: (d) => scls.get(d.dimension)(d.value),
      y: "dimension",
      text: "value",
      fill: "white",
    }),
  ],
})
```

<!-- HELPERS -->

```js
import aq, { op } from "../utils/arquero.js"
import { Observable10 } from "../utils/constants.js"
```

```js
const data = FileAttachment("../data/college-majors.csv").csv({ typed: true })
const cols = ["Graduates", "Median Salary"]
const topMajors = ["Petroleum Engineering", "Psychology"]
const topMColors = [Observable10[0], Observable10[1]]
```

```js
const dt = aq.from(data).rename({ total: "Graduates", median: "Median Salary" })
const dtFold = dt.fold(cols, { as: ["dimension", "value"] })
const top = dtFold.filter(aq.escape((d) => topMajors.includes(d.major)))
```

```js
const scls = new Map(
  cols.map((dimension) => [
    dimension,
    d3.scaleLinear().domain([0, aq.agg(dt, op.max(dimension))]),
  ])
)

const colTicks = cols.flatMap((dimension) => {
  return scls
    .get(dimension)
    .ticks(7)
    .map((value) => ({ dimension, value }))
})
```
