document.addEventListener("DOMContentLoaded", () => {
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll(".reveal, .reveal-up");
        const windowHeight = window.innerHeight;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 100; 

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add("active");
            }
        });
    };
    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);
});
