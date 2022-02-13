import { Hand } from "./Hand.js";

/**
 * Holds functionality for a player-hand where the cards are shown to the player
 * and can be clicked for selection.
 * @param {string} id Takes the id of the hand e.g. "player-hand-container"
 * @param {Array} cards Takes an array of card id's in the form of "As", "Kh" up to 13 cards.
 * Empty array means no cards, empty values are blanc cards and "00" means backside of card.
 * @extends {Hand}
 */
export class PlayerHand extends Hand {
    constructor(id, cards) {
        super(id);
        // this.addCards(cards);
        // this.updateNrOfCards();
    }

    // NB! This is static because the clickCard event handler had issues with "this" keyword.
    // Having this static solves it because PlayerCard.func() can be called to differentiate "this".
    // However, it means that the entire PlayerHand class is essentially a static class that can't be duplicated 
    // (which is ok in the context of this game).
    static selectedCards = []; // Saved as "2h", "KS" etc.

    // To raise the card more or less, adjust raise-ratio in css
    static raiseCard(cardElement) {
        cardElement.style.bottom = "var(--raise-card-on-click)";
    }

    static lowerCard(cardElement) {
        cardElement.style.bottom = null;
    }

    // Add the selected card to array
    static selectCard(cardId) {
        PlayerHand.selectedCards.push(cardId);
    }

    // Remove the deselected card from array
    static deselectCard(cardId) {
        for (let i = 0; i < PlayerHand.selectedCards.length; i++) {
            if (PlayerHand.selectedCards[i] === cardId) {
                PlayerHand.selectedCards.splice(i, 1);
            }
        }
    }

    static addCardShadow(cardElement) {
        cardElement.style.boxShadow =
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
    }

    static removeCardShadow(cardElement) {
        cardElement.style.boxShadow = null;
    }

    // Clears the array of selected cards
    clearSelectedCards() {
        PlayerHand.selectedCards.length = 0;
    }

    removeSelectedCards() {
        for (let i = 0; i < PlayerHand.selectedCards.length; i++) {
            for (let j = 0; j < this.getCardElements().length; j++) {
                if (this.getCardElements()[j].cid === PlayerHand.selectedCards[i]) {
                    this.removeCard(this.getCardElements()[j]);
                }
            }
        }
    }

    cardsSelected() {
        return PlayerHand.selectedCards.length === 0 ? false : true;
    }

    /**
     * Event handler for onClick events on cards
     */
    clickCard() {
        const cardHeight = this.computedStyleMap().get("bottom").value;
        const LOWERED = 0;

        if (cardHeight === LOWERED) {
            PlayerHand.raiseCard(this);
            PlayerHand.selectCard(this.cid);
            PlayerHand.addCardShadow(this);
        } else {
            PlayerHand.lowerCard(this);
            PlayerHand.deselectCard(this.cid);
            PlayerHand.removeCardShadow(this);
        }
    }

    /**
     * Overloaded function to assign event handler onClick of cards
     * @param {Array} cards Array of card ID's (cid) in the form of "As", "Kh", "2c" etc.
     * @returns Exits if the number of cards passed in + the number of cards on hand exceeds 13
     */
    addCards(cards) {        
        if (cards.length + this.getCards() > this.MAX_CARDS_ON_HAND) return; // Don't allow more than 13 cards on hand
        
        cards.forEach((cid) => {
            const card = document.createElement("card-t");
            card.className = `card w3-ripple w3-hover-shadow w3-round-large`;
            card.setAttribute("cid", cid);
            card.addEventListener("click", this.clickCard, false);
            this.container.appendChild(card);
        });
    }
}
