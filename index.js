// Import all dependencies
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// Init express
const app = express();

// Create server
const server = http.createServer(app);

// Init socket
const io = socketio(server);

// Import all routers here
const router = require('./router/router');

// Listen to routes
app.use(router);

// init cors
app.use(cors());
 

// Implement socket
io.on('connection', (socket) => {

    // when user joins
    socket.on('join', ({ name, room }, callback) => {
        // add any user who joins the chat
        const { error, user } = addUser({ id: socket.id, name, room });

        // give error in case of any present
        if (error) callback(error);

        // give the user who joins a welcome message
        socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to the room ${user.room}` });

        // give all other users in the room the message that a new user has joined
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the chat!` });

        // make the user join to the room
        socket.join(user.room);

        // give all users in the same room the currently logged in user data
        // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    // when user sends a message
    socket.on('sendMessage', (message, callback) => {
        // geth the user who is sending the message
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    });

    // on client disconnecting
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left the chat.` })
        }
    })
});


// Listen to server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})