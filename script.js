// Function to generate a random number between a range
const randomRange = (min, max) => Math.random() * (max - min) + min;

// --- Effect 1: The Endless Love Counter ---
let loveValue = 100;
const counterElement = document.getElementById('loveCounter');

// This makes the number go up rapidly like a crazy meter
setInterval(() => {
    if (counterElement) {
        loveValue += Math.floor(Math.random() * 50);
        counterElement.innerText = loveValue.toLocaleString() + '%';
    }
}, 150);


// --- Effect 2: The Tricky "No" Button (For Forgiveness) ---
const noBtn = document.getElementById('noBtn');
const funnyResponses = [
    "Nice try!", "Too slow!", "Not an option!", 
    "Click YES instead!", "I'm invincible!", "You still love me!"
];

if (noBtn) {
    // When her mouse gets close, the button runs away
    noBtn.addEventListener('mouseover', () => {
        // Calculate a random position that keeps the button visible on screen
        const x = Math.random() * (window.innerWidth - 150) - (window.innerWidth / 2) + 75;
        const y = Math.random() * 150 - 75; 
        
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
        noBtn.innerText = funnyResponses[Math.floor(Math.random() * funnyResponses.length)];
    });
}


// --- Effect 3: The Memory Explorer (Show/Hide Gallery) ---
window.showMemories = function() {
    const memoryNo = document.getElementById('memoryNo');
    const memoryYes = document.querySelector('.memory-yes');
    const gallery = document.getElementById('photoGallery');
    
    if (gallery && memoryYes && memoryNo) {
        // Show the gallery grid
        gallery.style.display = 'grid';
        // Add a pulsing glow to the section to draw attention
        document.getElementById('memorySection').style.animation = 'refinedGlow 2s infinite';
        
        // Hide the 'No' button and change the 'Yes' text
        memoryNo.style.display = 'none';
        memoryYes.innerText = "Look at us! ❤️";
    }
}


// --- Effect 4: The Celebration (When she clicks Final YES) ---
// We attach it to the window object so the HTML onclick="celebrate()" can find it
window.celebrate = function() {
    const mainCard = document.getElementById('mainCard');
    
    if (mainCard) {
        // Change the text to something sweet
        mainCard.innerHTML = `
            <h1 style="font-size: 3rem; animation: pulse 1s infinite;">YAY! 🎉</h1>
            <p style="font-size: 1.5rem;">You are the absolute best.</p>
            <p>I promise to keep growing my obsession with you every single day. I love you!</p>
        `;
    }
    
    // Trigger a massive explosion of hearts, stars, and photo-fragments
    for(let i = 0; i < 120; i++) {
        setTimeout(createFloatingItem, i * 25);
    }
};


// --- Effect 5: Background Floating Items ---
const emojis = ['❤️', '✨', '🌸', '💖', '🥰', '🦋'];

// Updated: now has an elegant photo-fragment explosion
function createFloatingItem() {
    const item = document.createElement('div');
    item.classList.add('floating-item');
    
    // Logic: Occasionally add a fragment of one of our images to the explosion
    if (Math.random() > 0.8) {
        const memoryImages = ['image_1.png', 'image_2.png', 'image_3.png', 'image_4.png'];
        item.style.backgroundImage = `url(${memoryImages[Math.floor(Math.random() * memoryImages.length)]})`;
        item.style.width = randomRange(10, 25) + 'px';
        item.style.height = item.style.width; // Keep it square
        item.style.borderRadius = '2px';
        item.style.filter = 'drop-shadow(0 0 5px rgba(255, 77, 109, 0.4))';
    } else {
        item.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        item.style.fontSize = (Math.random() * 20 + 15) + 'px';
    }
    
    // Randomize starting position, speed, and size
    item.style.left = Math.random() * 100 + 'vw';
    item.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    document.body.appendChild(item);
    
    // Clean up the item after its animation ends
    setTimeout(() => item.remove(), 5000);
}

// Keep a steady flow of items floating in the background
setInterval(createFloatingItem, 800);