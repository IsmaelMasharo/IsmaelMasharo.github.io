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
plot
```

```js
const plot = Plot.plot({
  width,
  height: 250,
  marginLeft: 72,
  marginRight: 20,
  x: { axis: null },
  y: {
    padding: 0,
    label: null,
    tickPadding: 9,
    tickSize: 0,
  },
  marks: [
    Plot.ruleY(cols, { strokeWidth: 0.1 }),
    Plot.line(dtFold, {
      x: (d) => scls.get(d.dimension)(d.value),
      y: "dimension",
      z: "major",
      strokeWidth: 0.5,
      strokeOpacity: 0.1,
      tip: true,
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
  .select(["major_category", "major", ...cols])
  .fold(cols, { as: ["dimension", "value"] })
```

```js
const top2 = dt
  .select(["major_category", "major", ...cols])
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
  .objects()
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
