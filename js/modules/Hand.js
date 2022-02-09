/**
 * Super class for all hands (player and opponent)
 * @param {Array} cards Takes cards as an array of card id's (cid)
 */
export class Hand {
    constructor(container) {
        this.#container = container;
    }

    // Constants
    static #MAX_CARDS_ON_HAND = 13;
    static #MIN_CARDS_ON_HAND = 0;

    // The container around all cards of a hand
    #container;

    // API
    // ----------------------------------------------------------------

    /**
     * Gets all the card containers as an HTML element
     * @returns {HTMLelement} Card containers - The wrap around each "card-t" element
     */
    getCardContainers() {
        return this.#container.getElementsByClassName("player-card-container");
    }

    /**
     * Gets all the card elements as HTML element
     * @returns {HTMLelement} Card elements "card-t"
     */
    getCardElements() {
        return this.#container.getElementsByTagName("card-t");
    }

    /**
     *
     * @param {Array} cards Array of card ID's (cid) in the form of "As", "Kh", "2c" etc.
     * @returns Exits if the number of cards passed in + the number of cards on hand exceeds 13
     */
    // EXTRACT addEventListener ????
    addCards(cards) {
        if (cards.length + getCards() >= 13) return; // Don't allow more than 13 cards on hand

        cards.forEach((cid) => {
            const cardContainer = document.createElement("div");
            cardContainer.addEventListener("click", clickCard);
            cardContainer.className =
                "player-card-container w3-ripple w3-hover-shadow w3-round-large";
            cardContainer.innerHTML = `<card-t class="player-card" cid="${cid}"></card-t>`;
            this.#container.appendChild(cardContainer);
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
        while (this.#container.firstChild) {
            this.#container.removeChild(this.#container.firstChild);
        }
    }

    /**
     * Gets all the cards that are currently in the hand
     * @returns {Array} Cards in the form of card id's: "Ks", "Ah" etc.
     */
    getCards() {
        const cards = []; // Saved as card id

        for (let i = 0; i < getCardElements().length; i++) {
            cards.push(getCardElements().item(i).cid);
        }

        return cards;
    }

    /**
     * Gets the number of cards that are currently in the hand
     * @returns {int} Number of cards
     */
    getNrOfCards() {
        return getCardContainers().length;
    }

    /**
     * When a card is added or removed from hand, the corresponding CSS value
     * must be updated for the hand container to resize.
     */
    updatetNrOfCards() {
        const root = document.documentElement;
        root.style.setProperty("--nr-of-cards-on-hand", getNrOfCards());
    }
}
