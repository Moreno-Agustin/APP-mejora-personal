//  <    >    =>

// Inicializar contenido al cargar
document.querySelectorAll(".card").forEach(card => {
  card.querySelector(".card-title").textContent = card.dataset.title;
  card.querySelector(".short").textContent = card.dataset.desc;
  card.querySelector(".full").textContent =
    card.dataset.descExpanded || card.dataset.desc;
});

// --- Navbar Logic ---
const btnMenu = document.querySelector(".btn-menu");
const btnCerrar = document.querySelector(".btn-cerrar");
const navLinks = document.querySelector(".nav-links");

if (btnMenu && btnCerrar && navLinks) {
  btnMenu.addEventListener("click", () => navLinks.classList.add("active"));
  btnCerrar.addEventListener("click", () => navLinks.classList.remove("active"));

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("active"));
  });
}

document.querySelectorAll(".expand").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    if (card.classList.contains("pending")) return;

    card.classList.toggle("active");
    btn.textContent = card.classList.contains("active")
      ? "Cerrar"
      : "Ver más";
  });
});
