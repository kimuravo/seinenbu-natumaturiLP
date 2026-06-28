const festivalLoader = document.querySelector(".festival-loader");
const loaderCountdownDays = document.querySelector("[data-loader-countdown-days]");
const loaderStartedAt = Date.now();
if (loaderCountdownDays) {
  const loaderEventDate = new Date(2026, 7, 8);
  const loaderToday = new Date();
  const loaderTodayStart = new Date(loaderToday.getFullYear(), loaderToday.getMonth(), loaderToday.getDate());
  const loaderDiffMs = loaderEventDate.getTime() - loaderTodayStart.getTime();
  loaderCountdownDays.textContent = String(Math.max(0, Math.ceil(loaderDiffMs / 86400000)));
}
const hideFestivalLoader = () => {
  if (!festivalLoader || festivalLoader.classList.contains("is-done")) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minimumDuration = reduceMotion ? 450 : 1500;
  const elapsed = Date.now() - loaderStartedAt;
  window.setTimeout(() => {
    festivalLoader.classList.add("is-done");
    window.setTimeout(() => {
      festivalLoader.setAttribute("hidden", "");
    }, reduceMotion ? 120 : 760);
  }, Math.max(0, minimumDuration - elapsed));
};
window.addEventListener("load", hideFestivalLoader);
window.setTimeout(hideFestivalLoader, 3600);
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

const tackyChatbot = document.querySelector(".tacky-chatbot");
const tackyLauncher = document.querySelector(".tacky-chatbot__launcher");
const tackyPanel = document.querySelector(".tacky-chatbot__panel");
const tackyClose = document.querySelector(".tacky-chatbot__close");
const tackyMessages = document.querySelector(".tacky-chatbot__messages");
const tackyForm = document.querySelector(".tacky-chatbot__form");
const tackyInput = document.querySelector("#tacky-chatbot-input");

const tackyAnswers = [
  {
    keywords: ["開催", "日時", "日程", "いつ", "時間"],
    answer: "開催日は2026年8月8日（土）※小雨決行・荒天中止　9日（日）予備日、時間は16:00〜20:30だよ！",
  },
  {
    keywords: ["場所", "会場", "どこ", "須田", "公園"],
    answer: "会場は木津川市加茂町の須田公園だよ。JR加茂駅から徒歩5〜10分です！",
  },
  {
    keywords: ["アクセス", "駅", "行き方", "電車"],
    answer: "JR加茂駅から徒歩5〜10分だよ。アクセス情報のところに地図もあるから見てみてね！",
  },
  {
    keywords: ["駐車", "車", "パーキング"],
    answer: "専用駐車場のご用意はありません。お近くのコインパーキング、または公共交通機関をご利用ください。",
  },
  {
    keywords: ["タッキー", "たけのこ", "来る", "キャラ"],
    answer: "タッキーは皆が願ってくれたら来るかもね！！会場で会えたらラッキー！",
  },
  {
    keywords: ["お金", "料金", "入場", "無料"],
    answer: "入場は無料です！屋台など一部お金がかかるコーナーがあります。",
  },
  {
    keywords: ["屋台", "食べ物", "グルメ", "キッチンカー"],
    answer: "グルメ屋台やキッチンカーが大集合予定！お祭りならではの“食”を楽しんでね。",
  },
  {
    keywords: ["遊び", "縁日", "体験", "イベント", "職業"],
    answer: "縁日あそび、暗闇職業体験、アートイベントなど、家族みんなで楽しめる内容を準備中です！",
  },
];

const addTackyMessage = (message, type = "bot") => {
  if (!tackyMessages) return;
  const bubble = document.createElement("p");
  bubble.className = `tacky-chatbot__message tacky-chatbot__message--${type}`;
  bubble.textContent = message;
  tackyMessages.appendChild(bubble);
  tackyMessages.scrollTop = tackyMessages.scrollHeight;
};

const getTackyAnswer = (question) => {
  const normalized = question.trim().toLowerCase();
  const matched = tackyAnswers.find(({ keywords }) => keywords.some((keyword) => normalized.includes(keyword.toLowerCase())));
  return matched?.answer || "ごめんね、その質問はまだ勉強中です！開催情報・アクセス・駐車場・屋台・タッキーのことなら答えられるよ。";
};

const openTackyChat = () => {
  tackyChatbot?.classList.add("is-open");
  tackyLauncher?.setAttribute("aria-expanded", "true");
  tackyPanel?.setAttribute("aria-hidden", "false");
  setTimeout(() => tackyInput?.focus(), 80);
};

const closeTackyChat = () => {
  tackyChatbot?.classList.remove("is-open");
  tackyLauncher?.setAttribute("aria-expanded", "false");
  tackyPanel?.setAttribute("aria-hidden", "true");
};

const toggleTackyVisibility = () => {
  if (!tackyChatbot) return;
  const hero = document.querySelector(".hero");
  const showAfter = hero ? Math.max(280, hero.offsetHeight - 120) : 520;
  const shouldShow = window.scrollY > showAfter;
  tackyChatbot.classList.toggle("is-visible", shouldShow);
  if (!shouldShow) closeTackyChat();
};

window.addEventListener("scroll", toggleTackyVisibility, { passive: true });
window.addEventListener("resize", toggleTackyVisibility);
toggleTackyVisibility();

const askTacky = (question) => {
  if (!question.trim()) return;
  addTackyMessage(question, "user");
  window.setTimeout(() => addTackyMessage(getTackyAnswer(question), "bot"), 180);
};

tackyLauncher?.addEventListener("click", () => {
  if (tackyChatbot?.classList.contains("is-open")) {
    closeTackyChat();
  } else {
    openTackyChat();
  }
});

tackyClose?.addEventListener("click", closeTackyChat);

document.querySelectorAll("[data-tacky-question]").forEach((button) => {
  button.addEventListener("click", () => askTacky(button.dataset.tackyQuestion || button.textContent));
});

tackyForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = tackyInput?.value || "";
  askTacky(question);
  if (tackyInput) tackyInput.value = "";
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
  if (event.key === "Escape") closeNav();
  if (event.key === "Escape") closeTackyChat();
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
    lenis.on("scroll", toggleTackyVisibility);

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
