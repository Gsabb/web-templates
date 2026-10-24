/* ==========================================================================
   RUNTIME.JS — behaviors shipped with every generated site (and the preview):
   cookie banner, mobile nav, smooth scroll, FAQ accordion, scroll reveal,
   footer year, auto-hide header. No theme/editor logic in here.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initCookies();
  initMobileNav();
  initSmoothScroll();
  initFaqAccordion();
  initScrollReveal();
  initFooterYear();
  initAutoHideNav();
});

/* --------------------------------------------------------------------------
   Cookie banner — built here (no HTML needed), styled by base.css using the
   active theme's tokens. Choice saved in localStorage ("gen-cookies").
   Preview it any time with the 🍪 button in the switcher or ?cookies in the URL.
   -------------------------------------------------------------------------- */
function initCookies() {
  let saved = null;
  try { saved = localStorage.getItem("gen-cookies"); } catch (e) {}
  if (!saved || new URLSearchParams(location.search).has("cookies")) showCookies(false);
}

function showCookies(force) {
  if (document.querySelector(".cookie-banner")) return;
  const box = document.createElement("div");
  box.className = "cookie-banner";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Témoins (cookies)");
  box.innerHTML = `<p>Nous utilisons des témoins (cookies) pour améliorer votre expérience. <a href="#">En savoir plus</a></p>
    <div class="cookie-actions"><button type="button" class="btn btn-primary" data-choice="accepted">Accepter</button><button type="button" class="cookie-decline" data-choice="declined">Refuser</button></div>`;
  box.addEventListener("click", (e) => {
    const b = e.target.closest("[data-choice]");
    if (!b) return;
    if (!force) { try { localStorage.setItem("gen-cookies", b.dataset.choice); } catch (err) {} }
    box.classList.remove("is-in");
    setTimeout(() => box.remove(), 320);
  });
  document.body.appendChild(box);
  requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add("is-in")));
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
function initFaqAccordion() {   // delegated: items added later by the editor work too
  document.addEventListener("click", (e) => {
    const question = e.target.closest(".faq-question");
    if (!question) return;
    const item = question.closest(".faq-item"), answer = item.querySelector(".faq-answer");
    const isOpen = question.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".faq-item").forEach((other) => {
      if (other === item) return;
      other.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      const a = other.querySelector(".faq-answer");
      if (a) a.style.height = "0px";
    });
    question.setAttribute("aria-expanded", String(!isOpen));
    answer.style.height = isOpen ? "0px" : answer.scrollHeight + "px";
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
