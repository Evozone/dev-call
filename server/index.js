const express = require('express');
const jwt = require('jsonwebtoken');
const uuid4 = require('uuid4');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With, Content-Type, Authorization'
    );
    next();
});

app.get('/', (req, res) => {
    res.send('Hello! This is dev chat+ backend.');
});

app.get('/mtoken', (req, res) => {
    var app_access_key = process.env.HMS_ACCESS_KEY;
    var app_secret = process.env.HMS_SECRET_APP;
    try {
        const token = jwt.sign(
            {
                access_key: app_access_key,
                type: 'management',
                version: 2,
                iat: Math.floor(Date.now() / 1000),
                nbf: Math.floor(Date.now() / 1000),
            },
            app_secret,
            {
                algorithm: 'HS256',
                expiresIn: '1h',
                jwtid: uuid4(),
            }
        );
        res.status(200).json({
            success: true,
            data: {
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: { error },
        });
    }
});

const server = app.listen(PORT, () =>
    console.log("Hello! This is dev chat's backend, listening on port - ", PORT)
);

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CLIENT_URL,
    },
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
        socket.in(roomId).emit('codeChange', { code, syncCode: false });
    });

    socket.on('syncCode', ({ code, socketId }) => {
        workspace
            .to(socketId)
            .emit('codeChange', { code, socketId, syncCode: true });
    });

    socket.on('drawingChange', ({ drawingData, roomId }) => {
        socket.in(roomId).emit('drawingChange', { drawingData });
    });

    socket.on('syncCanvas', ({ drawingData, socketId }) => {
        workspace.to(socketId).emit('drawingChange', { drawingData, socketId });
    });

    socket.on('syncMessages', ({ messages, socketId }) => {
        workspace.to(socketId).emit('syncMessages', { messages });
    });

    socket.on('message', ({ roomId, message }) => {
        console.log(roomId);
        socket.in(roomId).emit('message', {
            message,
        });
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
