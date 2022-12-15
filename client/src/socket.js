import { io } from 'socket.io-client';

export const initSocket = async (namespace) => {
    const options = {
        forceNew: true,
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(`${process.env.REACT_APP_SERVER_URL}/${namespace}`, options);
};
