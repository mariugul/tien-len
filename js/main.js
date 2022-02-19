import { PlayerHand } from "./modules/PlayerHand.js";
import { ProgressBar } from "./modules/ProgressBar.js";

// Constants
const mockCards = [
    "3h",
    "4c",
    "5d",
    "6s",
    "7h",
    "8c",
    "9d",
    "10s",
    "Jh",
    "Qc",
    "Kd",
    "As",
    "2h",
];
const mockBacksideCards = [];
const nrOfCards = 13;
for (let i = 0; i < nrOfCards; i++) {
    mockBacksideCards.push("0");
}

const OPPONENTS_SIZE = 0.5;

// Player hands
const player = new PlayerHand("player-hand-container", mockCards, clickCard);
const opponentLeft = new PlayerHand(
    "opponent-left-hand-container",
    mockBacksideCards
);
const opponentTop = new PlayerHand(
    "opponent-top-hand-container",
    mockBacksideCards
);
const opponentRight = new PlayerHand(
    "opponent-right-hand-container",
    mockBacksideCards
);
const tableCards = new PlayerHand("table-cards-container", mockCards);

// Set up of hands
player.size(0.8);
opponentLeft.size(OPPONENTS_SIZE);
opponentTop.size(OPPONENTS_SIZE);
opponentRight.size(OPPONENTS_SIZE);
tableCards.size(OPPONENTS_SIZE + 0.15);

//
player.hide();
opponentLeft.hide();
opponentRight.hide();
opponentTop.hide();
tableCards.hide();

// Test opponent select cards
// opponentLeft.raiseCard(opponentLeft.getCardElements()[5]);
// opponentTop.raiseCard(opponentTop.getCardElements()[5]);
// opponentRight.raiseCard(opponentRight.getCardElements()[5]);

// Progress bar
const progressBar = new ProgressBar();

/**
 * Remove cards left on hand (if any) and add new cards
 */
function dealCards() {
    player.clearSelectedCards();
    player.removeAllCards();
    player.addCards(mockCards, clickCard);

    progressBar.start();
    this.style.display = "none";

    player.show();
    opponentLeft.show();
    opponentRight.show();
    opponentTop.show();
}

/**
 * Puts the selected cards on the table
 * @returns Exits if there are no cards selected
 */
function playSelectedCards() {
    if (!player.cardsSelected()) return;

    player.removeSelectedCards();
    progressBar.stop();
    document.getElementById("deal-button").style.display = "block";
}

/**
 * Event handler for clicks on player-cards
 */
function clickCard() {
    const LOWERED = 0;
    let cardHeight = LOWERED;
    const transform = this.style.transform.match(/\d+/g); // Get X and Y coordinate
    if (transform !== null) cardHeight = transform["1"]; // Get the Y coordinate

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
