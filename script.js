// Select the timer display, counter display, and increment button elements
const timerDisplay = document.querySelector('#timer');
const counterDisplay = document.querySelector('#counter');
const incrementButton = document.querySelector('#incrementButton');
const startButton = document.querySelector('#startButton');

// Select the challenge mode button (create it in HTML)
const challengeButton = document.querySelector('#challengeButton');

// Set the timer value to 10 seconds by default
let timerValue = 10;

// Variable to store the countdown interval
let countdownInterval = null;

// Variable to track if confetti has been shown for each milestone
let confetti10Shown = false;
let confetti15Shown = false;
let confetti20Shown = false;

// Variable to track if challenge mode is active
let challengeMode = false;

// Initialize the counter value
let counterValue = 0;

// Function to start the countdown
function startCountdown() {
    // Set timer based on mode
    if (challengeMode) {
        timerValue = 5; // 5 seconds for challenge mode
    } else {
        timerValue = 10; // 10 seconds for normal mode
    }
    counterValue = 0;
    timerDisplay.textContent = timerValue;
    counterDisplay.textContent = counterValue;

    // Reset confetti flags
    confetti10Shown = false;
    confetti15Shown = false;
    confetti20Shown = false;

    // Enable increment button
    incrementButton.disabled = false;

    // Clear any existing interval
    if (countdownInterval !== null) {
        clearInterval(countdownInterval);
    }

    // Start the countdown interval
    countdownInterval = setInterval(function() {
        // Decrement the timer value
        timerValue--;
        // Update the timer display
        timerDisplay.textContent = timerValue;

        // Stop the countdown when the timer reaches 0
        if (timerValue <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.textContent = '0';
            // Disable increment button when time is up
            incrementButton.disabled = true;
            // Show confetti if counter is 10 or more and confetti not already shown
            if (counterValue >= 10 && !confettiShown) {
                confettiShown = true;
                // Show confetti using the canvas-confetti library
                confetti();
            }
        }
    }, 1000);
}

// Function to show different confetti effects
function showConfetti(milestone) {
    // 10: normal confetti
    // 15: confetti with more particles
    // 20: confetti with stars and more spread
    if (milestone === 10) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else if (milestone === 15) {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#bb0000', '#ffffff']
        });
    } else if (milestone === 20) {
        confetti({
            particleCount: 300,
            spread: 120,
            origin: { y: 0.6 },
            shapes: ['star'],
            colors: ['#FFD700', '#00FF00', '#00BFFF']
        });
    }
}

// Function to increase the counter
function increaseCounter() {
    // Only allow increment if time is left
    if (timerValue <= 0) {
        return;
    }
    // Increment the counter value
    counterValue++;
    // Update the counter display
    counterDisplay.textContent = counterValue;

    // Show confetti at different milestones
    if (counterValue >= 10 && !confetti10Shown) {
        confetti10Shown = true;
        showConfetti(10);
    }
    if (counterValue >= 15 && !confetti15Shown) {
        confetti15Shown = true;
        showConfetti(15);
    }
    if (counterValue >= 20 && !confetti20Shown) {
        confetti20Shown = true;
        showConfetti(20);
    }
}

// Function to start challenge mode
function startChallengeMode() {
    challengeMode = true;
    startCountdown();
}

// Add event listener to the increment button
incrementButton.addEventListener('click', increaseCounter);

// Add event listener to the start button for normal mode
startButton.addEventListener('click', function() {
    challengeMode = false;
    startCountdown();
});

// Add event listener to the challenge mode button
if (challengeButton) {
    challengeButton.addEventListener('click', startChallengeMode);
}
