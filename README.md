# Soorya Prakash S — Portfolio

A static portfolio site. No build step, no npm, no framework. Open `index.html`
in a browser and it works.

---

## Files

| File | What it is |
|---|---|
| **`data.js`** | **The only file you need to edit.** All text, projects, videos, screenshots. |
| `index.html` | Page structure. Rarely needs touching. |
| `style.css` | Both themes and layout. |
| `app.js` | Behaviour — theme switching, filters, modal. Leave alone. |
| `media/` | Put your videos and screenshots here. |
| `netlify.toml` | Netlify deploy settings. |
| `.nojekyll` | Tells GitHub Pages not to run Jekyll. Must exist. |

---

## Viewing it locally

Double-click `index.html`. That is the whole process.

If you want it served over `http://` instead of `file://` (closer to production —
and needed if you ever add anything that fetches a file), right-click
`serve.ps1` → **Run with PowerShell**, then open <http://localhost:8099/>.
It needs no Node, no Python, nothing installed. Close the window to stop it.

---

## Adding a video or screenshots

1. Put the file in `media/` — for example `media/gravity-drift.mp4`.
2. Open `data.js`, find the project, and fill in its `media` block:

```js
media: {
  video:  "media/gravity-drift.mp4",
  poster: "media/gravity-drift-poster.jpg",
  images: ["media/gravity-drift-1.png", "media/gravity-drift-2.png"]
}
```

3. Save and refresh.

**Rules of thumb**

- The **first image** in `images` becomes the card thumbnail on the grid.
- Empty slots (`video: null`, `images: []`) automatically show a tidy
  "media coming soon" placeholder — nothing ever looks broken.
- Keep MP4s **under ~40 MB**. GitHub's hard limit is 100 MB per file, and large
  videos make the page slow on mobile data.
- **Do not put videos in Git LFS.** GitHub Pages serves LFS files as text
  pointers, not as video, so the player silently breaks. Commit MP4s normally
  or use YouTube.
- Too big to compress? Upload to YouTube and use the video ID instead:
  ```js
  media: { youtube: "dQw4w9WgXcQ", video: null, poster: null, images: [] }
  ```
  The ID is the part after `watch?v=` in the URL.

You already have usable footage on disk for Gravity Drift at
`D:\Portfolio\Gravity Drift Docs\` — a full clip, several cuts, and PNGs of the
player, portal, bounce pad and platforms.

---

## Adding your photo

Drop it in `media/profile.jpg`, then in `data.js`:

```js
photo: "media/profile.jpg",
```

---

## Themes

Two, switched with the button in the header. The choice is remembered per
visitor in `localStorage`.

| Theme | Look |
|---|---|
| **Editorial** (default) | Cream, ink, burnt orange. Calm and readable. |
| **Arcade** | Near-black, amber and magenta, faint scanlines. |

To change which one loads first, edit the `data-theme` attribute on the `<html>`
tag in `index.html`, and the fallback in `app.js` (`applyTheme(readStoredTheme() || "editorial")`).

---

## Deploying

The site is plain static files, so both hosts below serve the same folder with
no build command. You can use both at once.

### Option A — GitHub Pages

1. In GitHub Desktop: **File → New Repository**, set the local path to this
   folder (`_PortfolioWebsite`), name it `portfolio`, then **Publish repository**
   (untick "Keep this code private").
2. On github.com open the repo → **Settings → Pages**.
3. Under *Build and deployment* set **Source: Deploy from a branch**, branch
   **main**, folder **/ (root)**. Save.
4. Wait about a minute. Your link:

   ```
   https://<your-github-username>.github.io/portfolio/
   ```

To update later: commit and push in GitHub Desktop. The site redeploys on its own.

> Want the shorter `https://<username>.github.io` with no `/portfolio` on the
> end? Name the repository exactly `<your-github-username>.github.io` instead.

### Option B — Netlify

**Drag-and-drop (fastest, no account link needed beyond signup):**

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag this whole `_PortfolioWebsite` folder onto the page.
3. You get a live URL immediately. Rename it under **Site settings → Change site
   name** to something like `soorya-prakash`, giving you
   `https://soorya-prakash.netlify.app`.

**Connected to GitHub (auto-deploys on every push):**

1. In Netlify: **Add new site → Import an existing project → GitHub**.
2. Pick the repo. Leave *build command* **empty** and *publish directory* as `.`
   — `netlify.toml` already sets this.
3. Deploy.

### Which link goes on the résumé?

Netlify, if you want the cleaner name (`soorya-prakash.netlify.app`).
GitHub Pages, if you would rather the URL show a GitHub username. Both are free
and permanent; there is no downside to running both and putting one on the CV.

---

## Before you share the link — a short checklist

- [ ] Add at least one video or screenshot to the top two or three projects.
      A grid of empty placeholders undersells the work badly.
- [ ] Add `media/profile.jpg` and set `photo` in `data.js`.
- [ ] Open the site on your phone and check it reads well.
- [ ] Click through both themes once.
- [ ] Confirm the résumé button opens the right PDF in a new tab.
- [ ] Re-read the copy — every word came from your own READMEs, but you should
      still be happy standing behind each claim in an interview.

---

## A note on the phone number

Your mobile number is on the contact card because you asked for it. A public,
search-indexed page is scraped continuously, so expect spam calls. If that gets
tiresome, delete the `phone` line from the `CONTACTS` array in `app.js` — email
and LinkedIn are what recruiters actually use.
