/* ==========================================================================
   SCRIPT.JS
   Minimal, dependency-free behavior shared by every generated site.
   Each block is self-contained and guards for missing elements so the
   engine still works if a section/theme omits a piece of markup.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initSmoothScroll();
  initFaqAccordion();
  initScrollReveal();
  initFooterYear();
});

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

/* --------------------------------------------------------------------------
   Smooth scrolling for in-page anchor links
   -------------------------------------------------------------------------- */
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

/* --------------------------------------------------------------------------
   FAQ accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isOpen = question.getAttribute("aria-expanded") === "true";

      // Close any other open item (single-open accordion)
      items.forEach((other) => {
        if (other === item) return;
        const otherQuestion = other.querySelector(".faq-question");
        const otherAnswer = other.querySelector(".faq-answer");
        if (otherQuestion && otherAnswer) {
          otherQuestion.setAttribute("aria-expanded", "false");
          otherAnswer.style.height = "0px";
        }
      });

      question.setAttribute("aria-expanded", String(!isOpen));
      answer.style.height = isOpen ? "0px" : answer.scrollHeight + "px";
    });
  });
}

/* --------------------------------------------------------------------------
   Scroll reveal — IntersectionObserver, falls back gracefully
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Footer year
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const el = document.querySelector("[data-year]");
  if (el) el.textContent = new Date().getFullYear();
}
