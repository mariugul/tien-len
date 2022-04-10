module.exports = (io, socket, game) => {
    const PLAYER = "player";
    const SPECTATOR = "spectator";

    // Type of person = [player | spectator]
    const registerPlayer = (name) => {
        // Register the name
        game.addPlayer(name, socket.id);

        // Join a room (?)
        // < code >

        console.log(`Player ${name} registered`);
    }

    const registerSpectator = () => {
        // Get the socket id
        // Use the id to register as spectator
        console.log(`Spectator registered!`);
    }

    socket.on("register:player", registerPlayer);
    socket.on("register:spectator", registerSpectator);
  }
  