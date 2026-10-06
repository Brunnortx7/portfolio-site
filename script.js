
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


const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 40);
});


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


const numeroZap = "5541984534917";
const emailDestino = "brunnotj7@gmail.com";

const inputNome = document.getElementById("contatoNome");
const inputMsg = document.getElementById("contatoMsg");
const formMsg = document.getElementById("formMsg");
const btnEnviar = document.getElementById("envioContato");
const btnEmail = document.getElementById("envioEmail");
const btnWhats = document.getElementById("btnWhats");

function getContactText() {
  const nome = (inputNome?.value || "").trim();
  const msg = (inputMsg?.value || "").trim();
  if (!nome) return null;
  const corpo = msg ? `\n\nMensagem: ${msg}` : "";
  return `Olá! Meu nome é ${nome}.${corpo}\n\n(Vim pelo portfólio)`;
}

function showStatus(text) {
  if (!formMsg) return;
  formMsg.textContent = text;
  setTimeout(() => { formMsg.textContent = ""; }, 4000);
}

function clearForm() {
  if (inputNome) inputNome.value = "";
  if (inputMsg) inputMsg.value = "";
}

function openWhatsApp() {
  const texto = getContactText();
  if (!texto) { showStatus("Digite seu nome para continuar."); inputNome?.focus(); return; }
  window.open(`https://wa.me/${numeroZap}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
  clearForm();
}

function openEmail() {
  const texto = getContactText();
  if (!texto) { showStatus("Digite seu nome para continuar."); inputNome?.focus(); return; }
  const subject = encodeURIComponent("Contato via portfólio");
  window.location.href = `mailto:${emailDestino}?subject=${subject}&body=${encodeURIComponent(texto)}`;
  clearForm();
}

btnEnviar?.addEventListener("click", openWhatsApp);
btnEmail?.addEventListener("click", openEmail);


btnWhats?.addEventListener("click", (e) => {
  e.preventDefault();
  window.open(`https://wa.me/${numeroZap}?text=${encodeURIComponent("Olá! Vim pelo portfólio.")}`, "_blank", "noopener");
});
