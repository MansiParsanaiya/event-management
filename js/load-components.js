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
            }
        })
        .catch(error => {
            console.error("Error loading component:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent('header.html', 'header-placeholder');
    loadComponent('footer.html', 'footer-placeholder');
    loadComponent('slider.html', 'slider-placeholder');
});