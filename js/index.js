document.addEventListener("DOMContentLoaded", () => {
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
