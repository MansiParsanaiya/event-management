// js/index.js (CLEANED VERSION)

document.addEventListener("DOMContentLoaded", () => {

    const mainHeader = document.querySelector('.main-header');
    
    const transitionOffset = window.innerHeight * 0.85; 
  
    const headerHeight = mainHeader.offsetHeight;

    const handleScroll = () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition > transitionOffset) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll(); 



      // our work
        const workImages = [
            'https://picsum.photos/id/10/300/450',
            'https://picsum.photos/id/20/300/400',
            'https://picsum.photos/id/30/300/500',
            'https://picsum.photos/id/40/300/420',
            'https://picsum.photos/id/50/300/480',
            'https://picsum.photos/id/60/300/350',
            'https://picsum.photos/id/70/300/550',
            'https://picsum.photos/id/80/300/430',
        ];

        function setupWorkGallery() {
            const columns = document.querySelectorAll('.gallery__column');

            columns.forEach((column, colIndex) => {
                const track = column.querySelector('.column__track');

                // Create a sequence of images (the loop content)
                const imageSequenceHTML = workImages.map(url => `
                <div class="gallery__image">
                    <img src="${url}" alt="Gallery image">
                </div>
            `).join('');

                // Duplication for seamless vertical loop (repeat 2-3 times)
                track.innerHTML = imageSequenceHTML + imageSequenceHTML;
            });
        }

        setupWorkGallery();


        // hero section

        // --- 1. Data Setup ---
        // List of image paths (relative to your index.html)
        const imagePaths = [
            "images/img1.jpg", // Example: Music
            "images/img2.jpg", // Example: Tech
            "images/img3.jpg", // Example: Wedding
            "images/img4.jpg"  // Example: Sports
        ];
        // List of corresponding dynamic text categories
        const categories = ["Music", "Tech", "Weddings", "Sports"];

        // --- 2. Element References ---
        const dynamicCategoryElement = document.getElementById('dynamic-category');
        const heroImageElement = document.querySelector('.hero-bg-img');
        const header = document.querySelector('.main-header');
        const heroSection = document.getElementById('hero-slider');

        let currentIndex = 0;
        const transitionTime = 4000; // Time each slide stays visible (4 seconds)


        // --- 3. Core Swap Function ---

        function swapContent() {
            // A. Start Fade Out (Image & Text)
            heroImageElement.classList.add('fade-out');
            dynamicCategoryElement.style.opacity = 0;

            setTimeout(() => {
                // B. Change Content (after fade-out is complete)

                // 1. Advance index
                currentIndex = (currentIndex + 1) % imagePaths.length;

                // 2. Change Image Source
                heroImageElement.src = imagePaths[currentIndex];

                // 3. Change Dynamic Text
                dynamicCategoryElement.textContent = categories[currentIndex];

                // C. Start Fade In
                // Remove fade-out class immediately to let the CSS transition (1s) fade the new image in
                heroImageElement.classList.remove('fade-out');
                dynamicCategoryElement.style.opacity = 1;

            }, 1000); // 1000ms delay matches the image transition time in CSS
        }

        // Start the continuous swap
        setInterval(swapContent, transitionTime);


        // =======================================================
        // --- STICKY HEADER TRANSITION ---
        // =======================================================

        function handleScroll() {
            if (heroSection) {
                // We trigger the sticky header transition slightly before we exit the hero section
                const scrollThreshold = heroSection.offsetHeight - 80;

                if (window.scrollY > scrollThreshold) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        }

        // Attach the scroll listener
        window.addEventListener('scroll', handleScroll);








});

