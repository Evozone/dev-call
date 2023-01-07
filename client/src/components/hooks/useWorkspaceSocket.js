import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { initSocket } from '../../socket';
import { notifyAction } from '../../actions/actions';

export default function useWorkspaceSocket(
    currentUser,
    params,
    socketRef,
    canvasRef,
    codeRef
) {
    const dispatch = useDispatch();
    const [coders, setCoders] = useState([]);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket('workspace');
            socketRef.current.on('connect_error', (error) =>
                handleErrors(error)
            );
            socketRef.current.on('connect_failed', (error) =>
                handleErrors(error)
            );
            function handleErrors(error) {
                // eslint-disable-next-line no-console
                console.log('socket error', error);
                alert(
                    'Socket connection failed, Please refresh the app after ~2 minutes.'
                );
            }
            socketRef.current.emit('join', {
                roomId: params.workspaceId,
                username: currentUser.username,
            });
            socketRef.current.on(
                'addUser',
                ({ clients, username, socketId }) => {
                    if (username !== currentUser.username) {
                        dispatch(
                            notifyAction(
                                true,
                                'success',
                                `${username} joined the Canvas.`
                            )
                        );
                    }
                    setCoders(clients);
                    if (username !== currentUser.username) {
                        let drawingData = '';
                        if (
                            localStorage.getItem(
                                `${params.workspaceId}-drawing`
                            )
                        ) {
                            drawingData = localStorage.getItem(
                                `${params.workspaceId}-drawing`
                            );
                        } else {
                            drawingData = canvasRef?.current?.toDataURL();
                        }
                        setTimeout(() => {
                            socketRef.current.emit('syncCanvas', {
                                drawingData,
                                socketId,
                            });
                            socketRef.current.emit('syncCode', {
                                code:
                                    localStorage.getItem(
                                        `${params.workspaceId}-code`
                                    ) || codeRef.current,
                                socketId,
                            });
                        }, 1500);
                    }
                }
            );
            socketRef.current.on(
                'drawingChange',
                ({ drawingData, socketId }) => {
                    if (socketId) {
                        localStorage.setItem(
                            `${params.workspaceId}-drawing`,
                            drawingData
                        );
                    }
                }
            );
            socketRef.current.on('disconnected', ({ socketId, username }) => {
                dispatch(notifyAction(true, 'info', `${username} left.`));
                setCoders((prev) => {
                    return prev.filter(
                        (client) => client.socketId !== socketId
                    );
                });
            });
        };

        if (currentUser.username) {
            init();
        }

        return () => {
            if (socketRef.current) {
                socketRef.current?.disconnect();
                socketRef.current.off('drawingChange');
                socketRef.current.off('syncCanvas');
                socketRef.current?.off('addUser');
                socketRef.current?.off('connect_error');
                socketRef.current?.off('connect_failed');
                socketRef.current?.off('disconnected');
            }
        };
    }, [currentUser.username]);

    return coders;
}
