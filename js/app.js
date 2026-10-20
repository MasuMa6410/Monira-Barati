const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function setTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  themeIcon.innerHTML = isDark
    ? '<path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z"></path>'
    : '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>';
  try { localStorage.setItem("masuma-portfolio-theme", theme); } catch (_) {}
}

let initialTheme = "light";
try {
  initialTheme = localStorage.getItem("masuma-portfolio-theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
} catch (_) {
  initialTheme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
setTheme(initialTheme);
themeToggle.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  mobileMenu.hidden = isOpen;
});
mobileMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mobileMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}));

// Reveal content on scroll, with a reduced-motion fallback
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Project category filters
const filterButtons = document.querySelectorAll(".filter-chip");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach(card => {
      const categories = card.dataset.category.split(/\s+/);
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

// Use a real image when available; otherwise keep the designed placeholder artwork.
document.querySelectorAll(".project-image img").forEach(img => {
  img.addEventListener("error", () => { img.style.display = "none"; });
  img.addEventListener("load", () => { img.style.display = "block"; });
});

// Image preview modal: works with actual project image files.
const modal = document.getElementById("previewModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const modalClose = document.getElementById("modalClose");
let lastFocusedElement = null;

document.querySelectorAll(".project-image").forEach(button => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    if (!image || image.style.display === "none" || !image.complete || image.naturalWidth === 0) return;
    lastFocusedElement = button;
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalCaption.textContent = image.alt;
    modal.hidden = false;
    modalClose.focus();
  });
});
function closeModal() {
  modal.hidden = true;
  modalImage.src = "";
  if (lastFocusedElement) lastFocusedElement.focus();
}
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});

document.getElementById("year").textContent = new Date().getFullYear();

// Keep the email address in one place: update this constant and the mailto link together.
const portfolioEmail = "masumabarati0@gmail.com";
const emailLink = document.querySelector('a[href^="mailto:"]');
const copyMessage = document.getElementById("copyMessage");
emailLink.href = `mailto:${portfolioEmail}`;
document.getElementById("copyEmail").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(portfolioEmail);
    copyMessage.textContent = "Email address copied.";
  } catch (_) {
    copyMessage.textContent = `Please email me at ${portfolioEmail}.`;
  }
});
