// js/validation.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const feedback = document.getElementById('form-feedback');

    // REGULAR EXPRESSIONS (Key part to impress your professor!)
    // These patterns are robust and directly relate to the content in Ch-4.
    const regex = {
        fullName: /^[A-Za-z\s]{3,}$/, // Letters and spaces, minimum 3 characters
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Standard robust email format
        phone: /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/, // Standard phone format (e.g., 123-456-7890)
        guests: /^\d{2,4}$/ // 2 to 4 digits (e.g., 50 to 5000)
    };

    // Helper function to show/hide error messages
    function displayError(fieldId, message) {
        const errorElement = document.getElementById(`error-${fieldId}`);
        const inputElement = document.getElementById(fieldId).parentNode;
        
        if (message) {
            errorElement.textContent = message;
            inputElement.classList.add('invalid');
            return false;
        } else {
            errorElement.textContent = '';
            inputElement.classList.remove('invalid');
            return true;
        }
    }

    // Validation Logic
    function validateForm() {
        let isValid = true;

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const eventType = document.getElementById('eventType').value;
        const eventDate = document.getElementById('eventDate').value;
        const guests = document.getElementById('guests').value.trim();
        
        // 1. Full Name Validation
        if (!fullName) {
            isValid = displayError('fullName', 'Full Name is required.') && isValid;
        } else if (!regex.fullName.test(fullName)) {
            isValid = displayError('fullName', 'Name must contain only letters and spaces.') && isValid;
        } else {
            displayError('fullName', '');
        }

        // 2. Email Validation (using RegEx)
        if (!email) {
            isValid = displayError('email', 'Email Address is required.') && isValid;
        } else if (!regex.email.test(email)) {
            isValid = displayError('email', 'Please enter a valid email address (e.g., name@domain.com).') && isValid;
        } else {
            displayError('email', '');
        }

        // 3. Phone Validation (using RegEx)
        if (!phone) {
            isValid = displayError('phone', 'Phone number is required.') && isValid;
        } else if (!regex.phone.test(phone)) {
            isValid = displayError('phone', 'Please enter a valid 10-digit phone number.') && isValid;
        } else {
            displayError('phone', '');
        }

        // 4. Event Type Validation
        if (!eventType) {
            isValid = displayError('eventType', 'Please select an event type.') && isValid;
        } else {
            displayError('eventType', '');
        }
        
        // 5. Event Date Validation (Must be a future date)
        if (!eventDate) {
            isValid = displayError('eventDate', 'Please select a preferred date.') && isValid;
        } else {
            const selectedDate = new Date(eventDate);
            const today = new Date();
            // Set time to midnight for accurate date comparison
            today.setHours(0, 0, 0, 0); 
            if (selectedDate <= today) {
                isValid = displayError('eventDate', 'Date must be in the future.') && isValid;
            } else {
                displayError('eventDate', '');
            }
        }
        
        // 6. Guest Count Validation (using RegEx for pattern/range for professional look)
        if (!guests) {
            isValid = displayError('guests', 'Guest count is required.') && isValid;
        } else if (!regex.guests.test(guests) || parseInt(guests) < 50 || parseInt(guests) > 5000) {
            isValid = displayError('guests', 'Guests must be a number between 50 and 5000.') && isValid;
        } else {
            displayError('guests', '');
        }

        return isValid;
    }

    // Attach real-time validation to key input events (input/blur)
    const fieldsToValidate = ['fullName', 'email', 'phone', 'eventType', 'eventDate', 'guests'];
    fieldsToValidate.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('blur', function() {
            // Re-validate just the field that was blurred
            validateForm(); 
        });
        // For dynamic fields like date and select, input event works well
        element.addEventListener('input', function() {
             validateForm(); 
        });
    });


    // Form Submission Handler
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop default form submission

        if (validateForm()) {
            // All fields are valid!
            feedback.textContent = 'Success! Your booking request has been submitted. We will contact you shortly.';
            feedback.classList.remove('error');
            feedback.classList.add('success');
            feedback.style.display = 'block';

            // Optional: Reset form after successful submission
            form.reset();
            
            // In a real project, you would send data to a server here.
            console.log('Form Submitted Successfully!');
        } else {
            // Validation failed. Message already shown via displayError calls.
            feedback.textContent = 'Please fix the errors shown above before submitting.';
            feedback.classList.remove('success');
            feedback.classList.add('error');
            feedback.style.display = 'block';
            
            // Scroll to the first error
            document.querySelector('.form-group.invalid').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});