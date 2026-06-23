const pageTopButton = document.querySelector(".pagetop");
const nav = document.querySelector(".header-nav");
const navToggle = document.querySelector(".nav-toggle");
const countdownDays = document.querySelector("[data-countdown-days]");
const modalOpenButtons = document.querySelectorAll("[data-modal-open]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
let activeModal = null;
let lastFocusedElement = null;

const togglePageTop = () => {
  pageTopButton.classList.toggle("is-visible", window.scrollY > 500);
};

pageTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", togglePageTop, { passive: true });
togglePageTop();

const updateCountdown = () => {
  if (!countdownDays) return;
  const eventDate = new Date(2026, 7, 8);
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffMs = eventDate.getTime() - todayStart.getTime();
  const diffDays = Math.max(0, Math.ceil(diffMs / 86400000));
  countdownDays.textContent = String(diffDays);
};

updateCountdown();

const closeNav = () => {
  nav?.classList.remove("is-open");
  navToggle?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("is-nav-open");
};

const openNav = () => {
  nav?.classList.add("is-open");
  navToggle?.classList.add("is-open");
  navToggle?.setAttribute("aria-expanded", "true");
  document.body.classList.add("is-nav-open");
};

navToggle?.addEventListener("click", () => {
  if (nav?.classList.contains("is-open")) {
    closeNav();
  } else {
    openNav();
  }
});

document.querySelector("[data-nav-close]")?.addEventListener("click", closeNav);

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

const openModal = (modal) => {
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  activeModal = modal;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-modal-open");
  modal.querySelector("[data-modal-close]")?.focus();
};

const closeModal = () => {
  if (!activeModal) return;
  activeModal.classList.remove("is-open");
  activeModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-modal-open");
  lastFocusedElement?.focus?.();
  activeModal = null;
};

modalOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal(document.getElementById(button.dataset.modalOpen));
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});


document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const answer = document.getElementById(button.getAttribute("aria-controls"));
    const icon = button.querySelector(".faq-question__icon");
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));
    item?.classList.toggle("is-open", !isOpen);
    if (icon) icon.textContent = isOpen ? "+" : "-";
    if (answer) answer.hidden = isOpen;
  });
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
  if (event.key === "Escape") closeNav();
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.dataset.gsap = "ready";

  if (window.Lenis) {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    document.documentElement.dataset.lenis = "ready";
  }

  document.querySelectorAll(".section-title, .feature-card, .info-card, .booth-group, .map-area, .venue-map-button").forEach((element) => {
    element.classList.add("stamp-pop");
  });

  gsap.set([
    ".intro__grid",
    ".festival-summary",
    ".story-copy",
    ".character-bubble",
    ".section-title",
    ".photo-card",
    ".info-card",
    ".booth-group",
    ".map-area",
    ".google-map",
    ".sns-grid",
  ], {
    autoAlpha: 0,
    y: 36,
  });

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".float-icon", {
      autoAlpha: 0,
      y: -24,
      rotate: -16,
      duration: 0.7,
      stagger: 0.12,
    })
    .from(".hero__copy > *", {
      autoAlpha: 0,
      y: 28,
      duration: 0.7,
      stagger: 0.08,
    }, "-=0.25")
    .from(".hero-area", {
      autoAlpha: 0,
      y: 30,
      scale: 0.94,
      duration: 0.55,
      stagger: 0.06,
    }, "-=0.5");

  gsap.from(".hero-title-image", {
    autoAlpha: 0,
    y: 28,
    scale: 0.92,
    duration: 0.8,
    ease: "back.out(1.5)",
  });

  gsap.from(".float-bubble", {
    autoAlpha: 0,
    y: 18,
    scale: 0.74,
    duration: 0.55,
    stagger: 0.1,
    ease: "back.out(1.7)",
    delay: 0.35,
  });

  gsap.to(".float-icon--one", {
    y: 16,
    rotate: 7,
    duration: 3.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".float-icon--two", {
    y: -14,
    rotate: -6,
    duration: 4.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".float-icon--three", {
    y: 18,
    rotate: -8,
    duration: 4.1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.utils.toArray(".float-bubble").forEach((bubble, index) => {
    gsap.to(bubble, {
      y: index % 2 === 0 ? -16 : 16,
      x: index % 2 === 0 ? 8 : -8,
      rotate: index % 2 === 0 ? 4 : -4,
      duration: 2.6 + index * 0.35,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  gsap.utils.toArray(".intro__grid, .festival-summary, .story-copy, .character-bubble, .section-title, .photo-card, .info-card, .booth-group, .map-area, .google-map, .sns-grid").forEach((element) => {
    gsap.to(element, {
      autoAlpha: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 84%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.utils.toArray(".stamp-pop").forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: "top 86%",
      onEnter: () => element.classList.add("isActive"),
      onLeaveBack: () => element.classList.remove("isActive"),
    });
  });

  gsap.from(".feature-card", {
    autoAlpha: 0,
    y: 48,
    scale: 0.94,
    duration: 0.75,
    ease: "back.out(1.4)",
    stagger: 0.14,
    scrollTrigger: {
      trigger: ".feature-grid",
      start: "top 78%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.to(".hero__poster-bg img", {
    scale: 1.07,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
    },
  });

  gsap.to(".hero-area-links", {
    y: -36,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
    },
  });
}
