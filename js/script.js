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
  initAutoHideNav();
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

/* --------------------------------------------------------------------------
   Semi-sticky header: stays visible by default, hides while scrolling down,
   and comes back immediately when scrolling up. Sticky positioning is kept
   in CSS; this only toggles the visibility class.
   -------------------------------------------------------------------------- */
function initAutoHideNav() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;
  let isHidden = header.classList.contains("is-hidden");
  const topRevealOffset = 10;

  const showHeader = () => {
    if (isHidden) {
      header.classList.remove("is-hidden");
      isHidden = false;
    }
  };

  const hideHeader = () => {
    if (!isHidden) {
      header.classList.add("is-hidden");
      isHidden = true;
    }
  };

  const onScrollStateChange = () => {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(() => {
      const currentY = window.scrollY;

      if (!document.querySelector(".nav-links.is-open")) {
        if (currentY <= topRevealOffset) {
          showHeader();
        } else if (currentY > lastY) {
          hideHeader();
        } else if (currentY < lastY) {
          showHeader();
        }
      }

      lastY = currentY;
      ticking = false;
    });
  };

  const onWheel = (event) => {
    if (document.querySelector(".nav-links.is-open")) return;

    if (window.scrollY <= topRevealOffset) {
      showHeader();
      return;
    }

    if (event.deltaY > 0) {
      hideHeader();
    } else if (event.deltaY < 0) {
      showHeader();
    }
  };

  [window, document].forEach((target) => {
    target.addEventListener("wheel", onWheel, { passive: true });
    target.addEventListener("scroll", onScrollStateChange, { passive: true });
  });
}
