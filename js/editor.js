/* ==========================================================================
   EDITOR.JS — side-panel form for the live preview (window.Site comes from script.js).
   Builds itself from the GROUPS schema below. To make a NEW piece of content editable:
   1) give its element data-c="key" (text) or data-img="slot" (image) in index.html,
   2) add one line (T / A / I) to the right group here. That's all.
   ========================================================================== */
(() => {
  const S = window.Site;
  if (!S) return;
  const st = S.state;
  const reg = [];                      // field refreshers
  let raf = 0, tmr = 0;

  /* ---------- tiny DOM helper ---------- */
  const h = (tag, props = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === "class") n.className = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) n.setAttribute(k, v === true ? "" : v);
    }
    kids.flat().forEach((c) => n.append(c));
    return n;
  };

  /* ---------- SCHEMA: what the form contains ---------- */
  const T = (k, l) => ({ k, l });                       // one-line text
  const A = (k, l) => ({ k, l, area: true });           // multi-line text
  const I = (img, l, o = {}) => ({ img, l, ...o });     // image slot
  const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i + 1)).flat();
  /* rl: fields of a dynamic list, one set per possible item (up to LISTS[list].max); each knows its list + position
     so the form can hide the ones beyond the current count. */
  const rl = (list, f, extra = {}) => Array.from({ length: S.LISTS[list].max }, (_, i) => f(i + 1).flat().map((x) => ({ ...x, list, n: i + 1, ...extra }))).flat();
  const GROUPS = [
    { t: "Menu & navigation", f: [T("navAbout", "Lien « À propos »"), T("servicesNav", "Lien « Services »"), T("navTeam", "Lien « Équipe »"), T("galleryNav", "Lien « Galerie »"), T("navReviews", "Lien « Avis »"), T("navFaq", "Lien « Questions »"), T("navContact", "Lien « Contact »")] },
    { t: "Accueil (hero)", open: true, f: [T("eyebrow", "Sur-titre"), T("h1", "Titre principal"), A("lead", "Accroche"), T("cta", "Bouton principal"), T("cta2", "Bouton secondaire"), I("hero", "Photo principale"), { toggle: "heroStats" }, ...rl("heroStats", (i) => [T(`hs${i}v`, `Chiffre ${i}`), T(`hs${i}l`, `Légende ${i}`)], { needs: "heroStats" })] },
    { t: "À propos", f: [T("aboutEyebrow", "Sur-titre"), T("aboutTitle", "Titre"), A("aboutP1", "Paragraphe 1"), A("aboutP2", "Paragraphe 2"), I("about", "Photo"), { count: "aboutStats" }, ...rl("aboutStats", (i) => [T(`as${i}v`, `Chiffre ${i}`), T(`as${i}l`, `Légende ${i}`)])] },
    { t: "Services", f: [{ count: "services" }, T("servicesEyebrow", "Sur-titre"), T("servicesTitle", "Titre"), A("servicesIntro", "Introduction"), ...rl("services", (i) => [T(`s${i}t`, `Service ${i} · titre`), A(`s${i}d`, `Service ${i} · description`), I(`service${i}`, `Service ${i} · photo`, { svc: true })])] },
    { t: "Avantages", f: [{ count: "features" }, T("featuresEyebrow", "Sur-titre"), T("featuresTitle", "Titre"), ...rl("features", (i) => [T(`f${i}t`, `Avantage ${i} · titre`), A(`f${i}d`, `Avantage ${i} · texte`)])] },
    { t: "Équipe", f: [{ count: "team" }, T("teamEyebrow", "Sur-titre"), T("teamTitle", "Titre"), ...rl("team", (i) => [T(`t${i}n`, `Membre ${i} · nom`), T(`t${i}r`, `Membre ${i} · rôle`), A(`t${i}d`, `Membre ${i} · description`), I(`team${i}`, `Membre ${i} · photo`)])] },
    { t: "Galerie", f: [T("galleryEyebrow", "Sur-titre"), T("galleryTitle", "Titre"), { count: "gallery" }, ...rl("gallery", (i) => [I(`gallery${i}`, `Photo ${i}`)])] },
    { t: "Témoignages", f: [{ count: "testimonials" }, T("reviewsEyebrow", "Sur-titre"), T("reviewsTitle", "Titre"), ...rl("testimonials", (i) => [A(`r${i}q`, `Avis ${i} · citation`), T(`r${i}n`, `Avis ${i} · nom`), T(`r${i}r`, `Avis ${i} · précision`)])] },
    { t: "Questions fréquentes", f: [{ count: "faq" }, T("faqEyebrow", "Sur-titre"), T("faqTitle", "Titre"), ...rl("faq", (i) => [T(`q${i}q`, `Question ${i}`), A(`q${i}a`, `Réponse ${i}`)])] },
    { t: "Bandeau d'action", f: [T("ctaTitle", "Titre"), A("ctaText", "Texte"), I("cta", "Photo de fond (selon le thème)")] },
    { t: "Contact", f: [T("contactEyebrow", "Sur-titre"), T("contactTitle", "Titre"), A("contactIntro", "Introduction"), T("phone", "Téléphone"), T("email", "Courriel"), T("address", "Adresse"), T("hours", "Heures"), T("formName", "Champ « Nom »"), T("formPhone", "Champ « Téléphone »"), T("formEmail", "Champ « Courriel »"), T("formMessage", "Champ « Message »"), T("formSend", "Bouton d'envoi"), T("formNote", "Note sous le formulaire")] },
    { t: "Pied de page & réseaux sociaux", f: [A("tagline", "Slogan"), T("linkFacebook", "Facebook (URL, vide = masqué)"), T("linkInstagram", "Instagram (URL, vide = masqué)"), T("linkLinkedIn", "LinkedIn (URL, vide = masqué)")] },
  ];
  const isHidden = (f) => !!((f.list && S.count(f.list) < f.n) || (f.needs && st.opts[f.needs] === false));
  const SEC_LABELS = { about: "À propos", services: "Services", features: "Avantages", team: "Équipe", gallery: "Galerie", testimonials: "Témoignages", faq: "Questions", cta: "Bandeau d'action", contact: "Contact" };

  /* ---------- state helpers ---------- */
  const refreshAll = () => reg.forEach((r) => r());
  const changed = () => { S.render(); refreshAll(); save(); };
  const queue = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { S.render(); save(); }); };
  const save = () => {
    clearTimeout(tmr);
    tmr = setTimeout(() => {
      const put = (state) => localStorage.setItem("gen-project", JSON.stringify({ theme: S.themeFile, state }));
      try { put(st); } catch (e) { try { put({ ...st, images: {}, logo: null }); } catch (e2) {} }   // too big -> keep text only
    }, 500);
  };

  /* ---------- images ---------- */
  const readImage = (file, maxW, type = "image/jpeg") => new Promise((res, rej) => {
    if (/svg/.test(file.type)) { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); return; }
    const url = URL.createObjectURL(file), im = new Image();
    im.onload = () => {
      const k = Math.min(1, maxW / im.width), c = document.createElement("canvas");
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      const x = c.getContext("2d");
      if (type === "image/jpeg") { x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height); }
      x.drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      res(c.toDataURL(type, 0.84));
    };
    im.onerror = rej; im.src = url;
  });

  /* ---------- field builders ---------- */
  function textField(f) {
    const inp = f.area ? h("textarea", { rows: 3 }) : h("input", { type: "text" });
    const reset = h("button", { type: "button", class: "ed-reset", title: "Revenir à la valeur du thème", onclick: () => { delete st.text[f.k]; changed(); } }, "↺");
    inp.addEventListener("input", () => { st.text[f.k] = inp.value; reset.hidden = false; queue(); });
    reg.push(() => { if (document.activeElement !== inp) inp.value = st.text[f.k] ?? S.defaultText(f.k); reset.hidden = !(f.k in st.text); });
    const w = h("label", { class: "ed-f" }, h("span", {}, f.l), h("div", { class: "ed-row" }, inp, reset));
    reg.push(() => (w.hidden = isHidden(f)));
    return w;
  }

  function imageField(f) {
    const big = f.img === "hero" || f.img === "cta";
    const thumb = h("img", { class: "ed-thumb", alt: "" });
    const file = h("input", { type: "file", accept: "image/*", hidden: true });
    const url = h("input", { type: "url", class: "ed-url", placeholder: "…ou coller une URL" });
    const pick = h("button", { type: "button", class: "ed-btn", onclick: () => file.click() }, "Choisir…");
    const reset = h("button", { type: "button", class: "ed-reset", title: "Revenir à la photo du thème", onclick: () => { delete st.images[f.img]; url.value = ""; changed(); } }, "↺");
    file.addEventListener("change", async () => {
      if (!file.files[0]) return;
      try { st.images[f.img] = await readImage(file.files[0], big ? 1920 : 1100); changed(); } catch (e) { alert("Image illisible."); }
      file.value = "";
    });
    url.addEventListener("change", () => { if (url.value.trim()) { st.images[f.img] = url.value.trim(); changed(); } });
    reg.push(() => { thumb.src = S.imageFor(f.img); reset.hidden = !(f.img in st.images); });
    const w = h("div", { class: "ed-f ed-img" + (f.svc ? " ed-svc" : "") }, h("span", {}, f.l), h("div", { class: "ed-row" }, thumb, h("div", { class: "ed-col" }, h("div", { class: "ed-row" }, pick, reset), url), file));
    reg.push(() => (w.hidden = isHidden(f)));
    return w;
  }

  /* ---------- list size controls ---------- */
  function countBar(id) {
    const L = S.LISTS[id];
    const num = h("strong", {});
    const minus = h("button", { type: "button", class: "ed-pm", "aria-label": "Retirer le dernier élément", title: "Retirer le dernier" }, "−");
    const plus = h("button", { type: "button", class: "ed-pm", "aria-label": "Ajouter un élément", title: "Ajouter" }, "+");
    const step = (d) => { S.setCount(id, S.count(id) + d); refreshAll(); save(); };
    minus.addEventListener("click", () => step(-1)); plus.addEventListener("click", () => step(1));
    reg.push(() => { const c = S.count(id); num.textContent = c; minus.disabled = c <= L.min; plus.disabled = c >= L.max; });
    return h("div", { class: "ed-f" }, h("div", { class: "ed-count" }, h("span", {}, `${L.label} :`), minus, num, plus, h("small", {}, `min ${L.min} · max ${L.max}`)));
  }

  function statsToggle() {
    const cb = h("input", { type: "checkbox" });
    cb.addEventListener("change", () => { st.opts.heroStats = cb.checked; changed(); });
    const bar = countBar("heroStats");
    reg.push(() => { cb.checked = st.opts.heroStats !== false; bar.hidden = !cb.checked; });
    return h("div", { class: "ed-f" }, h("span", {}, "Statistiques du hero"), h("label", { class: "ed-chk" }, cb, "Afficher les statistiques (décoché : invisibles, la mise en page ne bouge pas)"), bar);
  }

  /* ---------- project block (name, logo, theme, options) ---------- */
  function projectBlock() {
    const name = textField(T("brand", "Nom de l'entreprise"));
    const logoImg = h("img", { class: "ed-thumb ed-logo", alt: "", hidden: true });
    const logoFile = h("input", { type: "file", accept: "image/*", hidden: true });
    const logoBtn = h("button", { type: "button", class: "ed-btn", onclick: () => logoFile.click() }, "Choisir un logo…");
    const logoDel = h("button", { type: "button", class: "ed-reset", title: "Retirer le logo", onclick: () => { st.logo = null; changed(); } }, "✕");
    logoFile.addEventListener("change", async () => {
      if (!logoFile.files[0]) return;
      try { st.logo = await readImage(logoFile.files[0], 520, "image/png"); changed(); } catch (e) { alert("Image illisible."); }
      logoFile.value = "";
    });
    const showName = h("input", { type: "checkbox" });
    showName.addEventListener("change", () => { st.opts.showName = showName.checked; changed(); });
    const logoWrap = h("div", { class: "ed-f" }, h("span", {}, "Logo"), h("div", { class: "ed-row" }, logoImg, logoBtn, logoDel, logoFile),
      h("label", { class: "ed-chk" }, showName, "Afficher aussi le nom à côté du logo"));

    const cat = h("select"), variant = h("select");
    Object.entries(S.THEMES).forEach(([k, c]) => cat.append(h("option", { value: k }, c.label)));
    cat.addEventListener("change", () => S.applyTheme(cat.value, 0));
    variant.addEventListener("change", () => S.applyTheme(cat.value, Number(variant.value)));
    const themeWrap = h("div", { class: "ed-f" }, h("span", {}, "Style du site"), h("div", { class: "ed-row" }, h("div", { class: "ed-grow" }, h("small", {}, "Catégorie"), cat), h("div", { class: "ed-grow" }, h("small", {}, "Design"), variant)));

    const svc = h("input", { type: "checkbox" });
    svc.addEventListener("change", () => { st.opts.svc = svc.checked; changed(); sync(); });
    const svcNote = h("small", { class: "ed-note" });
    const svcWrap = h("div", { class: "ed-f" }, h("span", {}, "Photos dans les services"), h("label", { class: "ed-chk" }, svc, "Utiliser des photos dans les services"), svcNote);

    const secs = h("div", { class: "ed-f" }, h("span", {}, "Sections affichées"));
    const grid = h("div", { class: "ed-chk-grid" });
    const boxes = Object.keys(S.SECTIONS).map((id) => {
      const cb = h("input", { type: "checkbox" });
      cb.addEventListener("change", () => { const s = new Set(st.opts.hidden); cb.checked ? s.delete(id) : s.add(id); st.opts.hidden = [...s]; changed(); });
      grid.append(h("label", { class: "ed-chk" }, cb, SEC_LABELS[id])); return [id, cb];
    });
    secs.append(grid);

    function sync() {
      cat.value = S.current.cat;
      variant.innerHTML = "";
      S.THEMES[S.current.cat].v.forEach((v, i) => variant.append(h("option", { value: i }, v.file)));
      variant.value = S.current.idx;
      const on = S.svcOn;
      svc.checked = on; showName.checked = st.opts.showName;
      logoImg.hidden = !st.logo; if (st.logo) logoImg.src = st.logo; logoDel.hidden = !st.logo;
      svcNote.textContent = on ? "✔ Chaque thème adapte l'affichage (vignette, bannière, bulle ou photo de fond)." : "Les services gardent leurs icônes.";
      document.getElementById("ed-panel")?.classList.toggle("no-svc", !on);
      boxes.forEach(([id, cb]) => (cb.checked = !st.opts.hidden.includes(id)));
    }
    reg.push(sync);
    document.addEventListener("site:theme", () => { sync(); refreshAll(); });
    return [name, logoWrap, themeWrap, svcWrap, secs];
  }

  /* ---------- export / save / load ---------- */
  const slug = (s) => (s || "site").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "site";
  const download = (name, text, type) => { const a = h("a", { href: URL.createObjectURL(new Blob([text], { type })), download: name }); document.body.append(a); a.click(); a.remove(); };

  async function exportSite() {
    const btn = document.getElementById("ed-export"); const label = btn.textContent; btn.textContent = "Génération…"; btn.disabled = true;
    try {
      const get = async (u) => { const r = await fetch(u, { cache: "no-cache" }); if (!r.ok) throw new Error(`${u} (${r.status})`); return r.text(); };
      const imports = []; let css = "";
      for (const u of ["css/base.css", "css/components.css", `css/${S.themeFile}.css`]) {
        css += (await get(u)).replace(/@import\s+url\(["']?([^"')]+)["']?\)\s*;?/g, (m, href) => { imports.push(href); return ""; }) + "\n";
      }
      const runtime = await get("js/runtime.js");
      const c = document.documentElement.cloneNode(true);
      c.querySelectorAll(".ts,.cookie-banner,#ed-root,script[src],link[rel=stylesheet]").forEach((n) => n.remove());
      c.querySelectorAll("[data-d]").forEach((n) => n.removeAttribute("data-d"));
      c.querySelectorAll(".is-visible,.is-open,.is-hidden").forEach((n) => n.classList.remove("is-visible", "is-open", "is-hidden"));
      c.querySelectorAll(".faq-answer").forEach((n) => n.removeAttribute("style"));
      c.querySelectorAll(".faq-question").forEach((n) => n.setAttribute("aria-expanded", "false"));
      c.style.removeProperty("--ts-h"); c.querySelector("body").removeAttribute("style");
      const head = c.querySelector("head");
      imports.forEach((href) => head.append(h("link", { rel: "stylesheet", href })));
      head.append(h("style", {}, css));
      const meta = head.querySelector('meta[name="description"]'); if (meta) meta.setAttribute("content", S.state.text.lead ?? S.defaultText("lead"));
      c.querySelector("body").append(h("script", {}, runtime));
      const brand = st.text.brand ?? S.defaultText("brand");
      download(`${slug(brand)}.html`, "<!DOCTYPE html>\n" + c.outerHTML, "text/html");
    } catch (e) {
      alert("Export impossible : " + e.message + "\n\nOuvrez le site via un serveur (localhost, GitHub Pages…) : les navigateurs bloquent la lecture des fichiers CSS en file://.");
    }
    btn.textContent = label; btn.disabled = false;
  }

  function templateJSON() {   // every possible key (up to each list's max) mapped to itself — matches what "Charger" accepts
    const text = { brand: "brand" }, images = {};
    GROUPS.forEach((g) => g.f.forEach((f) => { if (f.k) text[f.k] = f.k; if (f.img) images[f.img] = f.img; }));
    return { theme: S.themeFile, state: { text, images, logo: "logo", opts: { svc: true, showName: true, heroStats: true, hidden: [] } } };
  }

  function loadProject(p) {
    st.text = p.state?.text || {}; st.images = p.state?.images || {}; st.logo = p.state?.logo || null; st.counts = p.state?.counts || {};
    st.opts = { svc: true, showName: true, hidden: [], ...(p.state?.opts || {}) };
    const f = S.findTheme(p.theme);
    if (f) S.applyTheme(f.cat, f.idx); else S.render();
    refreshAll();
  }

  /* ---------- build the panel ---------- */
  function build() {
    const body = h("div", { class: "ed-body" });
    const tplBtn = h("button", { type: "button", class: "ed-tpl" });
    const paintTpl = () => { tplBtn.classList.toggle("is-on", S.template); tplBtn.textContent = S.template ? "🧩 Gabarit vide ACTIF — cliquer pour revenir" : "🧩 Afficher le gabarit vide (clés)"; };
    tplBtn.addEventListener("click", () => { S.setTemplate(!S.template); paintTpl(); });
    const tplDl = h("button", { type: "button", class: "ed-btn", title: "Télécharger un template.json vide (clés = valeurs)", onclick: () => download("template.json", JSON.stringify(templateJSON(), null, 2), "application/json") }, "⬇ .json");
    paintTpl();
    body.append(h("div", { class: "ed-tools" }, tplBtn, tplDl));
    body.append(h("details", { class: "ed-g", open: true }, h("summary", {}, "Projet & style"), ...projectBlock()));
    GROUPS.forEach((g) => {
      const d = h("details", { class: "ed-g" }, h("summary", {}, g.t));
      if (g.open) d.open = true;
      g.f.forEach((f) => d.append(f.count ? countBar(f.count) : f.toggle ? statsToggle() : f.img ? imageField(f) : textField(f)));
      body.append(d);
    });
    const load = h("input", { type: "file", accept: "application/json", hidden: true });
    load.addEventListener("change", async () => { try { loadProject(JSON.parse(await load.files[0].text())); } catch (e) { alert("Fichier de projet invalide."); } load.value = ""; });
    const foot = h("div", { class: "ed-foot" },
      h("button", { id: "ed-export", type: "button", class: "ed-primary", onclick: exportSite }, "⬇ Exporter le site (.html)"),
      h("div", { class: "ed-row" },
        h("button", { type: "button", class: "ed-btn", onclick: () => download(`${slug(st.text.brand ?? S.defaultText("brand"))}.projet.json`, JSON.stringify({ theme: S.themeFile, state: st }), "application/json") }, "💾 Projet"),
        h("button", { type: "button", class: "ed-btn", onclick: () => load.click() }, "📂 Charger"),
        h("button", { type: "button", class: "ed-btn", onclick: () => { if (confirm("Tout réinitialiser ?")) { try { localStorage.removeItem("gen-project"); } catch (e) {} loadProject({ theme: S.themeFile, state: {} }); } } }, "↺ Réinit."), load));
    const panel = h("aside", { id: "ed-panel", class: "ed-panel", "aria-label": "Éditeur de contenu" },
      h("div", { class: "ed-head" }, h("strong", {}, "Éditeur"), h("button", { type: "button", class: "ed-x", "aria-label": "Fermer", onclick: () => toggle(false) }, "✕")), body, foot);
    const tab = h("button", { type: "button", class: "ed-toggle", onclick: () => toggle() }, "✎ Éditer");
    const root = h("div", { id: "ed-root" }, tab, panel);
    document.body.append(root);
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });
    function toggle(on) { root.classList.toggle("is-open", on ?? !root.classList.contains("is-open")); }
  }

  document.addEventListener("DOMContentLoaded", () => {
    build();
    try { const p = JSON.parse(localStorage.getItem("gen-project")); if (p) loadProject(p); else refreshAll(); } catch (e) { refreshAll(); }
  });
})();
