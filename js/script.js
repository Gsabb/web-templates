/* ==========================================================================
   SCRIPT.JS — theme engine + small UI behaviors
   --------------------------------------------------------------------------
   THEMES is an object: { CategoryKey: { label, c, img?, classic?, v: [variants] } }
   - Add a variant  -> push { file: "Fashion_2", hero, about, cta, gallery:[5] } into that category's v
   - Add a category -> add a new key (needs c + s content, and variants with images)
   - RANDOM mode    -> "classic": true. Your older, non-cover themes: no content swap,
                       no cover hero; just list their css filenames (without .css).
   ========================================================================== */

const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const G = (...ids) => ids.map((i) => U(i));
const TEAM = ["1507003211169-0a1dd7228f2d", "1494790108377-be9c29b29330", "1500648767791-00dcc994a43e", "1438761681033-6461ffad8d80"].map((i) => U(i, 500));

const THEMES = {
  Restaurant: {
    label: "Restaurant",
    c: { brand: "Maison Braise", eyebrow: "Cuisine de saison · Montréal", h1: "Une table pensée pour les longues soirées", lead: "Produits locaux, cuisson au feu de bois et service chaleureux. Réservez votre table et laissez-nous faire le reste.", cta: "Réserver une table", cta2: "Voir la carte", aboutTitle: "Une cuisine généreuse, des producteurs d'ici", servicesNav: "Menu", servicesTitle: "Notre carte", galleryNav: "Ambiance", galleryEyebrow: "Dans l'assiette", galleryTitle: "Un avant-goût de la table", ctaTitle: "Une table vous attend ce soir", ctaText: "Réservations ouvertes du mardi au dimanche. Groupes et événements privés sur demande.", tagline: "Restaurant de quartier, cuisine au feu de bois et produits du terroir.",
      s: [["Entrées à partager", "Légumes rôtis, burrata maison et petites assiettes pour ouvrir l'appétit."], ["Pâtes maison", "Roulées chaque matin et servies avec des sauces mijotées lentement."], ["Cuissons au feu", "Viandes maturées et poissons saisis sur braises de chêne."], ["Poissons du jour", "Arrivages locaux, préparés simplement pour respecter le produit."], ["Desserts signature", "Crèmes, fruits de saison et pâtisseries réalisées sur place."], ["Cave & cocktails", "Vins nature, cocktails d'auteur et sélection de bières artisanales."]] },
    v: [
      { file: "Restaurant_0", hero: U("1517248135467-4c7edcad34c4", 2000), cta: U("1559339352-11d035aa65de", 1800), about: U("1414235077428-338989a2e8c0"), gallery: G("1504674900247-0877df9cc836", "1476224203421-9ac39bcb3327", "1555396273-367ea4eb4db5", "1565299624946-b28f40a0ae38", "1540189549336-e6e99c3679fe") },
      { file: "Restaurant_1", c: { brand: "Café Olive", eyebrow: "Bistro & café · Montréal", h1: "Frais, local et fait avec amour", lead: "Brunchs gourmands, plats du jour et cafés torréfiés à deux pas. Venez comme vous êtes." }, hero: U("1514933651103-005eec06c04b", 2000), cta: U("1424847651672-bf20a4b0982b", 1800), about: U("1550966871-3ed3cdb5ed0c"), gallery: G("1546069901-ba9599a7e63c", "1482049016688-2d3e1b311543", "1493770348161-369560ae357d", "1432139555190-58524dae6a55", "1551782450-a2132b4ba21d") },
    ],
  },
  Fashion: {
    label: "Fashion",
    c: { brand: "Atelier Soie", eyebrow: "Collection Automne · Hiver", h1: "L'élégance, sans effort", lead: "Des pièces intemporelles, coupées dans des matières nobles et pensées pour durer au-delà des saisons.", cta: "Découvrir la collection", cta2: "Notre univers", aboutTitle: "Des pièces intemporelles, façonnées avec soin", servicesNav: "Collections", servicesTitle: "Nos univers", galleryNav: "Lookbook", galleryEyebrow: "Lookbook", galleryTitle: "La saison en images", ctaTitle: "Habillez votre saison", ctaText: "Livraison offerte dès 150 $ et retours gratuits sous 30 jours.", tagline: "Mode contemporaine, fabrication responsable, créée à Montréal.",
      s: [["Prêt-à-porter", "Des silhouettes épurées à associer et à superposer."], ["Sur mesure", "Une pièce unique, ajustée à votre morphologie."], ["Accessoires", "Foulards, ceintures et bijoux pour finir chaque tenue."], ["Maroquinerie", "Sacs en cuir végétal tanné, cousus à la main."], ["Essentiels", "Les basiques indispensables, réinventés chaque saison."], ["Conseil en style", "Un rendez-vous privé pour composer votre garde-robe."]] },
    v: [
      { file: "Fashion_0", hero: U("1469334031218-e382a71b716b", 2000), cta: U("1496747611176-843222e1e57c", 1800), about: U("1441986300917-64674bd600d8"), gallery: G("1445205170230-053b83016050", "1490481651871-ab68de25d43d", "1515886657613-9f3515b0c78f", "1558769132-cb1aea458c5e", "1483985988355-763728e1935b") },
      { file: "Fashion_1", c: { brand: "Maison Rose", eyebrow: "Nouvelle collection · Printemps", h1: "Osez l'audace du quotidien", lead: "Couleurs douces, coupes franches : une garde-robe qui vous ressemble, du matin jusqu'au soir." }, hero: U("1539109136881-3be0616acf4b", 2000), cta: U("1581044777550-4cfa60707c03", 1800), about: U("1509631179647-0177331693ae"), gallery: G("1524504388940-b1c1722653e1", "1488161628813-04466f872be2", "1529139574466-a303027c1d8b", "1485968579580-b6d095142e6e", "1532453288672-3a27e9be9efd") },
    ],
  },
  Agency: {
    label: "Agency",
    c: { brand: "Studio Nova", eyebrow: "Agence créative · Branding & digital", h1: "Des idées audacieuses qui font avancer les marques", lead: "Nous concevons des identités, des sites et des campagnes qui captent l'attention et génèrent des résultats mesurables.", cta: "Lancer un projet", cta2: "Voir nos réalisations", aboutTitle: "Stratèges, designers et bâtisseurs de marques", servicesNav: "Expertises", servicesTitle: "Ce que nous créons", galleryNav: "Projets", galleryEyebrow: "Portfolio", galleryTitle: "Projets récents", ctaTitle: "Votre prochain grand projet commence ici", ctaText: "Racontez-nous votre idée : nous revenons vers vous en moins de 24 heures.", tagline: "Agence créative indépendante : stratégie, design et production.",
      s: [["Identité de marque", "Logo, univers visuel et lignes directrices complètes."], ["Design web", "Sites rapides, accessibles et conçus pour convertir."], ["Stratégie digitale", "Positionnement, parcours client et plan de croissance."], ["Production vidéo", "Films de marque, publicités et contenus sociaux."], ["Réseaux sociaux", "Calendriers éditoriaux, création et gestion de communauté."], ["Packaging", "Emballages distinctifs qui se démarquent en rayon."]] },
    v: [
      { file: "Agency_0", hero: U("1522071820081-009f0129c71c", 2000), cta: U("1542744173-8e7e53415bb0", 1800), about: U("1600880292203-757bb62b4baf"), gallery: G("1559028012-481c04fa702d", "1581291518857-4e27b48ff24e", "1531297484001-80022131f5a1", "1497366216548-37526070297c", "1460925895917-afdab827c52f") },
      { file: "Agency_1", c: { brand: "Pop Studio", eyebrow: "Studio créatif indépendant", h1: "Du design qui a de la personnalité", lead: "Couleurs vives, idées franches et collaboration sans chichi : on donne du relief à votre marque." }, hero: U("1552664730-d307ca884978", 2000), cta: U("1519389950473-47ba0277781c", 1800), about: U("1553877522-43269d4ea984"), gallery: G("1561070791-2526d30994b5", "1572044162444-ad60f128bdea", "1558655146-9f40138edfeb", "1626785774573-4b799315345d", "1633356122544-f134324a6cee") },
    ],
  },
  Fitness: {
    label: "Fitness",
    c: { brand: "Pulse Studio", eyebrow: "Gym & coaching · Montréal", h1: "Repoussez vos limites", lead: "Coaching personnalisé, équipements de pointe et une communauté qui vous pousse à dépasser vos objectifs.", cta: "Essai gratuit", cta2: "Voir les programmes", aboutTitle: "Un club pensé pour votre progression", servicesNav: "Programmes", servicesTitle: "Nos programmes", galleryNav: "Le club", galleryEyebrow: "Le club", galleryTitle: "Vivez l'énergie du club", ctaTitle: "Votre première séance est offerte", ctaText: "Réservez un essai gratuit et rencontrez nos coachs. Aucun engagement.", tagline: "Club de remise en forme : coaching, cours collectifs et accompagnement.",
      s: [["Musculation guidée", "Des programmes progressifs, encadrés par nos coachs certifiés."], ["Cardio & HIIT", "Séances intenses et variées pour brûler et gagner en endurance."], ["Coaching privé", "Un suivi individuel adapté à vos objectifs et à votre rythme."], ["Cours collectifs", "Une dizaine de cours par jour, pour tous les niveaux."], ["Yoga & mobilité", "Étirements, souplesse et respiration pour mieux récupérer."], ["Nutrition", "Conseils d'habitudes alimentaires simples et durables."]] },
    v: [
      { file: "Fitness_0", hero: U("1534438327276-14e5300c3a48", 2000), cta: U("1517963879433-6ad2b056d712", 1800), about: U("1571019613454-1cb2f99b2d8b"), gallery: G("1517836357463-d25dfeac3438", "1581009146145-b5ef050c2e1e", "1599058917212-d750089bc07e", "1540497077202-7c8a3999166f", "1526506118085-60ce8714f8c5") },
      { file: "Fitness_1", c: { brand: "Studio Souffle", eyebrow: "Yoga & pilates · Montréal", h1: "Bougez avec intention", lead: "Un studio lumineux, des cours à taille humaine et un accompagnement bienveillant pour retrouver équilibre et énergie.", cta: "Réserver un cours", ctaTitle: "Votre premier cours est offert" }, hero: U("1544367567-0f2fcb009e0b", 2000), cta: U("1506126613408-eca07ce68773", 1800), about: U("1518611012118-696072aa579a"), gallery: G("1599901860904-17e6ed7083a0", "1552196563-55cd4e45efb3", "1575052814086-f385e2e2ad1b", "1545205597-3d9d02c29597", "1506126613408-eca07ce68773") },
    ],
  },
  RealEstate: {
    label: "Real Estate",
    c: { brand: "Habitat Nova", eyebrow: "Courtage immobilier · Montréal", h1: "Trouvez l'endroit où votre vie commence", lead: "Achat, vente et location : un accompagnement humain et des experts du marché local à chaque étape.", cta: "Estimer ma propriété", cta2: "Voir les propriétés", aboutTitle: "Un courtier qui connaît votre quartier", servicesNav: "Services", servicesTitle: "Nos services immobiliers", galleryNav: "Propriétés", galleryEyebrow: "Sélection", galleryTitle: "Propriétés à la une", ctaTitle: "Prêt à vendre ou à acheter?", ctaText: "Obtenez une évaluation gratuite de votre propriété en 48 heures.", tagline: "Courtiers immobiliers : achat, vente, location et investissement.",
      s: [["Achat résidentiel", "Recherche ciblée, visites et négociation à vos côtés."], ["Vente & mise en marché", "Photos, stratégie de prix et diffusion à grande échelle."], ["Location", "Mise en relation avec des locataires ou propriétaires fiables."], ["Évaluation gratuite", "Une estimation précise basée sur les ventes récentes."], ["Investissement locatif", "Analyse de rendement et choix d'immeubles porteurs."], ["Home staging", "Mettez votre propriété en valeur pour la vendre plus vite."]] },
    v: [
      { file: "RealEstate_0", hero: U("1613490493576-7fde63acd811", 2000), cta: U("1480074568708-e7b720bb3f09", 1800), about: U("1600607687939-ce8a6c25118c"), gallery: G("1564013799919-ab600027ffc6", "1600585154340-be6161a56a0c", "1600596542815-ffad4c1539a9", "1512917774080-9991f1c4c750", "1560518883-ce09059eeffa") },
      { file: "RealEstate_1", c: { brand: "Urbanis", eyebrow: "Immobilier urbain · Condos & maisons", h1: "Votre prochain chez-soi, en toute simplicité", lead: "Condos, maisons et plex : trouvez, financez et achetez avec une équipe qui parle votre langue." }, hero: U("1545324418-cc1a3fa10c00", 2000), cta: U("1448630360428-65456885c650", 1800), about: U("1502672260266-1c1ef2d93688"), gallery: G("1600566753190-17f0baa2a6c3", "1600210492486-724fe5c67fb0", "1493809842364-78817add7ffb", "1486406146926-c627a92ad1ab", "1560448204-e02f11c3d0e2") },
    ],
  },
  /* RANDOM: your older themes. List their css filenames (no .css). They keep their own
     layout/hero, so the cover mode and per-industry copy are skipped; neutral photos are used. */
  Random: {
    label: "Random",
    classic: true,
    c: {},
    img: { hero: U("1522071820081-009f0129c71c", 1200), about: U("1600880292203-757bb62b4baf"), cta: U("1542744173-8e7e53415bb0", 1800), gallery: G("1559028012-481c04fa702d", "1581291518857-4e27b48ff24e", "1531297484001-80022131f5a1", "1497366216548-37526070297c", "1460925895917-afdab827c52f") },
    v: ["nature", "sporty", "modern-minimal", "cinematic-immersive", "editorial-heritage", "friendly-local", "industrial-trades", "scrapbook", "glassmorphism", "swiss-design", "luxury-typography", "conceptual-sketch", "bento-grid", "doodle", "neobrutalism", "retro", "dark-lofi", "art-deco"].map((file) => ({ file })),
  },
};

const STORE_KEY = "gen-theme";
let current = { cat: Object.keys(THEMES)[0], idx: 0 };
let defaultTitle = "";

document.addEventListener("DOMContentLoaded", () => {
  initThemes();
  initMobileNav();
  initSmoothScroll();
  initFaqAccordion();
  initScrollReveal();
  initFooterYear();
  initAutoHideNav();
});

/* --------------------------------------------------------------------------
   Theme engine. applyTheme() = stylesheet swap + images + copy + html attrs.
   URL ?theme=Fashion_1 or ?theme=nature selects directly (also remembered).
   -------------------------------------------------------------------------- */
function findTheme(name) {
  for (const cat in THEMES) {
    const idx = THEMES[cat].v.findIndex((t) => t.file === name);
    if (idx >= 0) return { cat, idx };
  }
  return null;
}

function initThemes() {
  defaultTitle = document.title;
  // remember the HTML's own text so Random/classic themes can restore it
  document.querySelectorAll("[data-c]").forEach((el) => (el.dataset.d = el.textContent));
  let saved = null;
  try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
  current = findTheme(new URLSearchParams(location.search).get("theme") || saved) || current;
  buildSwitcher();
  applyTheme(current.cat, current.idx);
}

function applyTheme(cat, idx) {
  const category = THEMES[cat];
  idx = (idx + category.v.length) % category.v.length;
  const v = category.v[idx];
  const t = { ...(category.img || {}), ...v };          // images: variant wins over category defaults
  const c = { ...category.c, ...(v.c || {}) };           // copy: variant wins over category
  current = { cat, idx };
  const root = document.documentElement;

  // 1. stylesheet (new one loads first, old one removed on load = no flash)
  const old = document.getElementById("theme-link");
  if (!old.getAttribute("href").endsWith(`/${t.file}.css`)) {
    const next = old.cloneNode();
    next.removeAttribute("id");
    next.href = `css/${t.file}.css`;
    next.onload = () => { old.remove(); next.id = "theme-link"; };
    next.onerror = () => console.warn(`Theme file not found: css/${t.file}.css`);
    old.after(next);
  }
  root.dataset.theme = t.file;
  if (category.classic) root.removeAttribute("data-hero"); else root.dataset.hero = "cover";

  // 2. images
  if (t.hero) root.style.setProperty("--hero-image", `url("${t.hero}")`);
  if (t.cta) root.style.setProperty("--cta-image", `url("${t.cta}")`);
  const slots = { hero: t.hero, about: t.about };
  (t.gallery || []).forEach((src, i) => (slots["gallery" + (i + 1)] = src));
  TEAM.forEach((src, i) => (slots["team" + (i + 1)] = src));
  document.querySelectorAll("img[data-img]").forEach((img) => {
    const src = slots[img.dataset.img];
    if (src && img.getAttribute("src") !== src) img.src = src;
  });

  // 3. copy (missing key -> original HTML text)
  (c.s || []).forEach(([title, desc], i) => { c[`s${i + 1}t`] = title; c[`s${i + 1}d`] = desc; });
  document.querySelectorAll("[data-c]").forEach((el) => (el.textContent = c[el.dataset.c] ?? el.dataset.d));
  document.title = c.brand ? `${c.brand} — ${c.eyebrow}` : defaultTitle;

  // 4. persistence + UI
  try { localStorage.setItem(STORE_KEY, t.file); } catch (e) {}
  history.replaceState(null, "", `?theme=${t.file}${location.hash}`);
  updateSwitcher(t.file);
}

function buildSwitcher() {
  const ts = document.createElement("div");
  ts.className = "ts";
  ts.setAttribute("role", "toolbar");
  ts.setAttribute("aria-label", "Changer de thème");
  ts.innerHTML = Object.entries(THEMES).map(([k, cat]) => `<button data-cat="${k}">${cat.label}</button>`).join("") +
    `<div class="ts-var" hidden><button data-step="-1" aria-label="Thème précédent">‹</button><span></span><button data-step="1" aria-label="Thème suivant">›</button></div>`;
  ts.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.cat) applyTheme(b.dataset.cat, b.dataset.cat === current.cat ? current.idx : 0);
    else if (b.dataset.step) applyTheme(current.cat, current.idx + Number(b.dataset.step));
  });
  document.addEventListener("keydown", (e) => {            // ← / → step through the current category
    if (e.target.matches("input,textarea")) return;
    if (e.key === "ArrowRight") applyTheme(current.cat, current.idx + 1);
    if (e.key === "ArrowLeft") applyTheme(current.cat, current.idx - 1);
  });
  document.body.appendChild(ts);
}

function updateSwitcher(file) {
  const ts = document.querySelector(".ts");
  if (!ts) return;
  ts.querySelectorAll("[data-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === current.cat)));
  const list = THEMES[current.cat].v;
  const v = ts.querySelector(".ts-var");
  v.hidden = list.length < 2;
  const label = THEMES[current.cat].classic ? `${file} ${current.idx + 1}/${list.length}` : `${current.idx + 1}/${list.length}`;
  v.querySelector("span").textContent = label;
}

/* --------------------------------------------------------------------------
   Mobile navigation toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

/* Smooth scrolling for in-page anchors */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerOffset = document.querySelector(".site-header")?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 12;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

/* FAQ accordion */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;
    question.addEventListener("click", () => {
      const isOpen = question.getAttribute("aria-expanded") === "true";
      items.forEach((other) => {
        if (other === item) return;
        other.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
        const a = other.querySelector(".faq-answer");
        if (a) a.style.height = "0px";
      });
      question.setAttribute("aria-expanded", String(!isOpen));
      answer.style.height = isOpen ? "0px" : answer.scrollHeight + "px";
    });
  });
}

/* Scroll reveal */
function initScrollReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) { targets.forEach((el) => el.classList.add("is-visible")); return; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  targets.forEach((el) => observer.observe(el));
}

function initFooterYear() {
  const el = document.querySelector("[data-year]");
  if (el) el.textContent = new Date().getFullYear();
}

/* Semi-sticky header: hides on scroll down, returns on scroll up */
function initAutoHideNav() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  let lastY = window.scrollY, ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (!document.querySelector(".nav-links.is-open")) {
        if (y <= 10 || y < lastY) header.classList.remove("is-hidden");
        else if (y > lastY) header.classList.add("is-hidden");
      }
      lastY = y;
      ticking = false;
    });
  }, { passive: true });
}
