// js/gallery.js

document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');

    function openLightbox(item) {
        const imgSrc = item.querySelector('img').src;
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');

        lightboxImage.src = imgSrc;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
    gridItems.forEach(item => {
        item.addEventListener('click', function() {
            openLightbox(this);
        });
    });
    window.closeLightbox = function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});

document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox-modal');
    if (lightbox && lightbox.classList.contains('open')) {
        if (event.key === "Escape") {
            lightbox.classList.remove('open'); 
        } 
    }
});
function closeLightbox() {
    document.getElementById('lightbox-modal').classList.remove('open');
}