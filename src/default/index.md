---
sql:
  events: ../data/events.json
---

# Helpfull notes 

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

---

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

