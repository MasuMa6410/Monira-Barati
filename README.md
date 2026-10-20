# Masuma Barati — Graphic Designer Portfolio

## Run it
1. Extract the ZIP file.
2. Open `index.html` in a browser, or use VS Code Live Server.
3. Tailwind's browser CDN and Google Fonts need an internet connection. The custom CSS and JavaScript are local.

## Replace the demo content
- **Name, bio, email, location:** edit `index.html`.
- **Project images:** add your files in `Images/` and replace the `src` in each project image:
  - `Images/project-01.jpg`
  - `Images/project-02.jpg`
  - `Images/project-03.jpg`
  - `Images/project-04.jpg`
  - `Images/project-05.jpg`
  - `Images/project-06.jpg`
- You can use `.png`, `.jpg`, `.jpeg`, or `.webp`; update the matching `src` when you do.
- The built-in abstract artwork is a fallback, so the layout still looks intentional before you add images.
- **Project title, category, description, deliverables, date:** edit the relevant `.project-info` block in `index.html`.
- **Google Drive / case-study link:** edit the `href` of the relevant `<a class="project-link">`. For a project without more images, leave the link with `hidden` so no irrelevant link is shown. Only show the link when it points to the real project folder or case study.
- **Categories:** each project card uses `data-category`, e.g. `data-category="social print"`. Keep these values aligned with the filter chips (`social`, `brand`, `print`, `digital`).
- **Email:** update `portfolioEmail` in `js/app.js` and the displayed email link in `index.html`.
- **Theme, layout, colors:** edit CSS variables at the top of `css/style.css`.

## Project write-up template
**Project Title**  
Social Media & Brochure Design

**Category**  
Social Media Design & Print Design

**Overview**  
This project features a collection of social media and print designs created to promote a brand and communicate its message effectively. The deliverables include five Instagram posts, one Instagram story, and a brochure. The designs focus on visual consistency, engaging layouts, and clear communication to create a cohesive and professional brand presentation across digital and print platforms.

**Deliverables**  
5 Instagram posts · 1 Instagram story · 1 brochure

**View full project**  
Add the real Google Drive folder or case-study URL to the project's `project-link` anchor. If you only want to show one image, keep that anchor hidden.

## Important before publishing
- Replace all demo project descriptions and dates with accurate details.
- Use high-quality, appropriately cropped images. Portfolio thumbnails should be consistent in visual quality.
- Make sure any Google Drive links are set to the intended viewing permission.
- Verify that the projects and skills shown are your own work and accurately represent your experience.


## Tailwind CSS migration

Tailwind utility classes have been added to shared layout elements in `index.html` while retaining the original semantic classes used by `js/app.js`. The bespoke CSS remains in `css/style.css` to preserve the original colors, typography, responsive breakpoints, abstract poster artwork, dark theme, and modal behavior exactly. The duplicate Google Fonts `@import` was removed because the fonts are already loaded in the HTML head. This is a fidelity-first hybrid migration, not a complete removal of all custom CSS.
