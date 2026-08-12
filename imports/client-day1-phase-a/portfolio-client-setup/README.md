# Portfolio Frontend (`/client`)

A premium portfolio website built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Designed for high-performance animations, text-driven design, and seamless backend integration.

## Day 1: Frontend Baseline Setup

### What's Included

- ✅ **React 18** + **Vite** for lightning-fast HMR and optimized builds
- ✅ **Tailwind CSS** with custom CSS variables for design system consistency
- ✅ **Axios** configured for API communication with Flask backend
- ✅ **Vite dev proxy** that forwards `/api/*` requests to `http://localhost:5000`
- ✅ **Mock data** (projects.json, reviews.json) for offline development
- ✅ **ProjectCard component** with clean, semantic HTML structure
- ✅ **App.jsx** fetching mock data and rendering projects with loading/error states

### Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **View the result:**
   You should see the portfolio app displaying 3 mock projects with tech stack tags and CTA buttons.

### Project Structure

```
src/
├── assets/
│   └── styles/
│       ├── globals.css
│       └── variables.css        (design system)
├── components/
│   └── projects/
│       └── ProjectCard.jsx       (displays individual project)
├── services/
│   ├── api.js                    (Axios instance)
│   └── projectsService.js        (fetch logic)
├── data/
│   ├── projects.json             (mock projects)
│   └── reviews.json              (mock reviews)
├── App.jsx                        (main component)
└── main.jsx                       (React DOM entry)
```

### Key Features

#### Vite Dev Proxy
Any request to `/api/*` from React is automatically forwarded to `http://localhost:5000`. This means:
- Frontend code uses relative paths: `axios.get('/api/projects')`
- No CORS issues during local development
- Same code works in production (no hardcoded URLs)

#### Mock Data for Offline Development
- `src/data/projects.json` contains 3 realistic portfolio projects
- `src/data/reviews.json` contains 3 testimonials
- `projectsService.js` dynamically imports these files and simulates async behavior
- **Phase C (Day 2):** Swap the import for a real API call — no component changes needed

#### Service Layer Abstraction
The `projectsService.js` file isolates data-fetching logic:
```javascript
// Day 1: Imports mock JSON
const projects = await getProjects();

// Phase C: Same call, different source (API instead of JSON)
// Just update projectsService.js — App.jsx stays the same
```

### Tailwind CSS Setup

- **Config:** `tailwind.config.js` extends Tailwind with custom theme colors
- **CSS variables:** `src/index.css` defines `--primary`, `--accent`, etc.
- **Responsive utilities:** Built-in mobile-first breakpoints (sm, md, lg, xl)
- **No images:** Design relies on typography, color, and layout — images are optional

### Environment Variables

Copy `.env.example` to `.env.local` and customize:

```bash
# .env.local
VITE_API_BASE_URL=        # Leave empty for dev proxy; set to https://api.yoursite.com for production
```

### Available Scripts

```bash
npm run dev      # Start Vite dev server (port 5173)
npm run build    # Build for production (dist/)
npm run preview  # Preview the production build
npm run lint     # Run ESLint (if configured)
```

### Next Steps (Day 2)

1. **Build the Flask backend** (`/server`):
   - Initialize Flask app with models and migrations
   - Create `/api/projects` and `/api/reviews` endpoints
   - Wire up contact form submission

2. **Swap mock data for real API** in `projectsService.js`:
   - Uncomment the `api.get()` calls
   - Comment out the `import('../data/projects.json')` lines
   - Test that the same component code still works with live data

3. **Add animations & micro-interactions** (Sprint 2):
   - Integrate Framer Motion for scroll reveals
   - Add GSAP ScrollTrigger for complex sequences
   - Implement magnetic buttons, cursor tracking, etc.

### Common Issues

**Q: Port 5173 is already in use**
```bash
npm run dev -- --port 5174
```

**Q: CORS errors when calling Flask**
Make sure:
1. Flask is running on `http://localhost:5000`
2. Flask-CORS is configured to allow requests from `http://localhost:5173`
3. Vite dev server is properly configured with the proxy in `vite.config.js`

**Q: Mock data not loading**
Check the browser console. Make sure `src/data/projects.json` exists and is valid JSON.

### Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Axios Documentation](https://axios-http.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

### License

This project is part of a personal portfolio. Use as reference only.
