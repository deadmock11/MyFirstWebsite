// Comprehensive Fun Facts Database
const funFacts = [
    {
        text: "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still edible!",
        category: "Nature"
    },
    {
        text: "A group of flamingos is called a 'flamboyance'. How fabulous!",
        category: "Animals"
    },
    {
        text: "Octopuses have three hearts and blue blood. Two hearts pump blood to the gills, while the third pumps it to the rest of the body.",
        category: "Marine Life"
    },
    {
        text: "The smell of rain (petrichor) comes from oils released by plants and a chemical called geosmin produced by bacteria.",
        category: "Science"
    },
    {
        text: "Bananas are berries, but strawberries are not! Berries are fruits that develop from a single ovary.",
        category: "Botany"
    },
    {
        text: "A day on Venus is longer than its year. Venus takes 243 Earth days to rotate on its axis but only 225 days to orbit the Sun.",
        category: "Space"
    },
    {
        text: "Wombats produce cube-shaped poop. Scientists believe this shape prevents the feces from rolling away.",
        category: "Animals"
    },
    {
        text: "Cleopatra lived closer to the invention of the iPhone than to the building of the Great Pyramid.",
        category: "History"
    },
    {
        text: "Cows have best friends and get stressed when separated from them. They also have memories lasting years.",
        category: "Animals"
    },
    {
        text: "Sloths only defecate once a week and lose up to 30% of their body weight when they do.",
        category: "Animals"
    },
    {
        text: "The fingerprints of koalas are so similar to human fingerprints that they could confuse crime scene investigators!",
        category: "Animals"
    },
    {
        text: "Butterflies taste with their feet. They have taste receptors on their legs to detect whether the plant they land on is edible.",
        category: "Insects"
    },
    {
        text: "A group of porcupines is called a 'prickle'.",
        category: "Animals"
    },
    {
        text: "The Great Wall of China is not visible from space with the naked eye. This is a common misconception!",
        category: "Geography"
    },
    {
        text: "Sharks have existed longer than dinosaurs. They've been around for about 450 million years!",
        category: "Marine Life"
    },
    {
        text: "An albatross can fly for hours without flapping its wings, using air currents for lift.",
        category: "Birds"
    },
    {
        text: "The human body has enough iron to make a nail 3 inches long. You contain about 4 grams of iron!",
        category: "Human Body"
    },
    {
        text: "Tardigrades (water bears) are nearly indestructible. They can survive extreme temperatures, pressure, and even the vacuum of space!",
        category: "Microorganisms"
    },
    {
        text: "A giraffe's tongue is 20 inches long and prehensile, allowing it to clean its own ears!",
        category: "Animals"
    },
    {
        text: "The Eiffel Tower grows taller in summer. The iron expands in the heat, causing it to grow up to 6 inches!",
        category: "Architecture"
    },
    {
        text: "Penguins have knees, but they're hidden inside their bodies, making them appear to have very short legs.",
        category: "Animals"
    },
    {
        text: "The inventor of the Frisbee is buried under a Frisbee. Walter Morrison's ashes were pressed into a Frisbee.",
        category: "Trivia"
    },
    {
        text: "Leopards are very flexible. They can rotate their ears 180 degrees independently!",
        category: "Animals"
    },
    {
        text: "Honey bee waggle dances communicate the location of flowers. The duration and angle of the dance tell other bees where food is!",
        category: "Insects"
    },
    {
        text: "A single bolt of lightning contains about 300 million volts and about 30,000 amps of electric current.",
        category: "Weather"
    },
    {
        text: "Humans and bananas share about 50-60% of the same DNA. We're more related to nature than you think!",
        category: "Biology"
    },
    {
        text: "The shortest war in history lasted only 38 minutes. It was between Britain and Zanzibar in 1896.",
        category: "History"
    },
    {
        text: "An ant can lift 10-50 times its own body weight. If humans had the same strength, we could lift cars!",
        category: "Insects"
    },
    {
        text: "Honey is the only food that never expires. Sealed honey has been found in Egyptian tombs that's still fresh!",
        category: "Food"
    },
    {
        text: "The sound you hear when you crack your knuckles is not your bones breaking, but gas bubbles in your joints popping!",
        category: "Human Body"
    }
];

// DOM Elements
const factText = document.getElementById('factText');
const categoryTag = document.getElementById('categoryTag');
const newFactBtn = document.getElementById('newFactBtn');
const shareBtn = document.getElementById('shareBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const favoritesList = document.getElementById('favoritesList');

// State Management
let currentFact = null;
let favorites = JSON.parse(localStorage.getItem('favoritesFacts')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesList();
    addEventListeners();
});

// Event Listeners
function addEventListeners() {
    newFactBtn.addEventListener('click', displayRandomFact);
    shareBtn.addEventListener('click', shareFact);
    favoriteBtn.addEventListener('click', toggleFavorite);
}

// Display Random Fact with Animation
function displayRandomFact() {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    currentFact = funFacts[randomIndex];
    
    // Add animation effect
    factText.style.opacity = '0';
    categoryTag.style.opacity = '0';
    
    setTimeout(() => {
        factText.textContent = currentFact.text;
        categoryTag.textContent = currentFact.category;
        
        // Check if already favorited
        const isFavorited = favorites.some(fav => fav.text === currentFact.text);
        updateFavoriteButton(isFavorited);
        
        factText.style.opacity = '1';
        categoryTag.style.opacity = '1';
    }, 300);
}

// Toggle Favorite
function toggleFavorite() {
    if (!currentFact) {
        alert('Please get a fact first!');
        return;
    }
    
    const isFavorited = favorites.some(fav => fav.text === currentFact.text);
    
    if (isFavorited) {
        favorites = favorites.filter(fav => fav.text !== currentFact.text);
        showNotification('Removed from favorites', 'info');
    } else {
        favorites.push(currentFact);
        showNotification('Added to favorites!', 'success');
    }
    
    localStorage.setItem('favoritesFacts', JSON.stringify(favorites));
    updateFavoritesList();
    updateFavoriteButton(favorites.some(fav => fav.text === currentFact.text));
}

// Update Favorite Button State
function updateFavoriteButton(isFavorited) {
    if (isFavorited) {
        favoriteBtn.style.opacity = '0.7';
        favoriteBtn.style.transform = 'scale(1.05)';
    } else {
        favoriteBtn.style.opacity = '1';
        favoriteBtn.style.transform = 'scale(1)';
    }
}

// Share Fact
function shareFact() {
    if (!currentFact) {
        alert('Please get a fact first!');
        return;
    }
    
    const shareText = `🎲 Fun Fact: ${currentFact.text}`;
    
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'Random Fun Fact',
            text: shareText
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        copyToClipboard(shareText);
    }
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('Failed to copy', 'error');
    });
}

// Show Notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideInNotif 0.3s ease-out;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutNotif 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update Favorites List Display
function updateFavoritesList() {
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">No saved facts yet. Click "Save" to add facts!</p>';
        return;
    }
    
    favoritesList.innerHTML = '';
    
    favorites.forEach((fav, index) => {
        const item = document.createElement('div');
        item.className = 'favorite-item';
        item.innerHTML = `
            <p class="favorite-item-text">${fav.text}</p>
            <button class="favorite-item-remove" onclick="removeFavorite(${index})">Remove</button>
        `;
        favoritesList.appendChild(item);
    });
}

// Remove Favorite
function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('favoritesFacts', JSON.stringify(favorites));
    updateFavoritesList();
    showNotification('Removed from favorites', 'info');
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInNotif {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutNotif {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);