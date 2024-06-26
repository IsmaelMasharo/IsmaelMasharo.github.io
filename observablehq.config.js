// See https://observablehq.com/framework/config for documentation.
export default {
  // The project’s title; used in the sidebar and webpage titles.
  title: "Ismael Vargas",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {
      name: "Posts",
      open: true,
      // path: "/stories/",
      pages: [
        {name: "US College Majors", path: "/stories/college_majors"},
        {name: "My Spotify Dashboard", path: "/stories/spotify_history"},
        {name: "Predicting Board Game Ratings", path: "/stories/boardgame_ratings"},
        {name: "Peru Population Map", path: "/stories/peru_census_2017"},
      ]
    },
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="assets/ismael-favicon.png" type="image/png" sizes="32x32">',

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  theme: "dark", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  footer: `Built with <a href="https://observablehq.com/">Observable</a>.`, // what to show in the footer (HTML)
  // sidebar: true, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  pager: true, // whether to show previous & next links in the footer
  output: "dist", // path to the output root for build
  // search: true, // activate search
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // cleanUrls: true, // drop .html from URLs
};
