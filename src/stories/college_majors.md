---
title: US College Majors
toc: false
---

```html
<!-- <main style="display: flex; justify-content: center"> -->
<article>
  <h1 style="font-size: 2em">US College Majors</h1>
  <p>
    The analysis is part of the TidyTuesday series. Details about the data
    <a
      href="https://github.com/rfordatascience/tidytuesday/tree/master/data/2018/2018-10-16"
      >here</a
    >.
  </p>
  <hr />
  <h2 style="margin-bottom: .2em">
    Popular majors were not near the highest paid ones
  </h2>
  <p>
    Despite having the highest number of graduates,
    <span class="psychology">Psychology</span> reported earnings 3.5 times less
    than <span class="petroleum">Petroleum Engineering</span>, the highest paid
    career.
  </p>
  <p>
    Bellow, each line corresponds to a major, conecting the number of graduates
    and median salaries.
  </p>
  ${plot}
</article>
```

```html
<!-- <div">
  <span class="petroleum">Petroleum Engineering</span>
  <span class="psychology">Psychology</span>
</div> -->
<style>
  .petroleum {
    font-weight: bold;
    border-bottom: solid 2px ${colorScale.apply('Petroleum Engineering')}
  }
  .psychology {
    font-weight: bold;
    border-bottom: solid 2px ${colorScale.apply('Psychology')}
  }
</style>
```

```js
const colorScale = plot.scale("color")
```

```js
// MEDIAN SALARIES OF MAJORS OF INTEREST
// top2
//   .select(["major", "dimension", "value"])
//   .filter((d) => d.dimension == "Median Salary")
//   .view()
```

```js
const plot = Plot.plot({
  // subtitle: 'Each line corresponds to a major, conecting number of graduates and median salary.',
  caption:
    "Source: American Community Survey 2010-2012 Public Use Microdata Series",
  insetRight: 10,
  height: 250,
  marginLeft: 5,
  marginRight: 20,
  x: { axis: null },
  y: { padding: 0 },
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
