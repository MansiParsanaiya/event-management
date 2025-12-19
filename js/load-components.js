// js/load-components.js


function loadComponent(url, targetElementId) {
    const targetElement = document.getElementById(targetElementId);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for ${url}`);
            }
            return response.text();
        })
        .then(html => {
            if (targetElement) {
                targetElement.innerHTML = html;
                if (targetElementId === "header-placeholder") {
                    setActiveNavLink();
                }
            }
        })
        .catch(error => {
            console.error("Error loading component:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent('header.html', 'header-placeholder');
    loadComponent('header2.html', 'header-placeholder2');
    loadComponent('footer.html', 'footer-placeholder');
    loadComponent('slider.html', 'slider-placeholder');
});

// Header blur on scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector(".main-header");
    if (!header) return;

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


function setActiveNavLink() {

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".main-nav ul li a").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });

}