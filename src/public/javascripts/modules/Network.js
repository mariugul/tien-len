// Socket.io
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js"; // Production
const socket = io();

export class Network {
    constructor() {
        socket.on("connect", () => {
            console.log(`Connected to server: ${socket.id}`);
        });

        socket.on("disconnect", () => {
            console.log(`Disconnected from server.`);
        });
    }

    /** 
     * Registers a player in the server when the player sat down at the table
     * 
     * @param {str} name Player name
     */
    async registerPlayer(name) {
        socket.emit("register:player", name);
    }

    async registerSpectator() {
        socket.emit("register:spectator");
    }

}