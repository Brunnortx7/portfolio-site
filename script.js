/* ===========================
   MENU MOBILE
   =========================== */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

/* ===========================
   HEADER SCROLL
   =========================== */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 40);
});

/* ===========================
   ACTIVE NAV LINK
   =========================== */
const sectionIds = ["sobre", "habilidades", "projetos", "contato"];
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
const navLinks = Array.from(document.querySelectorAll(".nav a")).filter(a => a.getAttribute("href")?.startsWith("#"));

function setActiveLink() {
  const y = window.scrollY + 140;
  let currentId = "home";
  for (const s of sections) {
    if (s.offsetTop <= y) currentId = s.id;
  }
  navLinks.forEach(a => {
    const id = (a.getAttribute("href") || "").replace("#", "");
    a.classList.toggle("active", id === currentId);
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

/* ===========================
   REVEAL ON SCROLL
   =========================== */
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("show");
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => revealObs.observe(el));

/* ===========================
   SKILL BARS ANIMATION
   =========================== */
const skillFills = document.querySelectorAll(".skill-fill");
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("animated");
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

skillFills.forEach(el => skillObs.observe(el));

/* ===========================
   CONTACT FORM
   =========================== */
const numeroZap = "5541984534917";
const emailDestino = "brunnotj7@gmail.com";

const inputNome = document.getElementById("contatoNome");
const inputMsg = document.getElementById("contatoMsg");
const formMsg = document.getElementById("formMsg");
const btnEnviar = document.getElementById("envioContato");
const btnEmail = document.getElementById("envioEmail");
const btnWhats = document.getElementById("btnWhats");
const btnEmailLink = document.getElementById("btnEmail");

function getContactText() {
  const nome = (inputNome?.value || "").trim();
  const msg = (inputMsg?.value || "").trim();
  if (!msg) return null;
  return `Olá! Meu nome é ${nome || "visitante"}.\n\nMensagem: ${msg}\n\n(Vim pelo portfólio)`;
}

function showStatus(text) {
  if (formMsg) {
    formMsg.textContent = text;
    setTimeout(() => { formMsg.textContent = ""; }, 4000);
  }
}

function openWhatsApp() {
  const texto = getContactText();
  if (!texto) { showStatus("Escreve uma mensagem antes 🙂"); inputMsg?.focus(); return; }
  window.open(`https://wa.me/${numeroZap}?text=${encodeURIComponent(texto)}`, "_blank");
  if (inputNome) inputNome.value = "";
  if (inputMsg) inputMsg.value = "";
}

function openEmail() {
  const texto = getContactText();
  if (!texto) { showStatus("Escreve uma mensagem antes 🙂"); inputMsg?.focus(); return; }
  const subject = encodeURIComponent("Contato via portfólio");
  const body = encodeURIComponent(texto);
  window.location.href = `mailto:${emailDestino}?subject=${subject}&body=${body}`;
  if (inputNome) inputNome.value = "";
  if (inputMsg) inputMsg.value = "";
}

btnEnviar?.addEventListener("click", openWhatsApp);
btnEmail?.addEventListener("click", openEmail);

btnWhats?.addEventListener("click", (e) => { e.preventDefault(); openWhatsApp(); });
btnEmailLink?.addEventListener("click", (e) => { e.preventDefault(); openEmail(); });
