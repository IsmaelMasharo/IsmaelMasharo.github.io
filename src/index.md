---
toc: false
---

```js
import { longList } from "/components/tools.js"
import { csvParse, utcParse } from "npm:d3"
```

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
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
    font-size: 4em;
  }
  .hero h2 {
    font-size: 1.2em;
  }
}

@media (min-width: 1000px) {
  .my-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

</style>

```html
<div class="hero">
  <h1>Hi, I'm Ismael<br>Data Explorer</h1>
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

```html
<div
  class="grid my-grid-cols-2"
  style="grid-auto-rows: auto;"
>
  <div
    class="card"
    style="padding: 20px"
  >
    <h2>My Employment History 💼</h2>
    <h3>
      I gravitated towards data and technology since graduated from college.
    </h3>
    <div>${ resize(jobsPlot) }</div>
  </div>
  <div
    class="card"
    style="padding: 20px; overflow: hidden"
  >
    <h2>Skills in my Toolbelt 🛠️</h2>
    <h3>Some of my favorite ones and the ones I frequently use.</h3>
    <div style="padding: 2em">${longList(tools)}</div>
  </div>
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

<!-- PREVIOUS POSTS METADATA -->

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

<!-- JOBS METADATA -->

```js
const jobExp = [
  {
    start: "Sep 2023",
    end: "Jun 2024",
    at: "Freelance",
    sector: "Education, eLearning",
    jobTitle: "Freelance",
    shortDescription:
      "A mix of Data, Web, and Business related tasks, developing new abilities while traveling around Latam.",
    description: ["Design", "Photography"],
    skills: [
      "Figma",
      "Wordpress",
      "Adobe Premiere",
      "Hotmart",
      "Photography",
      "Product Live Launch",
    ],
  },
  {
    start: "Apr 2021",
    end: "Aug 2023",
    at: "Prey",
    sector: "Device and Data Security",
    jobTitle: "UX Data Analyst",
    shortDescription:
      "Analyzed user behavior, developed business metrics, and communicated insights to support a product-led conversion strategy.",
    description: [
      "Conducted user behavior analysis, driving insights for onboarding redesign and product tier optimization to support a product-led conversion strategy.",
      "Analyzed user engagement, retention, and conversion funnels using Python and Postgresql, documenting and communicating key findings.",
      "Collaborated with the product team by proposing design alternatives in Figma and validating them through A/B testing.",
      "Interviewed internal clients to gather data requirements, prototyping, and crafting visualizations using PowerBI and JavaScript to enable data-driven decision-making.",
      "Led the implementation of event tagging for user interactions within a React app, enabling comprehensive event tracking in Mixpanel.",
      "Evaluated emerging technologies, including BI as code, high-performance databases, and LLMs, to accelerate query and visualization loading times, enhancing developer and user experience.",
      ,
    ],
    skills: [
      "Statistics",
      "Storytelling",
      "UX",
      "Power BI",
      "Machine Learning",
      "Dbt",
      "A/B testing",
      "Mixpanel",
      "R",
      "Python",
      "SQL",
      "Excel",
      "JavaScript",
    ],
  },
  {
    start: "Jun 2020",
    end: "Mar 2021",
    at: "La Posititiva Seguros",
    sector: "Insurance",
    jobTitle: "Beckend Engineer",
    shortDescription:
      "Explored new solutions as part of the Digital Transformation Lab team to improve user experience.",
    description: [
      "Designed custom visualizations using D3, React, and TypeScript, refining marketing metrics tracked within the dashboards.",
      "Leveraged BigQuery to unlock deeper insights beyond default Firebase and Google Analytics reports, enabling exploration of a broader range of business questions.",
      "Built responsive email templates using SendGrid and integrated Twilio's API for push notifications in our mobile apps, supporting personalized and automated communication.",
      "Deployed Docker applications on AWS instances, implementing testing and deployment strategies for performance and scalability.",
    ],
    skills: [
      "Docker",
      "Python",
      "JavaScript",
      "D3",
      "SQL",
      "Figma",
      "GCP",
      "SCRUM",
      "Git",
    ],
  },
  {
    start: "Sep 2018",
    end: "Mar 2020",
    at: "Urbaner",
    sector: "Logistics",
    jobTitle: "Software Engineer",
    shortDescription:
      "Implemented a real-time delivery tracking app featuring live maps to visualize on-demand deliveries.",
    description: [
      "Implemented a real-time delivery tracking app using React, Django, and WebSockets, featuring live maps to visualize on-demand deliveries.",
      "Developed new features to optimize delivery management for B2C and B2B customers, conducting unit tests to ensure functionality and quality before launch.",
      "Enhanced the application to ensure robustness against new time zones in preparation for the company's expansion to new countries.",
      "Analyzed geospatial data in NoSQL databases to visualize areas with higher concentrations of orders using Plotly and Mapbox, contributing to increased order completion rates.",
    ],
    skills: [
      "AWS",
      "Django",
      "React",
      "PostgreSQL",
      "Backend - Frontend",
      "DataBase Modeling",
      "Software Architectural Design",
      "SQL",
      "Python",
      "JavaScript",
      "SCRUM",
      "Git",
    ],
  },
  {
    start: "Feb 2018",
    end: "Jul 2018",
    at: "Magia Digital",
    sector: "Crypto Trading",
    jobTitle: "Full Stack Developer Intern",
    shortDescription:
      "Developed a Cryptocurrency Trading Exchange app, handling visualizations of real-time stock changes.",
    description: "",
    skills: ["Flask", "Python", "React", "JavaScript", "HTML", "CSS"],
  },
  {
    start: "Aug 2017",
    end: "May 2018",
    at: "Pontificia Universidad Católica del Perú",
    sector: "Food, Agroindustrial",
    jobTitle: "Research Assistant",
    shortDescription:
      "Researched and designed a computer vision algorithms for a state-funded project about meat quality control.",
    skills: [
      "Statistics",
      "Research",
      "Data Analysis",
      "Computer Vision",
      "Python",
      "C++",
      "Excel",
      "Arduino",
    ],
  },
]
```

<!-- TOOLS  -->

```js
const tools = csvParse(
  `category,tool,order
Data,PowerBI,1
Developer,React,2
Developer,Python,2
Data,Jupyter,1
Data,R,1
Data,RStudio,1
Data,Excel,1
Data,PostgreSQL,1
Developer,D3,1
Design,Figma,3
Analytics,Statistics,5
Data,Streamlit,1
Design,Storytelling,4
Data,DBT,1
Analytics,Data Science,5
Data,A/B Testing,1
Developer,GIT,2
Data,SQL,1
Design,UX,3
Analytics,Research,5
Developer,AWS,2
Developer,Django,2
Data,Pandas,1
Developer,Javascript,2
Data,Dyplr,1
Data,Vega-Lite,1
Developer,Tailwind,2
Data,Observable Plot,1
Design,SCRUM,3
Data,ggplot,1
Developer,HTML,2
Data,seaborn,1
Data,scypy,1
Developer,CSS,1
Analytics,Machine Learning,5
`
)
```

<!-- VISUALIZATIONS  -->

```js
const dateParser = utcParse("%b %Y")
const jobExpD = jobExp.map((d) => ({
  ...d,
  start: dateParser(d.start),
  end: dateParser(d.end),
}))

const jobsPlot = (width) =>
  Plot.plot({
    width,
    height: 280,
    marginLeft: 100,
    y: { axis: null, padding: 0.4 },
    x: {
      axis: "top",
      grid: true,
    },
    marks: [
      Plot.barX(jobExpD, {
        x1: "start",
        x2: "end",
        y: "jobTitle",
        sort: { y: "-x1" },
        fill: 'at',
        rx: 4
      }),
      Plot.text(jobExpD, {
        x: "start",
        y: "jobTitle",
        text: "jobTitle",
        textAnchor: "end",
        dx: -3,
        fontSize: 10.5
      }),
      Plot.tip(
        jobExpD,
        Plot.pointer({
          x1: "start",
          x2: "end",
          y: "jobTitle",
          sort: { y: "-x1" },
          title: (d) => `${d.at}\n\n${d.shortDescription}`,
          fontSize: 14,
          lineHeight: 1.2
        })
      ),
    ],
  })
```