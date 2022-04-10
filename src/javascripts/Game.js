const MAX_PLAYERS = 4;

module.exports = class Game { 
    constructor() {
        console.log("Initialized Game!");
        this.players = []; // Name of players
        this.playersId = []; // The socket ID of those players at the same index
    }

    addPlayer(name, socketId) {
        if (this.players >= MAX_PLAYERS) return; // Don't allow more players if full

        this.players.push(name);
        this.playersId.push(socketId);
    }

    getPlayers() {
        return this.players;
    }

    nrOfPlayers() {
        return this.players.length;
    }

    removePlayer(socketId) {
        // Check that the socketId exists
        const index = this.playersId.indexOf(socketId);

        // Remove player name and socket ID, we assume that a player name exists at the same index
        if (index > -1) {
            this.players.splice(index, 1);
            this.playersId.splice(index, 1);
          }
    }
}