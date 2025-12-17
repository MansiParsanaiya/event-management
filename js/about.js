// js/about.js

document.addEventListener("DOMContentLoaded", () => {
    // Run animations once components (header/footer) are likely loaded
    setTimeout(() => {
        reveal();
        animateNumbers();
    }, 100); 

    window.addEventListener("scroll", reveal);
});

function reveal() {
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
        }
    });
}

function animateNumbers() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const speed = 200; 

        const updateCount = () => {
            const count = parseFloat(counter.innerText);
            const inc = target / speed;

            if (count < target) {
                counter.innerText = (count + inc).toFixed(1);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}