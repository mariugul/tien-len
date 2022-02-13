import { PlayerHand } from "./modules/PlayerHand.js";

// Constants
const mockCards = ["3h", "4c", "5d", "6s", "7h", "8c", "9d", "10s", "Jh", "Qc", "Kd", "As", "2h"];
const mockBacksideCards = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
const LEFT = -90; // Rotation degrees
const RIGHT = 90;
const OPPONENTS_SIZE = 0.8;

const player = new PlayerHand("player-hand-container", mockCards, clickCard);
player.size(1);

const opponent1 = new PlayerHand("opponent1-hand-container", mockBacksideCards);
opponent1.size(OPPONENTS_SIZE);
opponent1.rotate(LEFT);

const opponent2 = new PlayerHand("opponent2-hand-container", mockBacksideCards);
opponent2.size(OPPONENTS_SIZE);

const opponent3 = new PlayerHand("opponent3-hand-container", mockBacksideCards);
opponent3.size(OPPONENTS_SIZE);
opponent3.rotate(RIGHT);

const tableCards = new PlayerHand("table-cards-container", mockCards);
tableCards.size(OPPONENTS_SIZE);

/**
 * Remove cards left on hand (if any) and add new cards
 */
function dealCards() {
    player.clearSelectedCards();
    player.removeAllCards();
    player.addCards(mockCards, clickCard);
}

/**
 * Puts the selected cards on the table
 * @returns Exits if there are no cards selected
 */
function playSelectedCards() {
    if (!player.cardsSelected()) return;

    player.removeSelectedCards();
}

/**
 * Event handler for clicks on player-cards
 */
function clickCard() {
    const cardHeight = this.computedStyleMap().get("bottom").value;
    const LOWERED = 0;

    if (cardHeight === LOWERED) {
        player.raiseCard(this);
        player.selectCard(this.cid);
        player.addCardShadow(this);
    } else {
        player.lowerCard(this);
        player.deselectCard(this.cid);
        player.removeCardShadow(this);
    }
}

// Assign play button function
const playBtn = document.getElementById("play-button");
playBtn.addEventListener("click", playSelectedCards);

// Assign deal button function
const dealBtn = document.getElementById("deal-button");
dealBtn.addEventListener("click", dealCards);
