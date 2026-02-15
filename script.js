// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha menu ao clicar em um link (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Highlight do menu conforme scroll
const sections = ["sobre", "servicos", "projetos", "contato"].map(id => document.getElementById(id));
const navLinks = Array.from(document.querySelectorAll(".nav a")).filter(a => a.getAttribute("href")?.startsWith("#"));

function setActiveLink() {
  const y = window.scrollY + 120;

  let currentId = "home";
  for (const s of sections) {
    if (s && s.offsetTop <= y) currentId = s.id;
  }

  navLinks.forEach(a => {
    const href = a.getAttribute("href") || "";
    const id = href.replace("#", "");
    a.classList.toggle("active", id === currentId);
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => obs.observe(el));

