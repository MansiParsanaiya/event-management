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
});

