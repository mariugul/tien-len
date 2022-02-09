// Globals
// ---------------------------------------------------------------------------
const MAX_CARDS_ON_HAND = 13;
const MIN_CARDS_ON_HAND = 0;
const mockCards = ["As", "Ah", "Jd", "3s", "Kc", "9h", "4d", "8s", "2s", "10c"];
const selectedCards = []; // Saved as "2h", "KS" etc.
const playerHandContainer = document.getElementById("player-hand-container");

function getPlayerCardContainers() {
  return playerHandContainer.getElementsByClassName("player-card-container");
}

function getPlayerCardElements() {
  return playerHandContainer.getElementsByTagName("card-t");
}

// Public API
// ---------------------------------------------------------------------------
/**
 * Gets all the cards that are currently in the the player's hand
 * @returns {Array} Cards in the form of card id's: "Ks", "Ah" etc.
 */
function getCardsOnHand() {
  const cardsOnHand = []; // Saved as card id

  for (let i = 0; i < getPlayerCardElements().length; i++) {
    cardsOnHand.push(getPlayerCardElements().item(i).cid);
  }

  return cardsOnHand;
}

function getNrOfCardsOnHand() {
  return getPlayerCardContainers().length;
}

// Helper functions (local)
// ---------------------------------------------------------------------------
function updatetNrOfCardsOnHand() {
  const root = document.documentElement;
  root.style.setProperty("--nr-of-cards-on-hand", getNrOfCardsOnHand());
}

function removeCardFromHand(cardContainer) {
  cardContainer.remove();
}

function removeSelectedCardsFromHand() {
  for (let i = 0; i < selectedCards.length; i++) {
    for (let j = 0; j < getPlayerCardElements().length; j++) {
      if (getPlayerCardElements()[j].cid === selectedCards[i]) {
        removeCardFromHand(getPlayerCardElements()[j].parentElement);
      }
    }
  }
}

function removeAllCardsFromHand() {
  while (playerHandContainer.firstChild) {
    playerHandContainer.removeChild(playerHandContainer.firstChild);
  }
}

// Clears the array of selected cards
function clearSelectedCards() {
  selectedCards.length = 0;
}

function addCardToHand(cardId) {
  const cardContainer = document.createElement("div");
  cardContainer.addEventListener("click", clickCard);
  cardContainer.className =
    "player-card-container w3-ripple w3-hover-shadow w3-round-large";
  cardContainer.innerHTML = `<card-t class="player-card" cid="${cardId}"></card-t>`;
  playerHandContainer.appendChild(cardContainer);
}

function addCardsToHand(cards) {
  if (cards.length + getCardsOnHand() >= 13) return; // Don't allow more than 13 cards on hand

  cards.forEach((cid) => {
    addCardToHand(cid);
  });
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

function addCardShadow(cardContainer) {
  cardContainer.style.boxShadow =
    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
}

function removeCardShadow(cardContainer) {
  cardContainer.style.boxShadow = null;
}

function cardsSelected() {
  return selectedCards.length === 0 ? false : true;
}

// Event Handlers
// ---------------------------------------------------------------------------
/**
 * Remove cards left on hand (if any) and add new cards
 */
function dealCards() {
  clearSelectedCards();
  removeAllCardsFromHand();
  addCardsToHand(mockCards);
  updatetNrOfCardsOnHand();
}

function playSelectedCards() {
  if (!cardsSelected()) return;

  removeSelectedCardsFromHand();
  clearSelectedCards();
  updatetNrOfCardsOnHand();

  console.log(
    document.documentElement.style.getProperty("--nr-of-cards-on-hand")
  );
}

/**
 * Raises or lowers the player card on selection
 */
function clickCard() {
  const CARD_HEIGHT = this.computedStyleMap().get("bottom").value;
  const LOWERED = 0;
  const CARD_ID = this.getElementsByTagName("card-t").item(0).cid;

  if (CARD_HEIGHT === LOWERED) {
    raiseCard(this);
    selectCard(CARD_ID);
    addCardShadow(this);
  } else {
    lowerCard(this);
    deselectCard(CARD_ID);
    removeCardShadow(this);
  }
}

// Event Listeners
// ---------------------------------------------------------------------------

(function addClickCardListener() {
  for (let i = 0; i < getPlayerCardContainers().length; i++) {
    getPlayerCardContainers()[i].addEventListener("click", clickCard);
  }
})();

// Assign play button function
document
  .getElementById("play-button")
  .addEventListener("click", playSelectedCards);

// Assign deal button function
document.getElementById("deal-button").addEventListener("click", dealCards);
