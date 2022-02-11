/**
 * Super class for all hands (player and opponent)
 * @param {string} name Takes the name of the hand e.g. "player", which makes "player-hand-container" etc.
 */
export class Hand {
    constructor(name) {
        this.name = name;
        this.cardClassName = `${name}-card`;
        this.containerClassName = `${name}-hand-container`;
        this.cardContainerClassName = `${name}-card-container`;
        this.container = document.getElementById(this.containerClassName);
    }

    // Constants
    MAX_CARDS_ON_HAND = 13;
    MIN_CARDS_ON_HAND = 0;

    // Variables
    name;
    container;
    cardClassName;
    containerClassName;
    cardContainerClassName;

    // API
    // ----------------------------------------------------------------

    /**
     * Gets all the card containers as an HTML element
     * @returns {HTMLelement} Card containers - The wrap around each "card-t" element
     */
    getCardContainers() {
        return this.container.getElementsByClassName(this.containerClassName);
    }

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
     * @returns Exits if the number of cards passed in + the number of cards on hand exceeds 13
     */
    addCards(cards) {
        if (cards.length + this.getCards() > this.MAX_CARDS_ON_HAND) return; // Don't allow more than 13 cards on hand

        cards.forEach((cid) => {
            const cardContainer = document.createElement("div");
            cardContainer.className = `${this.cardContainerClassName} w3-ripple w3-hover-shadow w3-round-large`;
            cardContainer.innerHTML = `<card-t class="${this.cardClassName}" cid="${cid}"></card-t>`;
            this.container.appendChild(cardContainer);
        });
    }

    /**
     * Remove one card from hand
     * @param {HTMLelement} cardContainer Card containers - The wrap around each "card-t" element
     */
    removeCard(cardContainer) {
        cardContainer.remove();
    }

    /**
     * Removes all card container elements from hand container
     */
    removeAllCards() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
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
        const root = document.documentElement;
        root.style.setProperty("--nr-of-cards-on-hand", this.getNrOfCards());
    }
}
