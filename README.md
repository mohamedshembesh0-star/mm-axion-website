# MM Axion Solutions: website mockup + outreach playbook

Made for MM Axion by Mohamed (Haelyx).

## What's in here

| Folder | What it is |
|---|---|
| `website-mockup/` | The full source code of the new MM Axion website mockup (Next.js). Live preview: https://mm-axion-preview.vercel.app/ |
| `outreach/01-what-we-learned.md` | 10 lessons from Haelyx's cold outreach that apply to selling websites |
| `outreach/02-sample-message.md` | Your Dziarski Barista message rewritten with those lessons (Polish + English), plus a fill-in template |
| `outreach/03-free-mockup.md` | What a free mockup should include, how long it should take, and what happens after |

## Run the website on your computer

You need Node.js 20 or newer.

```bash
cd website-mockup
npm install
npm run dev
```

Then open http://localhost:3000

- Text and links live in `website-mockup/src/lib/content.ts` (edit this first, most changes happen there).
- Each section of the page is its own file in `website-mockup/src/components/` (Hero, Services, Products, Work, Process, About, Contact, Footer).
- Colours and fonts: `website-mockup/src/app/globals.css`.
- SEO title and description: `website-mockup/src/lib/seo.ts`.

## Put it live

The easiest way: import this repo on https://vercel.com/new, set the root directory to `website-mockup`, and click Deploy. Then connect `mmaxionsolutions.com` in the project's Domains settings.
