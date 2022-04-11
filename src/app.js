// Include local js files
var Game = require("./javascripts/Game.js")

// Include middleware and other modules
var path = require('path');
var logger = require('morgan');
var express = require('express');
var { createServer } = require("http");
var cookieParser = require('cookie-parser');
var { Server } = require("socket.io");

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Register necessary middlewares etc..
var app = express();
const httpServer = createServer(app);
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
app.use('/', indexRouter);
app.use('/users', usersRouter)

// Initialize Game logic
let game = new Game(); 
console.log(`${game.nrOfPlayers()} Players: ${game.getPlayers()}`)

// Setup socket.io
const io = new Server(httpServer, { /* options */ });

// Register handlers
const registerSyncHandler = require("./javascripts/handlers/syncHandler");
const registerConnectionHandler = require("./javascripts/handlers/connectionHandler");

// On connection with a client
io.on("connection", async (socket) => {
    console.log(`User connected ${socket.id}!`)
    registerSyncHandler(io, socket);
    registerConnectionHandler(io, socket, game);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        console.log(`${game.nrOfPlayers()} Players: ${game.getPlayers()} Socket ID: ${game.playersId}`);
        
        // Remove player from game on disconnect
        game.removePlayer(socket.id);
      });
});

// Set port and start server
var port = process.env.NODE_PORT || 3000;
httpServer.listen(port);
