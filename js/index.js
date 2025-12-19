

document.addEventListener("DOMContentLoaded", () => {
    initHeroSlider();
    setupWorkGallery();
    window.addEventListener('scroll', handleHeaderScroll);
});

// --- 1. STICKY HEADER TRANSITION ---
function handleHeaderScroll() {
    const header = document.querySelector('.main-header');
    const heroSection = document.getElementById('hero-slider');

    if (!header || !heroSection) return;

    const scrollThreshold = heroSection.offsetHeight * 0.8;

    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// --- 2. HERO SLIDER (Image & Text Swap) ---
function initHeroSlider() {
    const imagePaths = [
        "images/pexels-thibault-trillet-44912-167491.jpg",
        "images/pexels-bertellifotografia-34774353.jpg",
        "images/celebration-hall-with-full-guests.jpg",
        "images/desktop-wallpaper-football-sport-events-background.jpg"
    ];
    const categories = ["Music", "Tech", "Weddings", "Sports"];

    const dynamicCategoryElement = document.getElementById('dynamic-category');
    const heroImageElement = document.querySelector('.hero-bg-img');

    if (!dynamicCategoryElement || !heroImageElement) return;

    let currentIndex = 0;
    const transitionTime = 4000;

    setInterval(() => {
        heroImageElement.classList.add('fade-out');
        dynamicCategoryElement.style.opacity = 0;

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % imagePaths.length;
            heroImageElement.src = imagePaths[currentIndex];
            dynamicCategoryElement.textContent = categories[currentIndex];

            heroImageElement.classList.remove('fade-out');
            dynamicCategoryElement.style.opacity = 1;
        }, 1000); 
    }, transitionTime);
}

// --- 3. OUR WORK GALLERY (Vertical Infinite Scroll) ---
function setupWorkGallery() {
    const workImagesByColumn = [
        [
            'images/medium-shot-people-event-with-food.jpg',
            'images/pexels-asphotography-226737.jpg',
            'images/pexels-bertellifotografia-19012046.jpg',
            'images/pexels-asadphoto-169198.jpg',
        ],
        [
            'images/pexels-caleboquendo-34476062.jpg',
            'images/pexels-nappy-3048347.jpg',
            'images/pexels-wendywei-3159595.jpg',
        ],
        [
            'images/pexels-aleksmagnusson-2907677.jpg',
            'images/pexels-caleboquendo-3143850.jpg',
            'images/pexels-bertellifotografia-29486084.jpg',
        ]
    ];

    const columns = document.querySelectorAll('.gallery__column');

    columns.forEach((column, index) => {
        const track = column.querySelector('.column__track');
        if (!track) return;

        const images = workImagesByColumn[index] || [];

        const imageHTML = images.map(url => `
            <div class="gallery__image">
                <img src="${url}" alt="Gallery image" loading="lazy">
            </div>
        `).join('');

        track.innerHTML = imageHTML + imageHTML;
    });
}


const testimonials = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".testimonial-dots .dot");

let currentIndex = 0;

function showTestimonial(index) {
    testimonials.forEach((t, i) => {
        t.classList.toggle("active", i === index);
        dots[i].classList.toggle("active", i === index);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentIndex = index;
        showTestimonial(currentIndex);
    });
});

// Auto-slide
setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
}, 5000);
