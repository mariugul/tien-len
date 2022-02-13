import { PlayerHand } from "./modules/PlayerHand.js";
import { OpponentHand } from "./modules/OpponentHand.js";
import { TableCards } from "./modules/TableCards.js";

const mockCards = ["3h", "4c", "5d", "6s", "7h", "8c", "9d", "10s", "Jh", "Qc", "Kd", "As", "2h"];
const mockBacksideCards = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];

let player = new PlayerHand("player-hand-container", mockCards, clickCard);

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
