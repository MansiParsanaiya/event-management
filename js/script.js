// Countdown Timer
const countdownElement = document.getElementById("countdown");

// Set your event date here
const eventDate = new Date("March 30, 2025 10:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = eventDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d : ${hours}h : ${mins}m : ${secs}s`;
}, 1000);
