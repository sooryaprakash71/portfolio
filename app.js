/* ==========================================================================
   app.js — behaviour. You should not need to edit this file.
   All content lives in data.js.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------- helpers ----- */

  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  const ICONS = {
    arrow:  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    lock:   '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    user:   '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.6"/><path d="M5 20c0-3.6 3.1-5.8 7-5.8s7 2.2 7 5.8"/></svg>',
    film:   '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16M16 4v16M3 10h18M3 15h18"/></svg>',
    mail:   '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    link:   '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.5M12 17v-4a2.5 2.5 0 0 1 5 0v4"/></svg>',
    pin:    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>'
  };


  /* -------------------------------------------------------- themes ----- */

  const THEMES = [
    { id: "editorial", label: "Editorial", color: "#faf7f0" },
    { id: "arcade",    label: "Arcade",    color: "#0d0a11" }
  ];

  const themeBtn  = $("#themeBtn");
  const themeName = $("#themeName");

  function readStoredTheme() {
    try { return localStorage.getItem("sps-theme"); } catch (e) { return null; }
  }
  function storeTheme(id) {
    try { localStorage.setItem("sps-theme", id); } catch (e) { /* private mode */ }
  }

  function applyTheme(id) {
    const theme = THEMES.find(t => t.id === id) || THEMES[0];
    document.documentElement.setAttribute("data-theme", theme.id);
    if (themeName) themeName.textContent = theme.label;
    if (themeBtn)  themeBtn.title = "Theme: " + theme.label + " — click to change";

    /* match the mobile browser chrome to the theme */
    const meta = $("#themeColor");
    if (meta && theme.color) meta.setAttribute("content", theme.color);

    storeTheme(theme.id);
  }

  applyTheme(readStoredTheme() || "editorial");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      const current = document.documentElement.getAttribute("data-theme");
      const index   = THEMES.findIndex(t => t.id === current);
      applyTheme(THEMES[(index + 1) % THEMES.length].id);
    });
  }


  /* ---------------------------------------------------------- hero ----- */

  $("#heroName").textContent    = SITE.name;
  $("#heroRole").textContent    = SITE.role;
  $("#heroTagline").textContent = SITE.tagline;
  $("#heroIntro").textContent   = SITE.intro;
  $("#heroMotto").textContent   = SITE.motto || "";
  $("#year").textContent        = SITE.copyrightYear || new Date().getFullYear();
  $("#footerNote").textContent  = SITE.footerNote || "";

  document.title = SITE.name + " — " + SITE.role;

  /* ------------------------------------------------------- résumé -----
     Hero button views it in a new tab. About button saves it: Chromium
     browsers get a real "choose a folder" dialog via the File System
     Access API; everywhere else falls back to a normal download, which
     honours the browser's own "ask where to save each file" setting.    */

  const resumeName = SITE.resume.split("/").pop();

  const viewBtn = $("#heroResume");
  if (viewBtn) {
    viewBtn.href = SITE.resume;
    viewBtn.removeAttribute("download");
    viewBtn.target = "_blank";
    viewBtn.rel = "noopener noreferrer";
  }

  function plainDownload() {
    const a = document.createElement("a");
    a.href = SITE.resume;
    a.download = resumeName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function saveResume(e) {
    if (!window.showSaveFilePicker) return;   // let the <a download> do its job
    e.preventDefault();

    /* Open the picker FIRST, while the click's user-activation is still
       live. Awaiting a fetch before this point spends that activation and
       the browser rejects the picker. */
    let handle;
    try {
      handle = await window.showSaveFilePicker({
        suggestedName: resumeName,
        types: [{ description: "PDF document",
                  accept: { "application/pdf": [".pdf"] } }]
      });
    } catch (err) {
      if (err && err.name === "AbortError") return;   // user cancelled
      plainDownload();                                // picker unavailable
      return;
    }

    try {
      const res = await fetch(SITE.resume);
      if (!res.ok) throw new Error("could not fetch the resume");
      const writable = await handle.createWritable();
      await writable.write(await res.blob());
      await writable.close();
    } catch (err) {
      plainDownload();
    }
  }

  const dlBtn = $("#aboutResume");
  if (dlBtn) {
    dlBtn.href = SITE.resume;
    dlBtn.setAttribute("download", resumeName);
    dlBtn.removeAttribute("target");
    dlBtn.addEventListener("click", saveResume);
  }

  if (SITE.photo) {
    $("#portrait").innerHTML =
      '<img src="' + esc(SITE.photo) + '" alt="' + esc(SITE.name) + '">';
  }

  const personalCount = PROJECTS.filter(p => p.kind === "personal").length;
  const clientCount   = PROJECTS.filter(p => p.kind === "client").length;

  /* Counted with the same baseType() the filter chips use (hoisted,
     defined further down), so the chips and this number can never
     disagree. */
  const typeCount =
    new Set(PROJECTS.map(p => baseType(p.type)).filter(Boolean)).size;

  const platformCount =
    (SITE.skills.find(g => g.group === "Platforms") || { items: [] }).items.length;

  const STATS = [
    { n: personalCount,  label: "Games built" },
    { n: clientCount,    label: "Client projects" },
    { n: typeCount,      label: "Project types" },
    { n: platformCount,  label: "Platforms shipped" }
  ];

  $("#heroStats").innerHTML = STATS.map(function (s) {
    return "<li><strong>" + esc(s.n) + "</strong><span>" + esc(s.label) + "</span></li>";
  }).join("");


  /* --------------------------------------------------------- about ----- */

  $("#aboutProse").innerHTML =
    SITE.about.map(p => "<p>" + esc(p) + "</p>").join("");

  $("#skillGroups").innerHTML = SITE.skills.map(function (g) {
    return '<div class="skill-group"><h4>' + esc(g.group) + "</h4>" +
           '<div class="skill-list">' +
           g.items.map(i => '<span class="tag">' + esc(i) + "</span>").join("") +
           "</div></div>";
  }).join("");


  /* ------------------------------------------------------- contact ----- */

  const CONTACTS = [
    { icon: "mail",  label: "Email",    value: SITE.email,
      href: "mailto:" + SITE.email },
    { icon: "link",  label: "LinkedIn", value: "in/soorya-prakash-s",
      href: SITE.linkedin, external: true },
    { icon: "pin",   label: "Based in", value: SITE.location, href: null }
  ];

  $("#contactList").innerHTML = CONTACTS.map(function (c) {
    const inner =
      ICONS[c.icon] +
      '<span><span class="cl-label">' + esc(c.label) + "</span>" +
      '<span class="cl-value">' + esc(c.value) + "</span></span>";

    if (!c.href) return '<li><span class="contact-link">' + inner + "</span></li>";

    const attrs = c.external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return '<li><a class="contact-link" href="' + esc(c.href) + '"' + attrs + ">" +
           inner + "</a></li>";
  }).join("");


  /* -------------------------------------------------- reveal on scroll -
     Declared before render() runs, because render() calls observeCards().  */

  const observer = ("IntersectionObserver" in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" })
    : null;

  function observeCards() {
    const cards = $$(".card");
    if (!observer) { cards.forEach(c => c.classList.add("is-visible")); return; }
    cards.forEach(c => observer.observe(c));
  }


  /* ------------------------------------------------------- projects ---- */

  const grid      = $("#projectGrid");
  const emptyNote = $("#emptyNote");

  /* ------------------------------------------------------ cover art ----
     Until a real screenshot exists, each project gets a deterministic
     geometric cover derived from its id. It is decorative on purpose and
     carries a label, so it never reads as a screenshot of the game.        */

  function hashId(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  }

  function initials(title) {
    return title.replace(/[^A-Za-z0-9 ]/g, " ").trim().split(/\s+/)
      .slice(0, 2).map(w => w.charAt(0).toUpperCase()).join("");
  }

  function coverArt(p) {
    const h = hashId(p.id);
    let shapes = "";

    switch (h % 4) {
      case 0:                                             /* concentric rings */
        shapes = [72, 56, 40, 24, 10].map(function (r, i) {
          return '<circle cx="50" cy="50" r="' + r + '" fill="none" ' +
                 'stroke="var(--accent)" stroke-width="1.5" opacity="' +
                 (0.09 + i * 0.05).toFixed(2) + '"/>';
        }).join("");
        break;

      case 1:                                                    /* dot field */
        for (let y = 0; y < 9; y++) {
          for (let x = 0; x < 13; x++) {
            shapes += '<circle cx="' + (x * 8 + 4) + '" cy="' + (y * 8 + 12) +
                      '" r="1.5" fill="var(--accent)" opacity="' +
                      (0.07 + ((x + y * 3) % 5) * 0.045).toFixed(2) + '"/>';
          }
        }
        break;

      case 2:                                               /* diagonal bands */
        for (let i = -3; i < 15; i++) {
          shapes += '<rect x="' + (i * 9) + '" y="-30" width="3.5" height="160" ' +
                    'fill="var(--accent)" opacity="' +
                    (0.05 + ((i + 3) % 5) * 0.035).toFixed(2) +
                    '" transform="rotate(20 50 50)"/>';
        }
        break;

      default:                                              /* nested squares */
        shapes = [70, 55, 40, 25, 12].map(function (s, i) {
          return '<rect x="' + (50 - s / 2) + '" y="' + (50 - s / 2) +
                 '" width="' + s + '" height="' + s + '" rx="2.5" fill="none" ' +
                 'stroke="var(--accent)" stroke-width="1.5" opacity="' +
                 (0.09 + i * 0.05).toFixed(2) + '" transform="rotate(' +
                 (i * 9) + ' 50 50)"/>';
        }).join("");
    }

    return '<svg class="cover-art" viewBox="0 0 100 100" ' +
           'preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
           shapes + "</svg>";
  }

  function mediaSlot(p, label) {
    return '<div class="media-slot">' +
             coverArt(p) +
             '<span class="cover-initials" aria-hidden="true">' +
               esc(initials(p.title)) +
             "</span>" +
             '<span class="slot-chip">' + ICONS.film + esc(label) + "</span>" +
           "</div>";
  }

  function cardMedia(p) {
    const m = p.media || {};

    if (m.images && m.images.length) {
      return '<img src="' + esc(m.images[0]) + '" alt="' + esc(p.title) +
             ' screenshot" loading="lazy">';
    }
    if (m.poster) {
      return '<img src="' + esc(m.poster) + '" alt="' + esc(p.title) +
             '" loading="lazy">';
    }
    return mediaSlot(p, p.kind === "client" ? "Media under NDA" : "Cover art — video coming soon");
  }

  function cardHTML(p, index) {
    const badge = p.kind === "client"
      ? '<span class="badge">' + ICONS.lock + "Client work</span>"
      : '<span class="badge">' + ICONS.user + "Personal work</span>";

    /* The corner chip always uses `type` — it is short by construction, and
       the two badges sit in opposite corners with nothing to stop a long one
       running into the other. A longer, more readable `typeLabel` (where one
       exists) is shown in the modal's meta row instead. */
    const typeBadge = p.type
      ? '<span class="badge badge-type">' + esc(p.type) + "</span>"
      : "";

    return (
      '<button class="card" type="button" data-id="' + esc(p.id) +
        '" data-kind="' + esc(p.kind) + '" style="transition-delay:' +
        (index % 3) * 70 + 'ms">' +
        badge +
        typeBadge +
        '<div class="card-media">' + cardMedia(p) + "</div>" +
        '<div class="card-body">' +
          '<div class="card-top">' +
            '<h3 class="card-title">' + esc(p.title) + "</h3>" +
          "</div>" +
          '<p class="card-blurb">' + esc(p.blurb) + "</p>" +
          '<div class="tags">' +
            p.tech.slice(0, 4).map(t => '<span class="tag">' + esc(t) + "</span>").join("") +
          "</div>" +
          '<span class="card-cta">View details' + ICONS.arrow + "</span>" +
        "</div>" +
      "</button>"
    );
  }

  /* -------------------------------------------------------- filters ----
     One row: project type (2D/3D/VR/AR/AVP). The chips are derived from the
     data, so adding a project with a new type adds its chip automatically.
     Personal vs client is shown as a badge on each card, not filtered.     */

  /* "2D with multiplayer" and "2D tool" both filter under "2D" */
  function baseType(t) {
    return t ? String(t).split(" ")[0] : "";
  }

  const TYPE_ORDER = ["2D", "3D", "VR", "AR", "AVP"];

  const types = [...new Set(PROJECTS.map(p => baseType(p.type)).filter(Boolean))]
    .sort(function (a, b) {
      const ia = TYPE_ORDER.indexOf(a), ib = TYPE_ORDER.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
    });

  let activeType = "all";

  $("#typeFilters").innerHTML =
    '<button class="chip is-active" data-type="all" type="button">All</button>' +
    types.map(function (t) {
      return '<button class="chip" data-type="' + esc(t) + '" type="button">' +
             esc(t) + "</button>";
    }).join("");

  function render() {
    const list = activeType === "all"
      ? PROJECTS
      : PROJECTS.filter(p => baseType(p.type) === activeType);

    grid.innerHTML = list.map(cardHTML).join("");
    emptyNote.hidden = list.length > 0;
    observeCards();
  }

  $$("#typeFilters .chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      $$("#typeFilters .chip").forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeType = chip.dataset.type;
      render();
    });
  });

  render();


  /* ---------------------------------------------------------- modal ---- */

  const modal       = $("#modal");
  const modalScroll = $("#modalScroll");
  let lastFocused   = null;

  /* One scroll container is reused for every project, so its scrollTop
     carries over unless it is dealt with. Each project remembers where it
     was left; a project opened for the first time starts at the top. */
  const scrollMemory = {};
  let openId = null;

  /* Every screenshot and clip a project has, in one ordered list. Stills
     first, moving pictures last, which is the order the thumbnails read in. */
  function mediaSlides(p) {
    const m = p.media || {};
    const slides = [];

    (m.images || []).forEach(function (src) {
      slides.push({ kind: "image", src: src });
    });
    if (m.youtube) slides.push({ kind: "youtube", id: m.youtube });
    if (m.video)   slides.push({ kind: "video", src: m.video, poster: m.poster || null });

    return slides;
  }

  function slideHTML(p, s, i) {
    const hide = i === 0 ? "" : " hidden";

    if (s.kind === "image") {
      return '<div class="gal-slide"' + hide + ' data-kind="image">' +
               '<img src="' + esc(s.src) + '" alt="' + esc(p.title) +
               ' screenshot" loading="lazy">' +
             "</div>";
    }

    if (s.kind === "video") {
      return '<div class="gal-slide"' + hide + ' data-kind="video">' +
               "<video controls playsinline preload=\"metadata\"" +
               (s.poster ? ' poster="' + esc(s.poster) + '"' : "") +
               '><source src="' + esc(s.src) + '" type="video/mp4">' +
               "Your browser cannot play this video.</video>" +
             "</div>";
    }

    /* Left empty on purpose: activateSlide() builds the real YouTube player
       the moment this slide is actually shown. That gives YouTube's own
       poster, red play button and letterboxing — and still asks YouTube for
       nothing until a visitor looks at the video. */
    return '<div class="gal-slide"' + hide + ' data-kind="youtube" data-yt="' +
             esc(s.id) + '"></div>';
  }

  function thumbHTML(p, s, i) {
    const active = i === 0 ? " is-active" : "";

    if (s.kind === "image") {
      return '<button class="gal-thumb' + active + '" type="button" data-go="' + i +
               '" aria-label="View screenshot ' + (i + 1) + '">' +
               '<img src="' + esc(s.src) + '" alt="" loading="lazy">' +
             "</button>";
    }

    const poster = s.kind === "youtube"
      ? '<img src="https://img.youtube.com/vi/' + esc(s.id) + '/default.jpg" alt="" loading="lazy">'
      : (s.poster ? '<img src="' + esc(s.poster) + '" alt="" loading="lazy">' : "");

    return '<button class="gal-thumb gal-thumb-play' + active + '" type="button" data-go="' + i +
             '" aria-label="View video">' + poster +
             '<span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span>' +
           "</button>";
  }

  function modalMedia(p) {
    const slides = mediaSlides(p);

    /* nothing to show yet — use a slim banner rather than an empty 16:9 hole */
    if (!slides.length) {
      return '<div class="modal-media is-empty">' +
             mediaSlot(p, p.kind === "client" ? "Media under NDA" : "Gameplay video coming soon") +
             "</div>";
    }

    const many = slides.length > 1;

    return '<div class="gallery" data-index="0">' +
             '<div class="modal-media gal-stage">' +
               slides.map((s, i) => slideHTML(p, s, i)).join("") +
               (many
                 ? '<button class="gal-nav gal-prev" type="button" aria-label="Previous">' +
                     '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>' +
                   '<button class="gal-nav gal-next" type="button" aria-label="Next">' +
                     '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>' +
                   '<span class="gal-count"><b>1</b> / ' + slides.length + "</span>"
                 : "") +
             "</div>" +
             (many
               ? '<div class="gal-thumbs">' +
                   slides.map((s, i) => thumbHTML(p, s, i)).join("") +
                 "</div>"
               : "") +
           "</div>";
  }

  /* ------------------------------------------------- gallery control --- */

  function galleryGo(gal, next) {
    const slides = $$(".gal-slide", gal);
    if (!slides.length) return;

    const count = slides.length;
    const to = (next + count) % count;
    const from = Number(gal.dataset.index || 0);
    if (to === from && gal.dataset.ready) return;

    /* leaving a slide: stop whatever was playing on it. Tearing the iframe
       out is what actually stops YouTube — it would otherwise keep playing
       behind a hidden slide. */
    const leaving = slides[from];
    if (leaving && from !== to) {
      const v = $("video", leaving);
      if (v) v.pause();
      const frame = $("iframe", leaving);
      if (frame) frame.remove();
    }

    slides.forEach((s, i) => { s.hidden = i !== to; });
    activateSlide(slides[to]);
    $$(".gal-thumb", gal).forEach((t, i) => t.classList.toggle("is-active", i === to));

    const counter = $(".gal-count b", gal);
    if (counter) counter.textContent = String(to + 1);

    gal.dataset.index = to;
    gal.dataset.ready = "1";
  }

  /* Build the YouTube player for a slide the moment it is shown. Not on
     click: the point is that the visitor sees YouTube's own player sitting
     there ready, exactly as it looks on YouTube. */
  function activateSlide(slide) {
    if (!slide || slide.dataset.kind !== "youtube") return;
    if ($("iframe", slide) || $(".yt-blocked", slide)) return;   // already built

    const id = slide.dataset.yt;

    /* A page opened straight off disk has no origin, so the embed sends no
       Referer and YouTube refuses it with "Video player configuration error
       (Error 153)". No embed can work from file://, so say so plainly rather
       than showing YouTube's error. Served over http — serve.ps1, or the
       deployed site — this branch never runs. */
    if (location.protocol === "file:") {
      const msg = document.createElement("div");
      msg.className = "yt-blocked";
      msg.innerHTML =
        "<p><strong>Inline playback needs the page served over http://</strong></p>" +
        "<p>Opened straight from a file, the browser sends no address for " +
        "YouTube to check against, so it refuses to embed. Run " +
        "<code>serve.ps1</code> and open <code>localhost:8099</code>, or use " +
        "the published site.</p>" +
        '<a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="' +
          "https://www.youtube.com/watch?v=" + encodeURIComponent(id) +
        '">Watch on YouTube</a>';
      slide.appendChild(msg);
      return;
    }

    /* no autoplay — YouTube shows its poster and its own play button, and
       the visitor decides */
    const frame = document.createElement("iframe");
    frame.src = "https://www.youtube.com/embed/" + encodeURIComponent(id) + "?rel=0";
    frame.title = "Gameplay video";
    frame.allow = "accelerometer; clipboard-write; encrypted-media; picture-in-picture";
    frame.allowFullscreen = true;
    slide.appendChild(frame);
  }

  /* one delegated listener, since the gallery is rebuilt on every open */
  modalScroll.addEventListener("click", function (e) {
    const gal = e.target.closest ? e.target.closest(".gallery") : null;
    if (!gal) return;

    const thumb = e.target.closest(".gal-thumb");
    if (thumb) { galleryGo(gal, Number(thumb.dataset.go)); return; }

    if (e.target.closest(".gal-prev")) { galleryGo(gal, Number(gal.dataset.index || 0) - 1); return; }
    if (e.target.closest(".gal-next")) { galleryGo(gal, Number(gal.dataset.index || 0) + 1); }
  });

  /* Optional pull quote under the blurb — an array of lines, kept as separate
     lines rather than one wrapped sentence because the break is the point. */
  function taglineHTML(p) {
    if (!p.tagline || !p.tagline.length) return "";
    const lines = Array.isArray(p.tagline) ? p.tagline : [p.tagline];
    return '<p class="modal-tagline">' +
           lines.map(t => "<span>" + esc(t) + "</span>").join("") +
           "</p>";
  }

  /* Optional lead paragraphs, sitting between the meta row and the bullets. */
  function leadHTML(p) {
    if (!p.lead || !p.lead.length) return "";
    return '<div class="modal-lead">' +
           p.lead.map(t => "<p>" + esc(t) + "</p>").join("") +
           "</div>";
  }

  /* Optional long-form write-up. A section carries either `body` (an array of
     paragraphs) or `items` (labelled entries, e.g. one bug and its fix each).
     Projects without a `sections` block simply skip all of this. */
  function sectionsHTML(p) {
    if (!p.sections || !p.sections.length) return "";

    return p.sections.map(function (s) {
      let inner = "";

      if (s.body && s.body.length) {
        inner += '<div class="modal-body">' +
                 s.body.map(t => "<p>" + esc(t) + "</p>").join("") +
                 "</div>";
      }
      if (s.stats && s.stats.length) {
        inner += '<ul class="fig-grid">' +
                 s.stats.map(function (f) {
                   return "<li><strong>" + esc(f.value) + "</strong>" +
                          "<span>" + esc(f.label) + "</span></li>";
                 }).join("") +
                 "</ul>";
      }
      if (s.bullets && s.bullets.length) {
        inner += '<ul class="hl-list">' +
                 s.bullets.map(t => "<li>" + esc(t) + "</li>").join("") +
                 "</ul>";
      }
      if (s.steps && s.steps.length) {
        inner += '<ol class="step-list">' +
                 s.steps.map(t => "<li>" + esc(t) + "</li>").join("") +
                 "</ol>";
      }
      if (s.items && s.items.length) {
        inner += '<dl class="spec-list">' +
                 s.items.map(function (i) {
                   return "<div><dt>" + esc(i.label) + "</dt>" +
                          "<dd>" + esc(i.text) + "</dd></div>";
                 }).join("") +
                 "</dl>";
      }
      /* closing paragraphs, for the line that lands after a list */
      if (s.after && s.after.length) {
        inner += '<div class="modal-body">' +
                 s.after.map(t => "<p>" + esc(t) + "</p>").join("") +
                 "</div>";
      }

      return '<h4 class="modal-h">' + esc(s.heading) + "</h4>" + inner;
    }).join("");
  }

  /* `detail` is a single string on most projects and an array of paragraphs
     on the longer write-ups. Both render into the same accent callout. */
  function detailHTML(p) {
    if (!p.detail || !p.detail.length) return "";
    const paras = Array.isArray(p.detail) ? p.detail : [p.detail];
    return '<div class="modal-detail">' +
           paras.map(t => "<p>" + esc(t) + "</p>").join("") +
           "</div>";
  }

  /* Extra screenshots used to sit in a grid below the write-up; they are all
     in the gallery at the top now, so there is nothing left to repeat here. */

  function openModal(id) {
    const p = PROJECTS.find(x => x.id === id);
    if (!p) return;

    lastFocused = document.activeElement;

    modalScroll.innerHTML =
      modalMedia(p) +
      '<div class="modal-inner">' +
        '<p class="modal-eyebrow" id="modalTitle">' +
          esc(p.kind === "client" ? (p.client || "Client work") : "Personal project") +
        "</p>" +
        '<h2 class="modal-title">' + esc(p.title) + "</h2>" +
        '<p class="modal-blurb">' + esc(p.blurb) + "</p>" +

        taglineHTML(p) +

        '<dl class="meta-row">' +
          "<div><dt>Role</dt><dd>" + esc(p.role) + "</dd></div>" +
          (p.type ? "<div><dt>Type</dt><dd>" + esc(p.typeLabel || p.type) + "</dd></div>" : "") +
          "<div><dt>Built with</dt><dd>" + esc(p.tech.join(", ")) + "</dd></div>" +
          (p.platform ? "<div><dt>Platform</dt><dd>" + esc(p.platform) + "</dd></div>" : "") +
          (p.status ? "<div><dt>Status</dt><dd>" + esc(p.status) + "</dd></div>" : "") +
          /* any further label/value pairs a project wants in the meta row */
          ((p.meta || []).map(function (x) {
            return "<div><dt>" + esc(x.label) + "</dt><dd>" + esc(x.value) + "</dd></div>";
          }).join("")) +
        "</dl>" +

        leadHTML(p) +

        (p.highlights && p.highlights.length
          ? '<h4 class="modal-h">' +
              esc(p.highlightsHeading || "What it does") +
            "</h4>" +
            '<ul class="hl-list">' +
              p.highlights.map(h => "<li>" + esc(h) + "</li>").join("") +
            "</ul>"
          : "") +

        sectionsHTML(p) +

        detailHTML(p) +

        /* a closing notice — confidentiality, licensing and the like.
           One string or several paragraphs. */
        (p.note
          ? '<div class="modal-note">' + ICONS.lock + "<div>" +
              (Array.isArray(p.note) ? p.note : [p.note])
                .map(t => "<p>" + esc(t) + "</p>").join("") +
            "</div></div>"
          : "") +
      "</div>";

    modal.hidden = false;
    document.body.classList.add("no-scroll");

    /* the first slide is showing already, so it never goes through
       galleryGo() — matters for a project whose only medium is a video */
    activateSlide($(".gal-slide:not([hidden])", modalScroll));

    /* Restore before focusing: focus() on an element inside a scroll
       container can scroll it, which would undo this. */
    openId = id;
    restoreScroll(id);

    $("#modalClose").focus();
    restoreScroll(id);
  }

  /* Media loads after the markup goes in, so the panel can still be short
     when the position is first applied and a deep scrollTop gets clamped.
     Re-apply once anything that changes the height has finished loading. */
  function restoreScroll(id) {
    const target = scrollMemory[id] || 0;
    modalScroll.scrollTop = target;
    if (!target) return;

    $$("img, iframe, video", modalScroll).forEach(function (el) {
      if (el.complete) return;
      el.addEventListener("load", function () {
        if (openId === id) modalScroll.scrollTop = target;
      }, { once: true });
    });
  }

  function closeModal() {
    if (modal.hidden) return;

    const video = $("video", modalScroll);
    if (video) video.pause();

    /* Save before clearing — emptying the container resets scrollTop to 0. */
    if (openId) scrollMemory[openId] = modalScroll.scrollTop;
    openId = null;

    modal.hidden = true;
    modalScroll.innerHTML = "";
    document.body.classList.remove("no-scroll");
    if (lastFocused) lastFocused.focus();
  }

  grid.addEventListener("click", function (e) {
    const card = e.target.closest(".card");
    if (card) openModal(card.dataset.id);
  });

  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-close")) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeModal(); closeMenu(); }

    /* arrow keys walk the gallery, unless focus is in a control that wants
       them itself (the video scrubber, say) */
    if (!modal.hidden && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
      const gal = $(".gallery", modalScroll);
      if (gal && $$(".gal-slide", gal).length > 1) {
        const tag = (document.activeElement || {}).tagName;
        if (tag !== "VIDEO" && tag !== "IFRAME") {
          e.preventDefault();
          galleryGo(gal, Number(gal.dataset.index || 0) + (e.key === "ArrowRight" ? 1 : -1));
        }
      }
    }

    /* keep tab focus inside the open dialog */
    if (e.key === "Tab" && !modal.hidden) {
      const focusable = $$(
        'button, a[href], video, iframe, [tabindex]:not([tabindex="-1"])', modal
      ).filter(el => el.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });


  /* --------------------------------------------------- mobile menu ----- */

  const menuBtn = $("#menuBtn");
  const nav     = $(".nav");

  function closeMenu() {
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  menuBtn.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  $$(".nav a").forEach(a => a.addEventListener("click", closeMenu));


  /* ------------------------------------------- header + scrollspy ------ */

  const header   = $("#siteHeader");
  const toTop    = $("#toTop");
  /* in document order — the scrollspy takes the last one past the threshold */
  const sections = ["top", "about", "work", "contact"].map(id => $("#" + id));
  const navLinks = $$(".nav a");

  let ticking = false;

  function onScroll() {
    const y = window.scrollY;

    header.classList.toggle("is-stuck", y > 8);
    toTop.hidden = y < 600;

    let current = "";
    sections.forEach(function (sec) {
      if (sec && sec.getBoundingClientRect().top <= 140) current = sec.id;
    });

    navLinks.forEach(function (link) {
      link.classList.toggle("is-current", link.getAttribute("href") === "#" + current);
    });

    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  onScroll();

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  /* -------------------------------------------------- custom cursor ----
     A dot that tracks exactly plus a ring that eases in behind it, and
     opens up over anything clickable.

     Deliberately skipped for touch/coarse pointers (there is no cursor to
     replace) and for anyone who has asked for reduced motion — hiding the
     native pointer from them would be a bad trade. If this never runs, the
     `has-cursor` class is never added and the normal cursor stays.        */

  (function customCursor() {
    const finePointer   = window.matchMedia("(pointer: fine)").matches;
    const wantsLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || wantsLessMotion) return;

    const ring = document.createElement("div");
    const dot  = document.createElement("div");
    ring.className = "cursor-ring";
    dot.className  = "cursor-dot";
    ring.innerHTML = "<i></i>";
    dot.innerHTML  = "<i></i>";
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    const root = document.documentElement;
    root.classList.add("has-cursor");

    const HOVERABLE = 'a, button, .card, .chip, [role="button"], summary';

    let mouseX = -200, mouseY = -200;   // true pointer
    let ringX  = -200, ringY  = -200;   // eased follower
    let frame  = null;

    function follow() {
      ringX += (mouseX - ringX) * 0.19;
      ringY += (mouseY - ringY) * 0.19;
      ring.style.transform = "translate3d(" + ringX + "px," + ringY + "px,0)";

      if (Math.abs(mouseX - ringX) > 0.2 || Math.abs(mouseY - ringY) > 0.2) {
        frame = requestAnimationFrame(follow);
      } else {
        frame = null;                    // settle, stop burning frames
      }
    }

    document.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;

      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = "translate3d(" + mouseX + "px," + mouseY + "px,0)";

      if (!root.classList.contains("cursor-on")) root.classList.add("cursor-on");
      if (!frame) frame = requestAnimationFrame(follow);

      const over = e.target && e.target.closest && e.target.closest(HOVERABLE);
      root.classList.toggle("cursor-hover", !!over);
    }, { passive: true });

    document.addEventListener("pointerdown",  () => root.classList.add("cursor-down"));
    document.addEventListener("pointerup",    () => root.classList.remove("cursor-down"));

    /* leaving the window entirely — fade both out */
    document.addEventListener("mouseleave", () => root.classList.remove("cursor-on"));
    document.addEventListener("mouseenter", () => root.classList.add("cursor-on"));
  })();

})();
