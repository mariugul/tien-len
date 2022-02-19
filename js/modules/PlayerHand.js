import { Hand } from "./Hand.js";

/**
 * Holds functionality for a player-hand where the cards are shown to the player
 * and can be clicked for selection.
 * @param {string} id Takes the id of the hand e.g. "player-hand-container"
 * @param {Array} cards Takes an array of card id's in the form of "As", "Kh" up to 13 cards.
 * Empty array means no cards, empty values are blanc cards and "00" means backside of card.
 * @param {function} cardClickHandler Takes a function to add as an event handler for card clicks
 * @extends {Hand}
 */
export class PlayerHand extends Hand {
    constructor(id, cards = [], cardClickHandler = null) {
        super(id);
        this.addCards(cards, cardClickHandler);
        this.updateNrOfCards();
    }

    selectedCards = []; // Saved as "2h", "KS" etc.

    // To raise the card more or less, adjust raise-ratio in css
    raiseCard(cardElement) {
        cardElement.style.transform =
            "translate(0px, calc(var(--raise-card-on-click) * -1))";
    }

    lowerCard(cardElement) {
        cardElement.style.transform = "none";
    }

    // Add the selected card to array
    selectCard(cardId) {
        this.selectedCards.push(cardId);
    }

    // Remove the deselected card from array
    deselectCard(cardId) {
        for (let i = 0; i < this.selectedCards.length; i++) {
            if (this.selectedCards[i] === cardId) {
                this.selectedCards.splice(i, 1);
            }
        }
    }

    addCardShadow(cardElement) {
        cardElement.style.boxShadow =
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
    }

    removeCardShadow(cardElement) {
        cardElement.style.boxShadow = null;
    }

    // Clears the array of selected cards
    clearSelectedCards() {
        this.selectedCards.length = 0;
    }

    removeSelectedCards() {
        for (let i = 0; i < this.selectedCards.length; i++) {
            for (let j = 0; j < this.getCardElements().length; j++) {
                if (this.getCardElements()[j].cid === this.selectedCards[i]) {
                    this.removeCard(this.getCardElements()[j]);
                }
            }
        }

        this.clearSelectedCards();
    }

    cardsSelected() {
        return this.selectedCards.length === 0 ? false : true;
    }
}
