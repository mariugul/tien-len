// Socket.io
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js"; // Production


export class Network {
    constructor() {
        this.socket = io();

    }

}