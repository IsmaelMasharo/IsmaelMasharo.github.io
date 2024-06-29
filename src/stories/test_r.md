```js
const data = await FileAttachment("../data/college-majors.csv").csv(
  { typed: true }
)

display(Inputs.table(data))
```