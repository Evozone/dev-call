const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000;

const users = {};

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: users[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {
    // console.log('a user connected', socket.id);

    socket.on('join', ({ roomId, username }) => {
        users[socket.id] = username;
        socket.join(roomId);
        // console.log('joined', roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit('joined', {
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
        io.to(socketId).emit('codeChange', { code });
    });

    socket.on('drawingChange', ({ drawingData, roomId }) => {
        socket.in(roomId).emit('drawingChange', { drawingData });
    });

    socket.on('syncCanvas', ({ drawingData, socketId }) => {
        io.to(socketId).emit('drawingChange', { drawingData, socketId });
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
        // console.log('User left', socket.id);
    });
});

server.listen(PORT, () => {
    console.log('listening on port - ', PORT);
});
