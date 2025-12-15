// js/load-components.js

/**
 * Fetches content from a specified URL (e.g., 'header.html') 
 * and injects it into a target element (e.g., '#header-placeholder').
 */
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
                
                // --- CRITICAL LOGIC FOR TRANSPARENT HEADER ---
                // If this is the placeholder for the index page, apply the transparent header class
                if (targetElement.id === 'header-placeholder' && 
                    document.body.classList.contains('home-page')) {
                    
                    const headerElement = targetElement.querySelector('.main-header');
                    if (headerElement) {
                        // Apply the class that makes the header fixed and transparent
                        headerElement.classList.add('transparent-header');
                    }
                }
            } else {
                console.error(`Target element with ID "${targetElementId}" not found.`);
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