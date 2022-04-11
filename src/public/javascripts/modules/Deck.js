import { Hand } from "./Hand.js";

/**
 * Controls the visuals of a deck of cards. It does not hold any real values,
 * it is only used for displaying what looks like a deck, the shuffling and other
 * animations that goes with it. The server will shuffle and send the real card values.
 * NB! Perhaps Deck should extend Hand but the other way around. Look into later..
 */
export class Deck extends Hand {
    constructor(id) {
        super(id);
        const backText = "D E A L"; // The backtext should be set at the highest level in the Hand class. Do this later to apply this to all cards in the game.
        this.create(this.MAX_CARDS_ON_HAND, backText);
        this.cardSpacing(20);
    }

    /**
     * "Creates" a deck of cards. Only the backside of stacked cards are shown for visuals.
     * Any real card values arrive from the server.
     * @param {int} nrOfCards Amount of cards to add to deck. Max allowed is 13, bigger values will default to 13.
     * That's because this is an extension of the Hand class that allows only 13 cards.
     */
    create(nrOfCards, backText = " ") {
        const cards = [];
        const BACKSIDE_VALUE = "00";

        // Because this class inherits from Hand and the Hand class can only add 13 cards to a hand,
        // it is not possible to add more than this to the deck without breaking the CSS.
        // That's ok, because this class will only simulate what looks like a deck of 52 cards.
        if (nrOfCards > this.MAX_CARDS_ON_HAND || nrOfCards === null)
            nrOfCards = this.MAX_CARDS_ON_HAND;

        // Add "backside cards" to cards array
        for (let i = 0; i < nrOfCards; i++) {
            cards.push(BACKSIDE_VALUE);
        }

        this.addCards(cards, null, backText, null);
        this.updateNrOfCards();
    }

    /**
     * "Shuffles" the deck. This is a visual only shuffle, the actual shuffled cards arrive from the server
     */
    shuffleAnimation() {}

    /**
     * "Deals" the cards to the players. This is an animation of dealing the cards.
     */
    dealAnimation() {}

    /**
     * Makes the deck non-interactable so it can be shown without starting the game
     */
    deactivateDeck() {
        this.container.style.pointerEvents = "none";
    }

    /**
     * Makes the deck interactable so it can be use to start a game
     */
    activateDeck() {
        this.container.style.pointerEvents = "all";
    }
}
