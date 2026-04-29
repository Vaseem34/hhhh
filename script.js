// =========================================
// 1. FLOATING BACKGROUND GENERATOR
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const floatingContainer = document.getElementById('floating-container');
    const items = ['✨', '🌸', '🤍', '💖', '🦋'];
    const itemCount = 25;

    for (let i = 0; i < itemCount; i++) {
        let item = document.createElement('div');
        item.className = 'float-item';
        item.innerText = items[Math.floor(Math.random() * items.length)];
        
        // Randomize position, speed, and delay for natural movement
        item.style.left = `${Math.random() * 100}vw`;
        item.style.animationDuration = `${Math.random() * 8 + 10}s`;
        item.style.animationDelay = `${Math.random() * 5}s`;
        
        floatingContainer.appendChild(item);
    }

    // Initialize the interactive buttons once the DOM is loaded
    initHoldButton();
    initTrickButton();
});

// =========================================
// 2. SMOOTH STEP TRANSITIONS
// =========================================
window.nextStep = function(stepNumber) {
    const currentStep = document.querySelector('.step.active');
    if (!currentStep) return;

    // 1. Fade out current step
    currentStep.style.opacity = '0';
    currentStep.style.transform = 'translateY(-25px) scale(0.95)';
    
    setTimeout(() => {
        currentStep.classList.remove('active');
        
        // 2. Prepare next step
        const nextStepEl = document.getElementById(`step${stepNumber}`);
        if (!nextStepEl) return;

        nextStepEl.classList.add('active');
        
        // 3. Reset cinematic CSS animations so they trigger properly
        const reveals = nextStepEl.querySelectorAll('[class^="reveal-"]');
        reveals.forEach(el => {
            el.style.animation = 'none'; // Clear old animation
            void el.offsetWidth;         // Trigger DOM reflow
            el.style.animation = null;   // Re-apply animation from CSS
        });
        
    }, 600); // Matches the CSS transition duration
};

// =========================================
// 3. INTERACTIVE HOLD-TO-UNLOCK LOGIC
// =========================================
function initHoldButton() {
    const holdBtn = document.getElementById('hold-btn');
    const progressRing = document.getElementById('progress-ring');
    
    if (!holdBtn || !progressRing) return;

    let progress = 0;
    let holdInterval;
    let isUnlocked = false;

    const startHold = (e) => {
        // Prevent scrolling/context menus on mobile while holding
        if (e.type === 'touchstart') e.preventDefault(); 
        if (isUnlocked) return;

        progressRing.style.opacity = '1';
        progressRing.style.transition = 'transform 0.1s linear';
        
        holdInterval = setInterval(() => {
            progress += 4; // Adjust this to make it fill faster/slower
            progressRing.style.transform = `rotate(${-45 + progress}deg)`;
            
            // Check if fully loaded (360 degrees)
            if (progress >= 360) {
                clearInterval(holdInterval);
                isUnlocked = true;
                
                // Visual feedback for success
                holdBtn.innerHTML = "🔓";
                holdBtn.style.transform = "scale(1.1)";
                holdBtn.style.borderColor = "#4cd137"; // Green success border
                progressRing.style.borderTopColor = "#4cd137";
                progressRing.style.borderRightColor = "#4cd137";

                // Move to the next step automatically after a brief pause
                setTimeout(() => nextStep(4), 600);
            }
        }, 25); // Runs every 25ms for smooth animation
    };

    const stopHold = () => {
        clearInterval(holdInterval);
        if (!isUnlocked) {
            // Reset progress if they let go too early
            progress = 0;
            progressRing.style.transform = 'rotate(-45deg)';
            progressRing.style.opacity = '0';
        }
    };

    // Mouse events for Desktop
    holdBtn.addEventListener('mousedown', startHold);
    holdBtn.addEventListener('mouseup', stopHold);
    holdBtn.addEventListener('mouseleave', stopHold);
    
    // Touch events for Mobile (Critical for iOS/Android)
    holdBtn.addEventListener('touchstart', startHold, { passive: false });
    holdBtn.addEventListener('touchend', stopHold);
    holdBtn.addEventListener('touchcancel', stopHold);
}

// =========================================
// 4. EVASIVE "NO" BUTTON LOGIC
// =========================================
function initTrickButton() {
    const noBtn = document.getElementById('noBtn');
    if (!noBtn) return;

    // Set initial position safely next to the "Yes" button
    setTimeout(() => {
        noBtn.style.left = '220px'; 
    }, 100);
}

// Globally exposed for the inline onmouseover/onclick handlers
window.moveButton = function() {
    const noBtn = document.getElementById('noBtn');
    const container = document.getElementById('step4'); // The container the button lives in
    
    if (!noBtn || !container) return;

    // Get the dimensions of the card
    const containerRect = container.getBoundingClientRect();
    
    // Calculate maximum safe bounds so the button stays inside the card
    const maxX = containerRect.width - noBtn.offsetWidth - 30;
    
    // Randomize X and Y positions
    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    
    // Keep it in the bottom half of the card so it doesn't cover the text
    const randomY = Math.max(140, Math.floor(Math.random() * 60) + 120); 

    // Apply new coordinates
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
};