/**
 * Super class for all hands (player and opponent)
 * @param {string} id Takes the id of the hand e.g. "player-hand-container"
 */
export class Hand {
    constructor(id) {
        this.container = document.getElementById(id);
    }

    // Constants
    MAX_CARDS_ON_HAND = 13;
    MIN_CARDS_ON_HAND = 0;

    // Variables
    container;

    // API
    // ----------------------------------------------------------------
    /**
     * Gets all the card elements as HTML element
     * @returns {HTMLelement} Card elements "card-t"
     */
    getCardElements() {
        return this.container.getElementsByTagName("card-t");
    }

    /**
     *
     * @param {Array} cards Array of card ID's (cid) in the form of "As", "Kh", "2c" etc.
     * @param {string} backText Text that will show on the backside of the card
     * @param {int} raiseTransitionTime Transition time for a card that is selected to be raised.
     * @returns Exits if the number of cards passed in + the number of cards on hand exceeds 13
     */
    addCards(cards, eventHandler = null, backText=" ", raiseTransitionTime=1) {
        if (cards.length + this.getCards() > this.MAX_CARDS_ON_HAND) return; // Don't allow more than 13 cards on hand

        cards.forEach((cid) => {
            const card = document.createElement("card-t");
            card.style.transition = `transform ${raiseTransitionTime}s ease`;
            // No click handler passed in means no selection of cards
            if (eventHandler === null) {
                card.className = `card w3-round-large`;
            } else {
                card.className = `card w3-hover-shadow w3-round-large`;
                card.style.cursor = "pointer";
            }
            
            card.setAttribute("cid", cid);
            card.setAttribute("backtext", backText);
            card.addEventListener("click", eventHandler, false);
            this.container.appendChild(card);
        });

        this.updateNrOfCards(); // Makes sure CSS size matches the amount of cards on hand
    }

    /**
     * Remove one card from hand
     * @param {HTMLelement} cardElement "card-t" elements
     */
    removeCard(cardElement) {
        cardElement.remove();
        this.updateNrOfCards(); // Makes sure CSS size matches the amount of cards on hand
    }

    /**
     * Removes all card container elements from hand container
     */
    removeAllCards() {
        while (this.container.firstChild) {
            this.removeCard(this.container.firstChild);
        }
    }

    /**
     * Gets all the cards that are currently in the hand
     * @returns {Array} Cards in the form of card id's: "Ks", "Ah" etc.
     */
    getCards() {
        const cards = []; // Saved as card id

        for (let i = 0; i < this.getCardElements().length; i++) {
            cards.push(this.getCardElements().item(i).cid);
        }

        return cards;
    }

    /**
     * Gets the number of cards that are currently in the hand
     * @returns {int} Number of cards
     */
    getNrOfCards() {
        return this.getCards().length;
    }

    /**
     * When a card is added or removed from hand, the corresponding CSS value
     * must be updated for the hand container to resize.
     */
    updateNrOfCards() {
        this.container.style.setProperty("--nr-of-cards", this.getNrOfCards());
    }

    /**
     * Sets the size of the hand relative to the default card size from hand.css
     * @param {int} ratio Takes a number > 0 and scales the hand with regards to the default width.
     * Ratio = 2 is twice the default width and 0.5 is half.
     */
    size(ratio) {
        if (ratio < 0) return; // Exit if ratio is below zero
        this.container.style.setProperty("--hand-size", ratio);
    }

    /**
     * Rotates the hand
     * @param {int} degrees The amount of degrees to rotate the hand
     */
    rotate(degrees) {
        this.container.style.transform = `rotate(${degrees}deg)`;
    }

    /**
     * Displays the hand if it was hidden.
     */
    show() {
        this.container.style.display = "block";
    }

    /**
     * Hides the hand by setting display to none
     */
    hide() {
        this.container.style.display = "none";
    }
}
