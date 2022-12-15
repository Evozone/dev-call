const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
    },
});
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello! This is dev chat+ backend.');
});

const users = {}; //users { ONKyOYBAguAinDJuAAAD( socket.id): 'itsvishal2417 socket.id'(username) }

function getAllConnectedClients(roomId, namespace) {
    return Array.from(
        io.of(`/${namespace}`).adapter.rooms.get(roomId) || []
    ).map((socketId) => {
        return {
            socketId,
            username: users[socketId],
        };
    });
}

const workspace = io.of('/workspace');
workspace.on('connection', (socket) => {
    socket.on('join', ({ roomId, username }) => {
        users[socket.id] = username;
        console.log('users', users);
        socket.join(roomId);
        console.log('user -', socket.id, 'joined room', roomId);
        const clients = getAllConnectedClients(roomId, 'workspace');
        console.log('clients', clients);
        clients.forEach(({ socketId }) => {
            workspace.to(socketId).emit('addUser', {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on('codeChange', ({ code, roomId }) => {
        socket.in(roomId).emit('codeChange', { code });
    });

    socket.on('syncCode', ({ code, socketId }) => {
        workspace.to(socketId).emit('codeChange', { code });
    });

    socket.on('drawingChange', ({ drawingData, roomId }) => {
        socket.in(roomId).emit('drawingChange', { drawingData });
    });

    socket.on('syncCanvas', ({ drawingData, socketId }) => {
        workspace.to(socketId).emit('drawingChange', { drawingData, socketId });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit('disconnected', {
                socketId: socket.id,
                username: users[socket.id],
            });
        });
        delete users[socket.id];
        socket.leave();
        console.log('User left', socket.id);
        console.log('users', users);
    });
});

//add a new socket connection for voice calling
const voiceCall = io.of('/voiceCall');
voiceCall.on('connection', (socket) => {
    console.log('a user connected', socket.id);
});

server.listen(PORT, () => {
    console.log('Hello! This is dev chat+ backend, listening on port - ', PORT);
});
