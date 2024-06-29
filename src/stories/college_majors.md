---
title: US College Majors
toc: false
---

<h1 style="margin-bottom: .2em">
  Popular majors in US were not near the highest paid ones
</h1>
<p>
  Despite having the highest number of graduates,
  <span class="psychology">Psychology</span> reported earnings 3.5 times less
  than <span class="petroleum">Petroleum Engineering</span>, the highest paid
  career.
</p>

*Lines represent majors, connecting total graduates and median salaries.*

```html
<style>
  .petroleum {
    font-weight: bold;
    border-bottom: solid 2px ${petroleum}
  }
  .psychology {
    font-weight: bold;
    border-bottom: solid 2px ${psychology}
  }
</style>
```

```js
import { Observable10 } from '../utils/constants.js'
const petroleum = Observable10[0]
const psychology = Observable10[1]
```

```js
Plot.plot({
  caption: html`Source: American Community Survey 2010-2012 Public Use Microdata Series. Curated by the social data project
  <a href="https://github.com/rfordatascience/tidytuesday/tree/master/data/2018/2018-10-16"
      >#Tidytuesday</a>.`,
  insetRight: 10,
  height: 250,
  marginLeft: 5,
  marginRight: 20,
  x: { axis: null },
  y: { padding: 0 },
  color: {
    domain: ["Psychology", "Petroleum Engineering"],
    range: [psychology, petroleum]
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
    Plot.line(top2, {
      x: (d) => scls.get(d.dimension)(d.value),
      y: "dimension",
      z: "major",
      stroke: "major",
      strokeWidth: 1.5,
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
import aq, { op, renameLower } from "../utils/arquero.js"
import { toTitleCase } from "../utils/strings.js"
```

```js
const data = FileAttachment("../data/538-college-mayor-economic-guide.csv").csv(
  { typed: true }
)
```

```js
const cols = ["Graduates", "Median Salary"]
```

```js
const dt = aq
  .from(data)
  .filter((d) => d.Total)
  .rename(renameLower)
  .rename({ total: "Graduates", median: "Median Salary" })
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
  .derive({
    major: aq.escape((d) => toTitleCase(d.major).replace("And", "&")),
  })
```

```js
const dtFold = dt
  .select(["major", ...cols])
  .fold(cols, { as: ["dimension", "value"] })
```

```js
const top2 = dt
  .select(["major", ...cols])
  .orderby(aq.desc("Graduates"))
  .derive({
    rankGrads: op.dense_rank(),
  })
  .unorder()
  .orderby(aq.desc("Median Salary"))
  .derive({
    rankMedSal: op.dense_rank(),
  })
  .unorder()
  .derive({
    maxRankGrads: op.max("rankGrads"),
    maxRankMedSal: op.max("rankMedSal"),
  })
  .filter((d) => d.rankMedSal === 1 || d.rankGrads === 1)
  .fold(cols, { as: ["dimension", "value"] })
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
