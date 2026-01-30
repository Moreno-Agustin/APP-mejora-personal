export { };

const btnMenu = document.querySelector(".btn-menu") as HTMLElement;
const btnCerrar = document.querySelector(".btn-cerrar") as HTMLElement;
const navLinks = document.querySelector(".nav-links") as HTMLElement;

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
