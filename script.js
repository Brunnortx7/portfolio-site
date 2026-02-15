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
}

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

const revealEls = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => obs.observe(el));

const btnEnviar = document.getElementById("envioContato");
const btnWhats = document.getElementById("btnWhats");
const btnEmail = document.getElementById("btnEmail");

const inputNome = document.getElementById("contatoNome");
const inputMsg = document.getElementById("contatoMsg");
const formMsg = document.getElementById("formMsg");

const numeroZap = "5541984534917";
const emailDestino = "brunnotj7@gmail.com";

function pegarTextoContato() {
  const nome = (inputNome.value || "").trim();
  const msg = (inputMsg.value || "").trim();

  if (!msg) return null;

  return `Olá! Meu nome é ${nome || "visitante"}.\n\nMensagem: ${msg}\n\n(Vim pelo site)`;
}

function mostrarStatus(texto) {
  if (formMsg) formMsg.textContent = texto;
}

function abrirWhatsApp() {
  const texto = pegarTextoContato();

  if (!texto) {
    mostrarStatus("Escreve uma mensagem antes 🙂");
    inputMsg.focus();
    return;
  }

  const url = `https://wa.me/${numeroZap}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");

  inputNome.value = "";
  inputMsg.value = "";
}

function abrirEmail() {
  const texto = pegarTextoContato();

  if (!texto) {
    mostrarStatus("Escreve uma mensagem antes 🙂");
    inputMsg.focus();
    return;

  }

  const assunto = "Contato pelo site secor.lat";
  const mailto = `mailto:${emailDestino}?subject=${encodeURIComponent(
    assunto
  )}&body=${encodeURIComponent(texto)}`;

  window.location.href = mailto;
  inputNome.value = "";
  inputMsg.value = "";
}

if (btnEnviar) {
  btnEnviar.addEventListener("click", () => {
    mostrarStatus("Abrindo WhatsApp...");
    abrirWhatsApp();
  });
}

if (btnWhats) {
  btnWhats.addEventListener("click", (e) => {
    e.preventDefault();
    abrirWhatsApp();
  });
}

if (btnEmail) {
  btnEmail.addEventListener("click", (e) => {
    e.preventDefault();
    abrirEmail();
  });
}

