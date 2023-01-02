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

const users = {}; //users { ONKyOYBAguAinDJuAAAD( socket.id): 'itsvishal2417'(username) }

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
        // console.log('users', users);
        socket.join(roomId);
        // console.log('user -', socket.id, 'joined room', roomId);
        const clients = getAllConnectedClients(roomId, 'workspace');
        // console.log('clients', clients);
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
        workspace.to(socketId).emit('codeChange', { code, socketId });
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
        // console.log('User left', socket.id);
        // console.log('users', users);
    });
});

//add a new socket connection for voice calling
const socketUserMap = {};
const voiceCall = io.of('/voiceCall');
voiceCall.on('connection', (socket) => {
    console.log('a user JOINED a call - ', socket.id);

    socket.on('join', ({ roomId, user }) => {
        socketUserMap[socket.id] = user;
        const clients = Array.from(
            io.of('/voiceCall').adapter.rooms.get(roomId) || []
        );
        clients.forEach((clientId) => {
            voiceCall.to(clientId).emit('addPeer', {
                peerId: socket.id,
                createOffer: false,
                user,
            });
            socket.emit('addPeer', {
                peerId: clientId,
                createOffer: true,
                user: socketUserMap[clientId],
            });

            console.log(
                'user ',
                user.username,
                ' with clientId -> ',
                clientId,
                '& socket.id -> ',
                socket.id,
                'joined voicecall room',
                roomId
            );
        });
        socket.join(roomId);
        console.log('clients - ', clients);
        // console.log('socketUserMap - ', socketUserMap);
    });

    socket.on('relayIce', ({ peerId, icecandidate }) => {
        voiceCall.to(peerId).emit('iceCandidate', {
            peerId: socket.id,
            icecandidate,
        });
    });

    socket.on('relaySdp', ({ peerId, sessionDescription }) => {
        voiceCall.to(peerId).emit('sessionDescription', {
            peerId: socket.id,
            sessionDescription,
        });
    });

    socket.on('mute', ({ roomId, userId }) => {
        const clients = Array.from(
            io.of('/voiceCall').adapter.rooms.get(roomId) || []
        );
        clients.forEach((clientId) => {
            voiceCall.to(clientId).emit('mute', {
                peerId: socket.id,
                userId,
            });
        });
    });

    socket.on('unmute', ({ roomId, userId }) => {
        const clients = Array.from(
            io.of('/voiceCall').adapter.rooms.get(roomId) || []
        );
        clients.forEach((clientId) => {
            voiceCall.to(clientId).emit('unmute', {
                peerId: socket.id,
                userId,
            });
        });
    });

    socket.on('muteInfo', ({ userId, roomId, isMute }) => {
        const clients = Array.from(
            io.of('/voiceCall').adapter.rooms.get(roomId) || []
        );
        clients.forEach((clientId) => {
            if (clientId !== socket.id) {
                console.log('mute info');
                voiceCall.to(clientId).emit('muteInfo', {
                    userId,
                    isMute,
                });
            }
        });
    });

    const leaveRoom = () => {
        const { rooms } = socket;
        Array.from(rooms).forEach((roomId) => {
            const clients = Array.from(
                io.of('/voiceCall').adapter.rooms.get(roomId) || []
            );
            clients.forEach((clientId) => {
                voiceCall.to(clientId).emit('removePeer', {
                    peerId: socket.id,
                    userId: socketUserMap[socket.id]?.id,
                });

                // socket.emit('removePeer', {
                //     peerId: clientId,
                //     userId: socketUserMap[clientId]?.id,
                // });
            });
            socket.leave(roomId);
        });
        delete socketUserMap[socket.id];
    };

    socket.on('leave', leaveRoom);
    socket.on('disconnecting', leaveRoom);
});

server.listen(PORT, () => {
    console.log('Hello! This is dev chat+ backend, listening on port - ', PORT);
});
