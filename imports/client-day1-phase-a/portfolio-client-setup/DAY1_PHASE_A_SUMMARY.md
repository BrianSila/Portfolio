# Day 1: Phase A - Frontend Baseline Setup Summary

## 📋 Files Created & Their Purpose

### Configuration Files
```
package.json          ✅ All dependencies (React, Vite, Tailwind, Framer Motion, Axios)
vite.config.js        ✅ Dev server config + /api proxy to localhost:5000
tailwind.config.js    ✅ Tailwind theme extensions with CSS variables
postcss.config.js     ✅ PostCSS plugins for Tailwind processing
index.html            ✅ HTML entry point for Vite
.env.example          ✅ Template for environment variables
.gitignore            ✅ Ignore node_modules, dist, .env, etc.
README.md             ✅ Full documentation
```

### Core Application Files
```
src/main.jsx                              ✅ React DOM entry point
src/App.jsx                               ✅ Main component fetching & rendering projects
src/index.css                             ✅ Global styles + Tailwind + CSS variables
```

### Services & API Layer
```
src/services/api.js                       ✅ Axios instance with baseURL config
src/services/projectsService.js           ✅ getProjects() & getReviews() functions
                                             (Mock data on Day 1, API on Phase C)
```

### Components
```
src/components/projects/ProjectCard.jsx   ✅ Functional component for displaying projects
                                             (title, description, tech tags, CTAs)
```

### Mock Data
```
src/data/projects.json                    ✅ 3 realistic portfolio projects with tech stacks
src/data/reviews.json                     ✅ 3 testimonials from clients
```

---

## 🚀 Quick Start Commands

### 1. Install Dependencies
```bash
cd /client
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
- Vite runs on `http://localhost:5173`
- HMR (Hot Module Replacement) enabled
- `/api/*` requests proxy to `http://localhost:5000` (Flask backend)

### 3. Build for Production
```bash
npm run build
```
- Output: `dist/` folder
- Optimized bundle, code splitting, tree-shaking

---

## 📊 Architecture Overview

### Data Flow (Day 1)

```
App.jsx
  ↓ (useEffect on mount)
  ↓
projectsService.getProjects()
  ↓
import('../data/projects.json') [async]
  ↓
setProjects(data)
  ↓
map projects → <ProjectCard />
```

### Data Flow (Phase C - Day 2)

```
App.jsx
  ↓ (useEffect on mount)
  ↓
projectsService.getProjects()
  ↓
api.get('/projects') [same function, different source]
  ↓
Vite dev proxy → http://localhost:5000/api/projects
  ↓
setProjects(data)
  ↓
map projects → <ProjectCard />
```

**Key Point:** Only `projectsService.js` changes. Components remain untouched.

---

## 🔧 Key Configuration Details

### Vite Dev Proxy (`vite.config.js`)
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```
- All requests to `/api/*` are forwarded to Flask
- Avoids CORS issues during local dev
- No change needed for production (set `VITE_API_BASE_URL` env var)

### Axios Configuration (`src/services/api.js`)
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});
```
- `baseURL` reads from `VITE_API_BASE_URL` env var
- Falls back to `/api` (dev proxy)
- Timeout: 10 seconds

### Tailwind CSS Variables (`src/index.css`)
```css
:root {
  --primary: #2e3a8c;
  --secondary: #ff6b6b;
  --accent: #ff4500;
  /* ... etc */
}
```
- Used in components via Tailwind utilities
- Swappable in one place for theming

---

## ✨ What You Should See

### On `http://localhost:5173`:

1. **Header** with title "Brian's Portfolio" and subtitle
2. **"Projects & Experience" section** heading
3. **3 project cards** in a responsive grid (1 col on mobile, 2 on tablet, 3 on desktop)
   - Each card shows: Featured badge (for featured projects), title, description
   - Tech stack tags (color-coded: blue for frontend, green for backend)
   - "View Demo" and "View Code" buttons

4. **Footer** with copyright notice
5. **Loading state** briefly (300ms simulated delay)
6. **No errors** in the browser console

---

## 🔍 Testing the Setup

### 1. Verify Mock Data Loads
Open browser DevTools → Console:
```javascript
// You should see successful project fetches and no errors
```

### 2. Check the Network Tab
- Request to `/api/projects` (proxied request) should appear
- Or, if using mock JSON, no network request for projects (just dynamic import)

### 3. Inspect an Element
- Click on a tech tag → should have class like `bg-blue-100 text-blue-700`
- This confirms Tailwind is working

---

## 📝 Next Steps (Day 2 - Phase B & C)

### Phase B: Build Flask Backend
- Create Flask app with SQLAlchemy models
- Set up database migrations
- Create `/api/projects` and `/api/reviews` endpoints
- Return hardcoded JSON (no complex queries yet)

### Phase C: Swap Mock Data for Real API
In `src/services/projectsService.js`:

**Before (Day 1):**
```javascript
const projectsModule = await import('../data/projects.json');
const projects = projectsModule.default;
```

**After (Phase C):**
```javascript
const response = await api.get('/projects');
return response.data;
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5173 already in use | `npm run dev -- --port 5174` |
| Projects not displaying | Check browser console for errors; ensure `src/data/projects.json` exists |
| Tailwind styles not applying | Run `npm install`; restart dev server |
| Cannot find module errors | Verify file paths match the folder structure above |
| `/api/projects` returns 404 | Flask backend not running; check Phase B setup |

---

## 📚 Reference Links

- **Vite Docs:** https://vitejs.dev/
- **React Hooks:** https://react.dev/reference/react/hooks
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Axios:** https://axios-http.com/
- **Framer Motion:** https://www.framer.com/motion/ (coming in Sprint 2)
- **GSAP:** https://gsap.com/ (coming in Sprint 2)

---

## ✅ Checklist Before Moving to Day 2

- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts server on port 5173
- [ ] Browser displays portfolio with 3 project cards
- [ ] No console errors
- [ ] Tech tags are color-coded correctly
- [ ] "View Demo" and "View Code" buttons render
- [ ] README.md reviewed for context
- [ ] Flask backend development ready to begin

---

**Status:** Phase A Complete ✅  
**Next:** Phase B (Backend Setup) → Phase C (API Integration)
