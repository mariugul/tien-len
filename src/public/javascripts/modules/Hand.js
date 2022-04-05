/**
 * Super class for all hands
 * @param {string} id Takes the id of the hand e.g. "player-hand-container" as a string
 * @param {Array} cards Takes an array of card id's in the form of "As", "Kh" up to 13 cards
 * Empty array means no cards, empty values are blanc cards and "00" means backside of card
 * @param {function} isClickable Takes a function to add as an event handler for card clicks
 */
export class Hand {
    constructor(id, cards = [], isClickable = false) {
        this.container = document.getElementById(id);
        this.addCards(cards, isClickable);
        this.updateNrOfCards();
    }
    
    // Constants
    MAX_CARDS_ON_HAND = 13;
    MIN_CARDS_ON_HAND = 0;

    // Variables
    container;
    selectedCards = []; // Saved as "2h", "KS" etc.


    // API
    // ----------------------------------------------------------------
    /**
     * Gets the container object.
     * @returns Container object
     */
    getContainerObject() {
        return this.container;
    }

    /**
     * Gets all the card elements as HTML element
     * @returns {HTMLelement} Card elements "card-t"
     */
    getCardElements() {
        return this.container.getElementsByTagName("card-t");
    }

    /**
     * Event handler for clicks on player-cards
     * @param {HTMLelement} card card-t HTML element
     */
    #clickCard(card) {
        const LOWERED = 0;
        let cardHeight = LOWERED;
        const transform = card.style.transform.match(/\d+/g); // Get X and Y coordinate
        if (transform !== null) cardHeight = transform["1"]; // Get the Y coordinate

        if (cardHeight === LOWERED) {
            this.raiseCard(card);
            this.selectCard(card.cid);
            this.addCardShadow(card);
        } else {
            this.lowerCard(card);
            this.deselectCard(card.cid);
            this.removeCardShadow(card);
        }
    }

    /**
     *
     * @param {Array} cards Array of card ID's (cid) in the form of "As", "Kh", "2c" etc.
     * @param {boolean} isClickable If set to true, the cards get a clickHandler to raise/lower the cards. Defaults to false
     * @param {string} backText Text that will show on the backside of the card. Defaults to empty text
     * @param {int} raiseTransitionTime Transition time for a card that is selected to be raised. Defaults to 1s
     * @returns Exits if the number of cards passed in + the number of cards on hand exceeds 13
     */
    addCards(
        cards,
        isClickable = false,
        backText = " ",
        raiseTransitionTime = 1
    ) {
        if (cards.length + this.getCards() > this.MAX_CARDS_ON_HAND) return; // Don't allow more than 13 cards on hand

        cards.forEach((cid) => {
            const card = document.createElement("card-t");

            // Only set transitions if a raiseTransitionTime value is passed or not passed.
            // On passing of the value "null" we don't want transitions.
            if (raiseTransitionTime !== null)
                card.style.transition = `transform ${raiseTransitionTime}s ease`;

            // No click handler passed in means no selection of cards
            if (!isClickable) {
                card.className = `card w3-round-large`;
            } else {
                card.className = `card w3-hover-shadow w3-round-large`;
                card.style.cursor = "pointer";
                card.addEventListener(
                    "click",
                    () => this.#clickCard.call(this, card),
                    false
                );
            }

            card.setAttribute("cid", cid);
            card.setAttribute("backtext", backText);
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

    /**
     * Sets the space between the cards
     * @param {int} ratio The ratio of space between the cards with regards to hand size.
     * An integer >1 means smaller gap between the cards and 0 < ratio < 1 means bigger gap.
     * Passing "2" is half the size and "0.5" is twice the size. If <=0 or null is passed the default value is used.
     */
    cardSpacing(ratio) {
        if (ratio <= 0 || ratio === null) return;

        // Research how to get property value of --card-spacing-ratio
        // Set default ratio to --card-spacing-ratio, for now it's hard coded
        const defaultRatio = 3.75;
        this.container.style.setProperty(
            "--card-spacing-ratio",
            defaultRatio * ratio
        );
    }

    /**
     * Adds an event listener to the entire hand. Useful if there is no
     * event listener on the individual cards and you would like the same listener on all of them.
     * @param {function} func Event handler function.
     */
    addEventHandler(func) {
        this.container.addEventListener("click", func);
    }

    /**
     * Gets the style property so styles can be applied with the syntax: this.style().display = "none"
     * @returns style property of the container
     */
    style() {
        return this.container.style;
    }

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
