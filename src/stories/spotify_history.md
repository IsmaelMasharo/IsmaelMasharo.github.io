---
title: My Spotify History
toc: false
theme: dashboard
---

```js
import aq, { op, renameLower } from "../utils/arquero.js"
import { TopLevel } from "../components/topLevelPlot.js";
import { Trend } from "../components/trend.js";
```

```js
const data = FileAttachment("../data/spotify-2023.parquet").parquet()
```

```js
const dt = aq
  .fromArrow(data)
  .derive({ stop_dttm: (d) => op.parse_date(d.stop_dttm) })
  .rename({ stop_dttm: "date" })
```

```js
const dttm = (d) =>
  op.datetime(op.year(d.date), op.month(d.date), d.date(d.date))

const gpdt = dt.groupby({ date: dttm })
  .rollup({
    dsongs: (d) => op.distinct(d.song),
    dartists: (d) => op.distinct(d.artist),
    dalbums: (d) => op.distinct(d.album),
  })
```

```js
const songs = aq.agg(dt, (d) => op.distinct(d.song))
const artists = aq.agg(dt, (d) => op.distinct(d.artist))
const albums = aq.agg(dt, (d) => op.distinct(d.album))
```

```js
const trends = gpdt
  .orderby(aq.desc("date"))
  .slice(0, 7)
  .filter(d => d.date == op.max(d.date) || d.date == op.min(d.date))
  .derive({
    tsong: d => (op.first_value(d.dsongs) - op.last_value(d.dsongs)) / op.last_value(d.dsongs),
    tartist: d => (op.first_value(d.dartists) - op.last_value(d.dartists)) / op.last_value(d.dartists),
    talbum: d => (op.first_value(d.dalbums) - op.last_value(d.dalbums)) / op.last_value(d.dalbums),
  })
  .select(aq.not(aq.startswith("d")))
  .dedupe()
  .object()
```

```html
<h1 style="font-family: sans-serif; display: flex; align-items: center">
  <svg xmlns="http://www.w3.org/2000/svg" style="width: 32px; height: 32px; margin-right: 10px;" viewBox="0 0 496 512">
    <path fill="var(--theme-spotify)" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"/>
    <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z"/>
</svg>
  <span>My Spotify History</span> 
</h1>
<div class="grid grid-cols-3">
  <div class="card">
    <h2>Songs</h2>
    <span class="big">${songs}</span>
    ${Trend(trends.tsong, {format: {style: "percent"}})}
    <span class="muted">over 7d</span>
  </div>
  <div class="card">
    <h2>Artists</h2>
    <span class="big">${artists}</span>
    ${Trend(trends.tartist, {format: {style: "percent"}})}
    <span class="muted">over 7d</span>
  </div>
  <div class="card">
    <h2>Albums</h2>
    <span class="big">${albums}</span>
    ${Trend(trends.talbum, {format: {style: "percent"}})}
    <span class="muted">over 7d</span>
  </div>
  <!-- <div class="card">
    <h2>Songs</h2>
    <span class="big">${songs}</span>
    ${Trend(trends.tsong, {format: {style: "percent"}})}
    <span class="muted">over 7d</span>
  </div> -->
</div>
```

```html
<div class="grid grid-cols-3">
  <div class="card grid-colspan-2">
    <h2>Listening Over Time</h2>
    <h3>
      7d <b style="color: var(--theme-spotify);">—</b> moving average
    </h3>
    ${resize((width) => lnplot(width))}
  </div>
  <div class="card ">
    <h2>Top 20 Songs</h2>
    <h3>Boy have I changed</h3>
    ${resize((width) => TopLevel(
      dt.groupby("song").count({ as: "value" }), 
      { width, y: 'song', limit: 20, fill: "var(--theme-spotify)"})
    )}
  </div>
</div>
```

```js
const tmFormat = d3.utcFormat("%B %d, %Y")
const lnplot = (width) =>
  Plot.plot({
    width,
    height: 450,
    round: true,
    marks: [
      Plot.axisY({ anchor: "right", label: null }),
      Plot.areaY(gpdt, {
        x: "date",
        y: "dsongs",
        curve: "step",
        fillOpacity: 0.2,
      }),
      Plot.ruleY([0]),
      Plot.lineY(
        gpdt,
        Plot.windowY(
          { k: 7, anchor: "start", strict: true },
          {
            channels: {
              date: {
                value: "date",
                label: "Date:"
              },
              total: {
                value: "dsongs",
                label: "Total:"
              }
            },
            tip: {
              format: {
                date: d => tmFormat(d),
                total: true,
                x: false,
                y: false
              }
            },
            x: "date",
            y: "dsongs",
            stroke: "var(--theme-spotify)",
            curve: "basis",
          }
        )
      ),
    ],
  })
```

<style>
  :root {
    --theme-spotify: #1ed760;
  }
</style>