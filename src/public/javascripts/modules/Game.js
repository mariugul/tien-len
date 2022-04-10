import { Hand } from "./Hand.js";
import { Deck } from "./Deck.js";
import { Player } from "./Player.js"
import { Network } from "./Network.js";

/**
 *
 */
export class Game {
    constructor() {
        this.nrOfPlayers = 4; // Amount of players in the game
        this.playersInRound = 4; // Players currently playing in the round (players who have not passed)
        this.thinkTimeMs = 1000; // Time to think for each player
        this.delayedStart = 0; // A delayed start for the first round to get an overview of cards. This happens again if the animation is cancelled.
        this.currentPlayerTurn; // The player that is currently allowed to put cards on the table

        this.cards = ["3h","4c","5d","6s","7h","8c","9d","10s","Jh","Qc","Kd","As","2h",];
        this.backsideCards = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
        
        // Create all players and the table
        // this.#createPlayers();
        this.table = new Hand("table-cards-container", this.cards);
        this.player1 = new Player("player-hand-container", this.cards, true);
        this.player2 = new Player("opponent-left-hand-container", this.backsideCards);
        this.player3 = new Player("opponent-top-hand-container", this.backsideCards);
        this.player4 = new Player("opponent-right-hand-container", this.backsideCards);

        // Set up of hands
        const OPPONENTS_SIZE = 0.5;
        this.player1.size(0.8);
        this.player2.size(OPPONENTS_SIZE);
        this.player3.size(OPPONENTS_SIZE);
        this.player4.size(OPPONENTS_SIZE);
        this.table.size(OPPONENTS_SIZE + 0.15);

        // Hide all hands on startup
        this.player1.hide();
        this.player2.hide();
        this.player3.hide();
        this.player4.hide();
        this.table.hide();

        // Create card deck
        this.deck = new Deck("deck-container");
        this.deck.size(0.6);
        // this.deck.addEventHandler(this.#dealCards);
        this.deck.container.addEventListener("click", () => this.#dealCards.call(this), false);

        this.#createProgressBarAnimation();

        // Get player buttons container. NB! Maybe player buttons should exist as a class (or inside Game Logic class)
        this.playerButtons = document.getElementById("player-buttons");
        this.playerButtons.style.display = "none";

        this.playButton = document.getElementById("play-button");
        this.playButton.addEventListener("click", () => this.#playCards.call(this), false);

        // Progress bar
        this.progressBar = document.getElementById("progress-bar");

        // Init Network module
        var io = new Network();

    }

    // Private properties
    #nrOfPlayers
    #playersInRound
    #thinkTimeMs
    #delayedStartMs

    set nrOfPlayers(nr){
        this.#nrOfPlayers = nr;
        this.#createProgressBarAnimation(); // Create animation again to renew the changed variables
    }

    set playersInRound(nr){
        this.#playersInRound = nr;
        this.#createProgressBarAnimation(); // Create animation again to renew the changed variables
    }

    set thinkTimeMs(ms){
        this.#thinkTimeMs = ms;
        this.#createProgressBarAnimation(); // Create animation again to renew the changed variables
    }

    set delayedStartMs(ms){
        this.#delayedStartMs = ms;
        this.#createProgressBarAnimation(); // Create animation again to renew the changed variables
    }

    start() {}

    stop() {}

    // Need to call this with "this" as the class object and not the clicked object
    #dealCards() {
        this.player1.clearSelectedCards();
        this.player1.removeAllCards(); 
        this.player1.addCards(this.cards, true);

        this.#showProgressBar();
        console.log(this.progressBarAnimation);
        // this.progressBarAnimation.start();
        this.deck.hide();
    
        this.player1.show();
        this.player2.show();
        this.player3.show();
        this.player4.show();
        this.playerButtons.style.display = "block";
    }

    #playCards() {
        if (!this.player1.cardsSelected()) return;
    
        this.player1.removeSelectedCards();
        // progressBar.stop();
        // deck.show(); // This is only for debug, the deck should only show when all cards are played. That is controled in the game logic.
    }

    #createProgressBarAnimation() {
        this.progressBarAnimation = document
            .getElementById("progress")
            .animate(
                [
                    { transform: "scaleX(100%)", backgroundColor: "green" },
                    { color: "yellow" },
                    { transform: "scaleX(0)", backgroundColor: "red" },
                ],
                {
                    duration: this.#thinkTimeMs,
                    iterations: this.#playersInRound,
                    delay: this.#delayedStartMs,
                }
            );
        // Stop the animation initially
        this.progressBarAnimation.cancel();
    }

    #showProgressBar() {
        this.progressBar.style.display = "block";
    }

    #hideProgressBar() {
        this.progressBar.style.display = "none";
    }

}
