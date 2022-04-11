module.exports = (io, socket, game) => {
    const PLAYER = "player";
    const SPECTATOR = "spectator";

    // Type of person = [player | spectator]
    const registerPlayer = (name) => {
        // Register name and socket id
        game.addPlayer(name, socket.id);

        // Join a room (?)
        // < code >

        // Debug feedback
        if (game.nrOfPlayers() <= 4) {
            console.log(`Player ${name} registered`);
        } else console.log("Table is full.");
    }

    const registerSpectator = () => {
        // Get the socket id
        // Use the id to register as spectator
        console.log(`Spectator registered!`);
    }

    socket.on("register:player", registerPlayer);
    socket.on("register:spectator", registerSpectator);
  }
  