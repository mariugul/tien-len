// Globals
const MAX_CARDS_ON_HAND = 13;
const MIN_CARDS_ON_HAND = 0;
const selectedCards = []; // Saved as card id e.g. "2h", "KS"

/**
 * Raises or lowers the player card on selection
 */
function clickCard() {
  const CARD_HEIGHT = this.computedStyleMap().get("bottom").value;
  const LOWERED = 0;
  const CARD_ID = this.childNodes[1].cid;

  if (CARD_HEIGHT === LOWERED) {
    raiseCard(this);
    selectCard(CARD_ID);
  } else {
    lowerCard(this);
    deselectCard(CARD_ID);
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

// Add the selected card to array
function selectCard(cardId) {
  selectedCards.push(cardId);
}

// Remove the deselected card from array
function deselectCard(cardId) {
  for (let i = 0; i < selectedCards.length; i++) {
    if (selectedCards[i] === cardId) {
      selectedCards.splice(i, 1);
    }
  }
}

function removeCard(card) {}

function addCard(card) {}

// Get all player card container elements
const playerCards = document.getElementsByClassName("player-card-container");

// Assign selectCard() event on click to all player cards
for (let i = 0; i < playerCards.length; i++) {
  playerCards[i].addEventListener("click", clickCard);
}
