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
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Setup socket.io
const io = new Server(httpServer, { /* options */ });

// Register handlers
const registerSyncHandler = require("./public/javascripts/handlers/syncHandler")

// On connection with a client
io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}!`)
    registerSyncHandler(io, socket);

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});

// Set port and start server
var port = process.env.NODE_PORT || 3000;
httpServer.listen(port);
