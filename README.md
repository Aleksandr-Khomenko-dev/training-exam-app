# CertBrew — Java Certification & Interview Prep

A personal, offline-friendly study app for Java certification prep (OCA 1Z0-808, OCP 1Z0-809), a Middle-level interview question bank, and an algorithm/code-reading practice tab (Junior/Middle + LeetCode-style Easy/Medium/Hard). Fully bilingual (EN/RU), with a dashboard, weak-topic analysis, and full test history.

No backend — everything runs client-side and all progress is stored in the browser's `localStorage`. That means progress does **not** sync between devices/browsers; each one keeps its own history.

## Running it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173` by default.

### Opening it on your phone over Wi-Fi

Run the dev server with `--host` so it also listens on your local network:

```bash
npm run dev -- --host
```

Vite will print a "Network" URL like `http://192.168.1.42:5173` — open that in your phone's browser as long as the phone is on the **same Wi-Fi network** as the computer running the server. This only works while the dev server is running on that computer; it is not a public link.

## Deploying to get a permanent link (works anywhere, no computer required)

This is a fully static site (`npm run build` outputs plain HTML/CSS/JS into `dist/`), so it can be hosted for free on any static host. Vercel is the simplest:

1. Push this project to a GitHub repository (see commands below).
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click "Add New Project", and pick this repo.
3. Vercel auto-detects Vite — leave the defaults (Build command: `npm run build`, Output directory: `dist`) and click Deploy.
4. You'll get a permanent `https://your-project.vercel.app` URL that works on any device, anywhere, with no computer required to stay on.

Netlify and Cloudflare Pages work the same way (same build command/output folder) if you prefer one of those instead.

### Pushing this project to GitHub for the first time

```bash
git init            # if not already a git repo
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Create the empty repo on GitHub first (github.com → New repository), then run the commands above with your repo's URL.

## Available scripts

- `npm run dev` — start the dev server
- `npm run build` — production build into `dist/`
- `npm run preview` — locally preview the production build
- `npm run lint` — run oxlint
