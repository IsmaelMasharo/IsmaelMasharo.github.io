### Work in Progress

```js
const peruDeps = await FileAttachment(
  "../data/peru_maps/peru_departamental_simp.topojson"
).json()
const population = await FileAttachment(
  "../data/tomo_00_01_wrangled_lonlat.csv"
).csv({ typed: true })

const deps = topojson.mesh(peruDeps, peruDeps.objects.name)
```

```js
const poulationType = view(
  Inputs.radio(
    ["varon_urbano", "mujer_urbano", "varon_rural", "mujer_rural"],
    { label: "Population Type", value: "mujer_urbano" }
  )
)
```

```js
Plot.plot({
  length: {
    // avoid 0 population (urbano) to no length
    transform: (x) => x + 1,
  },
  projection: {
    type: "mercator",
    domain: d3.geoCircle().center([-75.0152, -9.19]).radius(9)(),
    inset: 20,
  },
  marks: [
    Plot.geo(deps, { strokeWidth: 0.3 }),
    Plot.spike(population, { x: "lon", y: "lat", length: poulationType }),
    Plot.tip(population, Plot.pointer({ x: "lon", y: "lat" })),
  ],
})
```
