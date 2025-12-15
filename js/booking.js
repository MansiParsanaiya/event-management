// js/booking.js

document.addEventListener('DOMContentLoaded', function() {
    const detailsTextarea = document.getElementById('event-details');
    const charCountDisplay = document.getElementById('char-count');
    const maxLength = 500;

    detailsTextarea.addEventListener('input', function() {
        const currentLength = detailsTextarea.value.length;
        const remaining = maxLength - currentLength;

        charCountDisplay.textContent = `${currentLength} / ${maxLength} characters used`;

        if (currentLength > maxLength) {
            // Optional: Limit input if browser doesn't handle maxlength gracefully
            detailsTextarea.value = detailsTextarea.value.substring(0, maxLength);
            charCountDisplay.style.color = 'red';
        } else if (remaining <= 50) {
            // Warn user when close to limit
            charCountDisplay.style.color = 'orange';
        } else {
            charCountDisplay.style.color = '#6c757d'; // Default color
        }
    });

    // --- Task B: Date Blocking Logic (Next) ---
    const dateInput = document.getElementById('event-date');
    if (dateInput) {
        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const year = today.getFullYear();
        // Month and day must be two digits
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        
        const minDate = `${year}-${month}-${day}`;
        
        // Set the min attribute on the date input
        dateInput.setAttribute('min', minDate);
    }
});