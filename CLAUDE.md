# CLAUDE.md

This file gives Claude Code persistent context for this project. Read it before every task and follow it.

---

## Project

A **personal developer portfolio website** with **interactive 3D** as the standout feature. The goal is to land software engineering roles, so the site must signal strong, real engineering and look **human-crafted — never AI-generated or templated**.

**Owner:** Bhargav Patel — Software Engineer (backend-focused, 3+ years), MS in Computer Science (UT Arlington).

---

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS v3
- **3D:** React Three Fiber + Three.js (with `@react-three/drei` for helpers)
- **Deployment:** Vercel (auto-deploy on every Git push)

Do not introduce new frameworks or heavy dependencies without asking first.

---

## Design System

| Token | Value |
|---|---|
| Background | `#0a0a0f` |
| Surface | `#111118` |
| Border | `#1e1e2e` |
| Accent | `#6366f1` (indigo) |
| Text primary | `#e5e7eb` |
| Text muted | `#6b7280` |
| Font body | Inter |
| Font mono | JetBrains Mono |

---

## Design Principles (non-negotiable)

1. **Sharp, clean, intentional.** Strong visual hierarchy, refined typography, generous spacing. No generic template look.
2. **Must NOT read as AI-generated.** Avoid default gradients, clichéd hero copy, and cookie-cutter section layouts. Make deliberate, distinctive choices.
3. **3D enhances, never overwhelms.** Professional and performant — not gimmicky.
4. **Fully responsive.** 3D must gracefully simplify or fall back on mobile/low-end devices.
5. **Fast and SEO-friendly.** Lazy-load 3D, provide fallbacks, keep bundle lean.

---

## File Structure

```
src/
  components/
    Navbar.jsx
    Hero/
      Hero.jsx        — text + layout
      HeroScene.jsx   — React Three Fiber canvas
    About.jsx
    Skills.jsx
    Experience.jsx
    Projects.jsx
    Contact.jsx
  index.css
  main.jsx
  App.jsx
public/
  favicon.svg
  resume.pdf        — place Bhargav's actual resume PDF here
```

---

## Links

- **LinkedIn:** www.linkedin.com/in/bhargav-patel-b51707323
- **GitHub:** https://github.com/bhargavspatel
- **Email:** bspatel2134@gmail.com
- **GitHub project repos:** TBD — ask owner before hardcoding

---

## Commands

```bash
npm install        # install deps
npm run dev        # local dev server (http://localhost:5173)
npm run build      # production build
npm run preview    # preview production build locally
```
