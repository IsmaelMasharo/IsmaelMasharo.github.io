---
sql:
  events: ../data/events.json
---

# Helpfull notes 
Related to Framework and Plot.

---

## Directives

### echo 
runs and shows the code.

```js echo
1 + 2
```

### run=false
show the codeblock without executing.

```js run=false
1 + 2
```

### echo run=false
same output as run=false

```js echo run=false
1 + 2
```

### SQL display - id
- **display**: show the table.
- **id**: to reference the output. *top6* in this example.

```sql echo run=false
SELECT * FROM events ORDER BY y DESC LIMIT 6
```

```sql id=top6 display 
SELECT * FROM events ORDER BY y DESC LIMIT 6
```

```js echo
top6
```

### Generators

The id of the input element can be referenced in other blocks.
In js it is actually a dom element object. But it can only be referenced if the html is written at top level, i mean, not being inside a ```html block```

**Input 1** using html codeblock (unable to be referenced):

```html
<input id="nameInput">
```

**Input 2** directly in the markdown:

<input id="nameInput">

**Input 2** can be referenced. Is a js object (dom object)

```js echo
// nameInput: id of the Input 2: <input id="nameInput">
Object.getPrototypeOf(nameInput)
```

Using **Input 2** to contruct a generator:

```js echo
const name = Generators.input(nameInput);
```

Every time **Input 2** changes it is reflected everywhere else:

```js echo
name
```

---

## Plot Transforms

```js echo
const rndUI = d3.randomInt(50, 100)
const numbers = Array.from({length: 50}, rndUI)
display(numbers)
```

### [Channel definition transform (1)](https://observablehq.com/plot/features/marks#mark-options)
It accepts the whole data. Runs once.
In the example bellow the data is an array so every array method can be applied. If it where an object, then object methods could be applied.

```js echo
// Original data times 10
Plot.dot(
  numbers, { 
    x: { transform: (data) => data.map((x) => x * 10) } 
  }
).plot()
```

This returns the same data:

```js echo
Plot.dot(
  numbers, { 
    x: { transform: (data) => data } 
  }
).plot()
```

And its analogious to use *Plot.identity*, which refers to the original data passed to the Mark to avoid making a copy (it seems that is somthing internal of Plot, to avoid duplication).

```js run=false
Plot.dot(numbers, { x: Plot.identity }).plot()
```

### [Scale Transform (3)](https://observablehq.com/plot/features/scales#scale-transforms)
I'm not sure. In the case bellow it is applying a scale transformation after the binning (stat transform - ggplot). So this scale transform will be something of a coord tranform of ggplot? Since it is not applying it before the stat, but after.

Although in the documentation they say that Mark Transforms (bellow) **tipycally** consume values **before** they are pass through scales. So in general it seems that its a different model from ggplot, since in ggplot first the scale makes transformations and then the stats transforms are applied.

```js echo
Plot.plot({
  width: width / 2.5,
  aspectRatio: 1,
  y: {percent: true}, // proportion [0, 1] to percent [0, 100]
  marks: [
    Plot.rectY(numbers, 
      Plot.binX({y: "proportion"}, {x: Plot.identity})
    ),
  ]
})
```

They say **tipycally** because, for instance, the **interval** Scale Transform also applies to the Mark Transform, meaning that the interval transform should technically be classified as a Mark transform. However, for convenience, it is promoted to the scale transform so that all Mark transforms can use it. (At least that what i understand).

So, the Scale Transform could be applied in different stages:
- Generally **after** Mark Tranforms.
- After the Mark Transform (*percent*)
- Before the Mark Transform (*interval*), so every Mark Transform is aware.

In the docs they say this:

> While the example above relies on the interval being promoted to the scale’s transform, the stack, bin, and group transforms are also interval-aware: they apply the scale’s interval, if any, before grouping values. (This results in the interval being applied twice, both before and after the mark transform, but the second application has no effect since interval application is idempotent.)

What I interpret is that the scale when *interval* transform is specified also applies the axis to that resolution. So it modifying axes as well. Ggplot handles this separatily.

In conclusion: 
- applied after only for display of the data. [See ggplot differs](https://stackoverflow.com/questions/68704617/ggplot2-scale-versus-coord-transform).
- scales don't modify the data before transforms (where as ggplot does), but only change the appearence of the display.

```js
const scaleType = view(Inputs.radio(['linear', 'log'], {value: 'linear', label: "Scale Type"}));
```

```js echo
Plot.plot({
  x: { type: scaleType, domain: [1, 10] },
  marks: [
    Plot.dot([1, 10], Plot.groupZ({x: 'mean'}, {x: Plot.identity}))
  ]
})
```

In the above example, in ggplot the scales modify the data prior transformations, 
so the mean would have been calculated [in the log domain](https://stackoverflow.com/questions/68704617/ggplot2-scale-versus-coord-transform).

```r
ggplot(my_data, aes(y = y, x = 1)) +
  geom_point(stat = "summary", fun = "mean") +
  scale_y_log10()

# the result would have been 3.16 here, not 5.5.
```

### Mark Transform (2)
This is different from channel transform, its applied to mark Level. The docs say that this is for data wrangling basically.

