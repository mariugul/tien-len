/**
 * Raises or lowers the card depending on the state.
*/
function selectCard() {
    const CARD_HEIGHT = this.computedStyleMap().get('bottom').value;
    const LOWERED = 0;

    if (CARD_HEIGHT === LOWERED) {
        raiseCard(this);
    } else {
        lowerCard(this);
    }
}

// Raises the card using a global CSS variable
// To raise the card more or less, adjust raise-ratio in cards.css
function raiseCard(card) {
    card.style.bottom = "var(--card-selected-raise)"; 
}

function lowerCard(card) {
    card.style.bottom = null; 
}

// Get all player card container elements
const playerCards = document.getElementsByClassName("player-card-container");

// Assign selectCard() event on click to all player cards
for (let i = 0; i < playerCards.length; i++) {
    playerCards[i].addEventListener('click', selectCard);
}