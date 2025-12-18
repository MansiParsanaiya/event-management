// js/about.js


document.addEventListener("DOMContentLoaded", () => {
    // Initial check for elements in view
    reveal();

    // Start counting numbers
    animateNumbers();

    // Listen for scroll
    window.addEventListener("scroll", reveal);
});

// Function to handle scroll reveals
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

// Function for the counting numbers
function animateNumbers() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const speed = 200; // Total duration factor

        const updateCount = () => {
            const count = parseFloat(counter.innerText);
            const inc = target / speed;

            if (count < target) {
                // Keep one decimal place
                counter.innerText = (count + inc).toFixed(1);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}