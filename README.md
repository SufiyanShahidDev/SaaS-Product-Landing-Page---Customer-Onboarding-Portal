# SaaSFlow Frontend Project

This project is a frontend-only SaaS product landing page, onboarding portal, login/signup flow, and dashboard preview.

## Folder structure

```text
saas_portal_project/
├─ index.html
├─ login.html
├─ signup.html
├─ onboarding.html
├─ dashboard.html
├─ css/
│  └─ style.css
├─ js/
│  ├─ main.js
│  ├─ auth.js
│  ├─ onboarding.js
│  └─ dashboard.js
└─ README.md
```

## Features

- Modern responsive landing page
- Functional contact form with validation (landing page)
- Separate login and signup pages
- Multi-step onboarding with validation
- Local storage persistence
- Dashboard preview with analytics cards
- Bootstrap (CSS only) and Font Awesome based UI
- Light/Dark mode toggle, mobile nav, and FAQ accordion built with plain vanilla JS (no Bootstrap JS bundle, no `data-*` attributes)
- No backend, no API, no database

## How to run

Open `index.html` in a browser.

## Implementation notes

- All interactivity (theme toggle, mobile navbar collapse, FAQ accordion, pricing toggle, multi-step onboarding, form validation, contact form) is implemented with plain vanilla JavaScript in the `js/` folder.
- No `data-*` attributes are used anywhere in the HTML. Elements are targeted with classes, IDs, and standard ARIA attributes (`aria-controls`, `aria-expanded`, `aria-labelledby`) instead.
- Bootstrap is used for CSS (grid, utilities, components styling) only — the Bootstrap JS bundle is not loaded, since collapse/accordion behavior is handled by `js/main.js`.

## Notes for images

This project intentionally uses text and icon-based placeholders instead of real images.
Add your own:
- Company logo in the navbar
- Hero banner artwork
- Any section illustrations or screenshots
