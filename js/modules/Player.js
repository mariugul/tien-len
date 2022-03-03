import { Hand } from "./Hand.js";

export class Player extends Hand{
    constructor(handContainerId, cards = [], isClickable = false) {
        super(handContainerId, cards, isClickable);
        this.name = "";
        this.wins = 0;
        this.losses = 0;
    }

    /**
     * Increments this players win-score by 1
     */
    incrementWins() {
        this.wins++;
    }

    /**
     * Increments this players lose-score by 1
     */
    incrementLosses() {
        this.losses++;
    }

    /**
     * Resets this players wins and losses to zero
     */
    resetScore() {
        this.wins = 0;
        this.losses = 0;
    }
}
