   document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('newBookingForm');
            const card = document.querySelector('.booking-card');

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                // Feedback state
                const btn = form.querySelector('button');
                btn.innerHTML = 'Processing... <i class="fa-solid fa-circle-notch fa-spin"></i>';
                btn.style.pointerEvents = 'none';

                setTimeout(() => {
                    // Modern Success Transformation
                    card.innerHTML = `
                        <div class="success-content">
                            <div style="font-size: 5rem; color: #00d4ff; margin-bottom: 20px;">
                                <i class="fa-solid fa-circle-check"></i>
                            </div>
                            <h2 style="font-size: 2.5rem; margin-bottom: 10px;">Request Sent!</h2>
                            <p style="color: #555; font-size: 1.1rem;">Check your inbox. Our lead planner will reach out shortly.</p>
                            <button onclick="location.reload()" class="submit-glow" style="max-width: 250px; margin: 30px auto 0;">
                                Back to Form
                            </button>
                        </div>
                    `;
                }, 1800);
            });
        });