---
toc: false
---

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 4rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  padding: .5rem;
  margin: 2rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 1em;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-alt);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
  .hero h2 {
    font-size: 1.2em;
  }
}

</style>

```html
<div class="hero">
  <h1>Hi, I'm Ismael</h1>
  <h2>
    I think about
    <span style="border-bottom: solid 2px #4269d0;">data</span> and use
    <span style="border-bottom: solid 2px #efb118;">code</span> to reshape its
    complexity into practical knowledge and
    <span style="border-bottom: solid 2px #ff725c;">visual</span>
    representations.
  </h2>
</div>
```

---

<div style="font-family: sans-serif; margin-top: 4rem;">
  <p>
  This is my new portafolio, I'm migrating the old one... In the meantime
  check out some of my previous Data Visualization and Data Science proyects 👇.
  </p>
  <br>
</div>

```js
previews(posts)
```

```js
function previews(notebooks) {
  return html`<div
    style="display: grid; grid-gap: .875rem; grid-template-columns: repeat(auto-fill, minmax(250px, 5fr));"
  >
    ${notebooks.map(preview)}
  </div>`
}

function preview({ path, title, author = "Ismael Vargas", thumbnail }) {
  // onmouseover=${(event) =>
  //   (event.currentTarget.firstElementChild.style.borderColor = "#1b1e23")}
  // onmouseout=${(event) =>
  //   (event.currentTarget.firstElementChild.style.borderColor = "#e8e8e8")}

  return html`<a
    href="${encodeURI(path)}"
    target="_blank"
    title="${title} by ${author}"
    style="
      display: inline-flex; 
      flex-direction: column; 
      align-items: start; 
      font: 400 .75rem var(--sans-serif); 
      color: var(--theme-foreground); 
      width: 100%;"
  >
    <div
      style="
        border: solid 1px #e8e8e8; 
        border-radius: 4px; 
        box-sizing: border-box; 
        width: 100%; 
        padding-top: 62.5%; 
        background-size: cover; 
        background-image: url(${encodeURI(thumbnail)});"
    ></div>
    <div
      style="
        width: 100%; 
        white-space: nowrap; 
        text-overflow: ellipsis; 
        overflow: hidden;"
    >
      ${title}
    </div>
  </a>`
}
```

```js
const posts = [
  {
    path: "https://observablehq.com/@ismaelmasharo/elecciones-internas-en-peru-2020",
    thumbnail: FileAttachment("assets/thumbnails/elecciones-internas.png").href,
    title: "2020 Internal Elections in Peru",
  },
  {
    path: "https://observablehq.com/@ismaelmasharo/school-workforce-gender-wage-gap-in-england",
    thumbnail: FileAttachment("assets/thumbnails/wage-gap.png").href,
    title: "School Workforce Gender Wage Gap in England",
  },
  {
    path: "https://medium.com/@ismaelmasharo/10-years-of-stack-overflow-surveys-c8ff3f662b2f",
    thumbnail: FileAttachment("assets/thumbnails/job-satisfaction.png").href,
    title: "Ten Years of Stack Overflow Surveys",
  },
  {
    path: "https://medium.com/analytics-vidhya/cohort-analysis-95a794b4e58c",
    thumbnail: FileAttachment("assets/thumbnails/cohort-tables.png").href,
    title: "Interactive Cohort Tables with Python",
  },
  {
    path: "https://github.com/IsmaelMasharo/udacity-dsnd-projects/blob/master/image_classifier/Image%20Classifier%20Project.ipynb",
    thumbnail: FileAttachment("assets/thumbnails/flower-classifier.png").href,
    title: "Image Flower Classification",
  },
  {
    path: "https://github.com/IsmaelMasharo/udacity-dsnd-projects/blob/master/identifying-potential-customers/customer_segments_analysis.ipynb",
    thumbnail: FileAttachment("assets/thumbnails/kmeans-elbow.png").href,
    title: "Identifying Customer Segments",
  },
]
```
