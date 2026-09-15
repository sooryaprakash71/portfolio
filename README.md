# Soorya Prakash S — Portfolio

A static portfolio site. No build step, no npm, no framework, no dependencies.
Open `index.html` in a browser and it works.

Live content: **13 projects** (9 personal, 4 client), two colour themes, and a
detail modal for every project.

---

## Files

| File | What it is |
|---|---|
| **`data.js`** | **The only file you need to edit.** All text, projects, media paths, contact details. |
| `index.html` | Page structure and `<head>` metadata. Rarely needs touching. |
| `style.css` | Both themes, layout, responsive rules, print styles. |
| `app.js` | Behaviour — theme switching, filters, modal, custom cursor. Leave alone. |
| `media/` | Screenshots and videos. One `.jpg` per project, plus `profile.jpg`. |
| `Soorya-Prakash-S-Resume.pdf` | The résumé both résumé buttons point at. |
| `serve.ps1` | Optional local web server (see below). |
| `netlify.toml` | Netlify publish directory + security headers. |
| `.nojekyll` | Tells GitHub Pages not to run Jekyll. Must exist. |
| `.gitignore` | Excludes `.claude/`, the duplicate résumé, and OS clutter. |

---

## How it fits together

`index.html` ships an empty shell — most elements are placeholders with an `id`.
`data.js` defines two globals, `SITE` and `PROJECTS`. `app.js` runs last, reads
those globals, and fills the shell in:

- `SITE.name` / `role` / `tagline` / `intro` → the hero
- `SITE.about` (array of paragraphs) → the About prose
- `SITE.skills` (array of `{group, items}`) → the skills sidebar
- `SITE.email` / `linkedin` / `location` → the contact card
- `PROJECTS` → the filter chips, the card grid, and the modal

Two numbers in the hero stat row are **derived, not authored**: "Games built"
counts `kind: "personal"` projects, "Client projects" counts `kind: "client"`,
and "Platforms shipped" counts the items in the `Platforms` skill group. Add a
project and the counts update on their own.

Everything user-supplied is HTML-escaped before it reaches the DOM.

---

## Viewing it locally

Double-click `index.html`. That is the whole process.

If you want it over `http://` instead of `file://`, right-click `serve.ps1` →
**Run with PowerShell**, then open <http://localhost:8099/>. It needs no Node,
no Python, nothing installed. Close the window or press Ctrl+C to stop it.

It defaults to serving its own folder on port 8099, so it keeps working if you
move or rename the directory. Both are overridable:

```powershell
.\serve.ps1 -Port 8100 -Root .
```

It serves `GET` and `HEAD`, refuses anything else with a `405`, sends
`Cache-Control: no-store` so you never get yesterday's edit back, and supports
byte ranges — which is what lets you scrub through a gameplay `.mp4` in the
browser instead of only playing it from the start. It binds `localhost` only:
it is a preview server, not something to expose to the network.

---

## Editing content

### Projects

Each entry in `PROJECTS` looks like this:

```js
{
  id: "gravity-drift",            // unique; also seeds the generated cover art
  title: "Gravity Drift",
  kind: "personal",               // "personal" | "client" → badge, top-left
  type: "2D",                     // filter chip + badge, top-right
  client: "Client work",          // optional, client projects only
  blurb: "One or two sentences.", // shown on the card
  role: "Solo developer — …",
  tech: ["Unity 6", "C#"],        // first 4 show on the card; all show in modal
  highlights: ["…", "…"],         // bullet list in the modal
  detail: "A closing paragraph.",
  media: { video: null, youtube: null, poster: null, images: ["media/x.jpg"] }
}
```

The order of the array is the order on the page.

**Types and filtering.** Only the *first word* of `type` is used for filtering,
so `"2D with multiplayer"` and `"2D tool"` both sit under the **2D** chip while
still displaying their full label on the card. Chips are generated from whatever
types exist in the data, so a new type adds its own chip. Preferred chip order
is `TYPE_ORDER` in `app.js` (currently `2D, 3D, VR, AR, AVP`); anything not
listed sorts alphabetically after those.

### Adding a video or screenshots

1. Put the file in `media/` — for example `media/gravity-drift.mp4`.
2. Fill in that project's `media` block:

```js
media: {
  video:  "media/gravity-drift.mp4",
  poster: "media/gravity-drift-poster.jpg",
  images: ["media/gravity-drift-1.png", "media/gravity-drift-2.png"]
}
```

3. Save and refresh.

**Rules of thumb**

- The modal picks **one** hero medium, in this order: `youtube` → `video` →
  first `images` entry → placeholder. `poster` is only the still frame for
  `video`.
- The **first image** in `images` is the card thumbnail. Images **after** the
  first become the modal's "Screenshots" grid.
- Empty slots show a tidy placeholder — generated cover art plus a label
  ("Gameplay video coming soon", or "Media under NDA" for client work) — so
  nothing ever looks broken.
- Keep MP4s **under ~40 MB**. GitHub's hard limit is 100 MB per file, and large
  videos make the page slow on mobile data.
- **Do not put videos in Git LFS.** GitHub Pages serves LFS files as text
  pointers, not video, so the player silently breaks. Commit MP4s normally or
  use YouTube.
- Too big to compress? Use the YouTube ID (the part after `watch?v=`):
  ```js
  media: { youtube: "dQw4w9WgXcQ", video: null, poster: null, images: [] }
  ```

### Your photo

Already wired up — `media/profile.jpg`, set as `photo` in `data.js`. Replace the
file to change it.

### Contact details

The contact card is built from the `CONTACTS` array in `app.js`, which reads
`SITE.email`, `SITE.linkedin` and `SITE.location` from `data.js`. To change what
appears, edit those `SITE` fields; to add or remove a *row*, edit `CONTACTS`.

---

## Themes

Two, switched with the button in the header. The choice is remembered per
visitor in `localStorage` under the key `sps-theme`, and the mobile browser
chrome colour (`<meta name="theme-color">`) is kept in sync.

| Theme | Look |
|---|---|
| **Editorial** (default) | Cream, ink, burnt orange. Serif display face. Calm and readable. |
| **Arcade** | Near-black, amber and magenta, faint scanline texture. |

Themes are pure CSS custom properties, defined in section 1 of `style.css` under
`:root[data-theme="…"]`. To change which loads first, edit the `data-theme`
attribute on `<html>` in `index.html` **and** the fallback in `app.js`
(`applyTheme(readStoredTheme() || "editorial")`). To add a third, add a token
block in `style.css` and an entry to the `THEMES` array in `app.js`.

---

## Accessibility and motion

Worth knowing before you change anything:

- A skip link, focus trapping in the modal, `Escape` to close, and focus
  restored to the card you came from.
- The custom cursor is **deliberately skipped** for coarse/touch pointers and
  for anyone with `prefers-reduced-motion: reduce` — the native cursor is only
  hidden once the replacement is actually running.
- `prefers-reduced-motion` also disables the scroll reveals and hover zooms.
- There is a print stylesheet: header, filters, modal and hero buttons are
  hidden, and cards are forced visible so the page prints as a document.

---

## Deploying

Plain static files, so both hosts serve this folder with no build command. You
can use both at once.

### Option A — GitHub Pages

1. In GitHub Desktop: **File → New Repository**, local path set to this folder
   (`_PortfolioWebsite`), name it `portfolio`, then **Publish repository**
   (untick "Keep this code private").
2. On github.com: repo → **Settings → Pages**.
3. Under *Build and deployment* set **Source: Deploy from a branch**, branch
   **main**, folder **/ (root)**. Save.
4. Wait about a minute:

   ```
   https://<your-github-username>.github.io/portfolio/
   ```

To update later: commit and push. The site redeploys on its own.

> Want the shorter `https://<username>.github.io` with no `/portfolio`? Name the
> repository exactly `<your-github-username>.github.io` instead.

### Option B — Netlify

**Drag-and-drop:** go to [app.netlify.com/drop](https://app.netlify.com/drop),
drag this whole folder on, and you get a live URL immediately. Rename it under
**Site settings → Change site name**.

**Connected to GitHub (auto-deploys on push):** **Add new site → Import an
existing project → GitHub**, pick the repo, leave *build command* **empty** and
*publish directory* as `.` — `netlify.toml` already sets this.

`netlify.toml` also sends `X-Frame-Options: SAMEORIGIN`,
`X-Content-Type-Options: nosniff` and a `strict-origin-when-cross-origin`
referrer policy, and caches `.mp4` files for a year. These are Netlify-only;
GitHub Pages ignores the file.

### Which link goes on the résumé?

Netlify, for the cleaner name. GitHub Pages, if you would rather the URL show a
GitHub username. Both are free and permanent; no downside to running both.

---

## Before you share the link — a short checklist

- [ ] Open the site on your phone and check it reads well.
- [ ] Click through both themes once.
- [ ] Confirm the résumé button opens the right PDF in a new tab.
- [ ] Open two or three project modals and check nothing reads awkwardly.
- [ ] Consider adding **gameplay video** to the strongest two or three
      projects. Every project has a screenshot, which is the floor — video is
      what actually sells a game.
- [ ] Re-read the copy — every word came from your own READMEs, but you should
      still be happy standing behind each claim in an interview.

---

## Privacy note

The contact card is **email, LinkedIn and city only**. The phone number was
removed deliberately: a public, search-indexed page is scraped continuously, and
recruiters use email and LinkedIn anyway.

> ⚠️ **`Soorya-Prakash-S-Resume.pdf` still contains the phone number**, as a
> visible line and as a `tel:` link, and both résumé buttons serve that file
> publicly. Removing it from the site does not remove it from the PDF —
> regenerate the PDF from its source document if you want the number off the
> site entirely.
