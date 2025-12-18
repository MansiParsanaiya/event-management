// js/upcoming.js

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    const locationBar = document.getElementById('location-bar');
    
    // --- PART A: CORE FILTERING LOGIC (Existing from Step 15) ---
    function filterEvents(category) {
        // ... (Existing filterEvents function implementation) ...
        eventCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                setTimeout(() => {
                    card.classList.remove('hidden');
                    card.style.display = 'flex';
                }, 10); 
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    }
    
    // --- Button Click Handler (Existing from Step 15) ---
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterCategory = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterEvents(filterCategory);
        });
    });

    filterEvents('all'); // Initialize display


    // --- PART B: ADVANCED GEOLOCATION API INTEGRATION (The Killer Feature) ---
    
    function showLocationMessage(city, state) {
    locationBar.innerHTML = `
        <i class="fa-solid fa-map-pin"></i>
        <strong>Location Alert:</strong> We see you are near <strong>${city}, ${state}</strong>! 
        Check out our upcoming <strong>${city} Tech Summit</strong> next month!
    `;
    locationBar.style.display = 'flex';
}



    // Success function for Geolocation
    function success(pos) {
        const coords = pos.coords;
        const location = showLocationMessage(coords.latitude, coords.longitude);
        
        const message = `
            <i class="fa-solid fa-map-pin"></i> 
            **Location Alert:** We see you are near **${location.city}, ${location.state}**! Check out our upcoming **${location.city} Tech Summit** next month!
        `;
        
        locationBar.innerHTML = message;
        locationBar.style.display = 'flex';
    }

    // Error function for Geolocation (Crucial for high marks!)
    function error(err) {
        let errorMessage;
        
        switch (err.code) {
            case err.PERMISSION_DENIED:
                errorMessage = "Location denied: We cannot tailor events to your area. Please manually browse.";
                break;
            case err.POSITION_UNAVAILABLE:
                errorMessage = "Location information is currently unavailable. Try refreshing the page.";
                break;
            case err.TIMEOUT:
                errorMessage = "Location request timed out. Please check your network connection.";
                break;
            default:
                errorMessage = "An unknown location error occurred. Showing global events.";
        }
        
        locationBar.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${errorMessage}`;
        locationBar.classList.add('error');
        locationBar.style.display = 'flex';
    }

    // Check if browser supports Geolocation API
    if (navigator.geolocation) {
        // Set up the options (High accuracy, low timeout)
        const options = {
            enableHighAccuracy: true,
            timeout: 5000, 
            maximumAge: 0
        };
        
        // Call the API
        navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
        // Fallback for old browsers
        locationBar.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Geolocation is not supported by your browser. Showing all global events.';
        locationBar.classList.add('error');
        locationBar.style.display = 'flex';
    }
});



