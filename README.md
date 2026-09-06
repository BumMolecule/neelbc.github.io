# neelbc.github.io

Personal site of Neeloy Bhattacharya — live at **[https://bummolecule.github.io/neelbc.github.io/](https://bummolecule.github.io/neelbc.github.io/)**.

## Structure

```
.
├── index.html            Home (About + Projects)
├── blogs.html            Reading Room (SciML resources, Notion, philosophy)
├── buzzing.html          Google Slides gallery
├── contact.html          Contact links
├── 404.html              Custom not-found page
├── partials/             Header / nav / footer, injected by js/include.js
├── css/
│   ├── base.css          Design tokens, themes, typography
│   ├── layout.css        Header, nav, main, footer
│   ├── components.css    Cards, social bar, typing, toggle, projects grid
│   └── pages/            Page-specific styles (blogs, buzzing)
├── js/
│   ├── main.js           Clock, typing, theme, nav highlight, reveal on scroll
│   ├── include.js        Fetches partials/*.html into [data-include] slots
│   ├── projects.js       Renders data/projects.json into home page
│   └── pages/            Page-specific scripts (blogs filter, buzzing gallery)
├── data/
│   ├── projects.json     Home projects — edit to add/remove
│   └── slides.json       Buzzing decks — {title, description, embedUrl}
├── assets/
│   ├── img/              Images
│   └── icons/            Favicons
└── .nojekyll             Tells GitHub Pages to serve files as-is
```

## Adding content

- **A new project** — append an entry to `data/projects.json`.
- **A new slide deck** — publish the Google Slides deck (*File → Share → Publish to web → Embed*), copy the `src` URL, add an entry to `data/slides.json`.
- **A new blog resource** — add a `<a class="resource-card" ...>` block inside `#resource-grid` in `blogs.html`.

## Running locally

The site needs a static server (partials are loaded with `fetch`, which does not work from `file://`):

```bash
python -m http.server 8000
# then open http://localhost:8000
```
