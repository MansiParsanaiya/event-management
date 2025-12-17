// js/gallery.js

document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');

    // Function to open the lightbox
    function openLightbox(item) {
        // 1. Get data from the clicked grid item
        const imgSrc = item.querySelector('img').src;
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');

        // 2. Populate the modal elements
        lightboxImage.src = imgSrc;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;

        // 3. Show the modal using the 'active' class (CSS handles the transition)
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling the main page
    }

    // Attach click listener to all grid items
    gridItems.forEach(item => {
        item.addEventListener('click', function() {
            openLightbox(this);
        });
    });

    // Function to close the lightbox (called via the close button and background click)
    window.closeLightbox = function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };
    
    // Allow closing by pressing the ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});

// js/gallery.js 
// (Add this logic to your existing Gallery/Lightbox script)

document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox-modal');
    
    // 1. Check if the lightbox is currently open
    if (lightbox && lightbox.classList.contains('open')) {
        
        // 2. ESC Key: Close the modal
        if (event.key === "Escape") {
            // Close the lightbox by removing the 'open' class
            lightbox.classList.remove('open'); 
        } 
        
    }
});

// Example function to close the modal (attach to close button/background click)
function closeLightbox() {
    document.getElementById('lightbox-modal').classList.remove('open');
}