import * as Plot from "../../_npm/@observablehq/plot@0.6.15/_esm.js"

export function TopLevel(
  data,
  { x = "value", y = "level", fill = "var(--theme-foreground)", limit = 10, ...options } = {}
) {
  return Plot.plot({
    ...options,
    marginLeft: 5,
    marks: [
      Plot.barX(data, {
        x,
        y,
        fill,
        sort: { y: "-x", limit },
        rx: 4
      }),
      Plot.axisX({
        anchor: "top",
        ticks: 3,
        label: "Times",
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
}
