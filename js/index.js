// js/index.js 

document.addEventListener("DOMContentLoaded", () => {


    const mainHeader = document.querySelector('.main-header');
    
    // The height of the transparent section (usually the full viewport height)
    const transitionOffset = window.innerHeight * 0.8; 
    
    // Header height for padding calculation
    const headerHeight = mainHeader.offsetHeight;

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        // 1. Transparent to Scrolled Transition Logic
        if (scrollPosition > transitionOffset) {
            // Apply solid background, shadow, and slide-down effect
            mainHeader.classList.add('scrolled');
        } else {
            // Reset to transparent background and no shadow
            mainHeader.classList.remove('scrolled');
        }

        // 2. Padding logic to prevent content jump (Only needed if the header changes height significantly,
        // but often good practice with fixed headers)
        if (mainHeader.classList.contains('scrolled')) {
            // If the header is scrolled, ensure content starts below it.
            // Note: Because the header is now FIXED, you might need to adjust your <main> element's CSS 
            // to have padding-top equal to the header height to keep the full-screen slider full screen.
        }
    });

    // We can also initialize the header to the scrolled state immediately if the page loads scrolled down
    if (window.scrollY > transitionOffset) {
        mainHeader.classList.add('scrolled');
    }


// ==================================================================================================================


    const slides = document.querySelectorAll(".carousel-slide");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    let current = 0;
    let autoTimer;

    function updateSlides() {
        slides.forEach(slide => {
            slide.classList.remove("active", "prev", "next");
        });

        slides[current].classList.add("active");

        const prev = (current - 1 + slides.length) % slides.length;
        const next = (current + 1) % slides.length;

        slides[prev].classList.add("prev");
        slides[next].classList.add("next");
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        updateSlides();
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAuto();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAuto();
    });

    /* AUTOPLAY */
    function startAuto() {
        autoTimer = setInterval(nextSlide, 10000);
    }

    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }

    document
        .querySelector(".carousel")
        .addEventListener("mouseenter", () => clearInterval(autoTimer));

    document
        .querySelector(".carousel")
        .addEventListener("mouseleave", startAuto);

    updateSlides();
    startAuto();
});
