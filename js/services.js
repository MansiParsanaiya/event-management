document.addEventListener("DOMContentLoaded", () => {
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll(".reveal, .reveal-up");
        const windowHeight = window.innerHeight;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 100; // Trigger when element is 100px from bottom

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add("active");
            }
        });
    };

    // Initial check on load
    revealOnScroll();

    // Check on scroll
    window.addEventListener("scroll", revealOnScroll);
});
