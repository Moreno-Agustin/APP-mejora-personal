const btnMenu = document.querySelector(".btn-menu");
const btnCerrar = document.querySelector(".btn-cerrar");
const navLinks = document.querySelector(".nav-links");
if (btnMenu && btnCerrar && navLinks) {
    btnMenu.addEventListener("click", () => {
        navLinks.classList.add("active");
    });
    btnCerrar.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}
export {};
//# sourceMappingURL=nav.js.map