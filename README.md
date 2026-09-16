# Ahmed EL-Tlawy — Portfolio

Personal site for Ahmed EL-Tlawy, Data Engineer. Built with Astro and Tailwind, designed after [Sudip's portfolio](https://portfolio-metaloopa.vercel.app/).

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Commit and push (so Vercel can deploy)

From the project folder in Git Bash or PowerShell:

```bash
git add .
git status
git commit -m "final change"
git push origin main
```

If Git says there is nothing to commit, the latest work is already committed locally. You only need:

```bash
git push origin main
```

That updates [github.com/ahmedmohsenfawzy/portfolio](https://github.com/ahmedmohsenfawzy/portfolio). A Vercel project linked to this repo will then build production from `main`.

## Deploy on Vercel

1. Push `main` as above.
2. In Vercel: **Add New Project** → import `ahmedmohsenfawzy/portfolio` (or open the existing project for this repo).
3. Framework preset: **Astro**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Node.js **22.x** (also pinned in `.node-version` and `package.json` `engines`).
7. No environment variables are required.
8. Deploy.

The live URL in `astro.config.mjs` and `public/robots.txt` is `https://portfolio-ahmed-el-tlawy.vercel.app`. Update those two files if the Vercel URL is different, then commit and push again.

Contact form submissions go through [FormSubmit](https://formsubmit.co/) to `AhmedMohsenITI@gmail.com`. Confirm the first message from that inbox.
