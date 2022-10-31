import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import PermMediaIcon from '@mui/icons-material/PermMedia';

import Coder from '../Coder';
import { initSocket } from '../../socket';
import './Whiteboard.css';
import { notifyAction } from '../../actions/actions';

export default function Whiteboard() {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth);

    const [canvasCurrent, setCanvasCurrent] = useState(null);
    const [coders, setCoders] = useState(null);

    const canvasRef = useRef(null);
    const colorsRef = useRef(null);
    const logoRef = useRef(null);
    const usersRef = useRef(null);
    const socketRef = useRef();

    useEffect(() => {
        if (!window.localStorage.getItem('dev')) {
            navigate('/');
        }
        document.title = 'Dev Chat+ Draw';

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const colors = document.getElementsByClassName('color');

        const current = {
            color: 'black',
        };

        const init = async () => {
            socketRef.current = await initSocket();
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
                    'Socket connection failed, Please close the tab & try again later.'
                );
                // navigate('/');
            }
            socketRef.current.emit('join', {
                roomId: params.boardId,
                username: currentUser.username,
            });
            socketRef.current.on(
                'joined',
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
                    setTimeout(() => {
                        socketRef.current.emit('syncCanvas', {
                            drawingData: canvas.toDataURL(),
                            socketId,
                        });
                    }, 1000);
                }
            );
            socketRef.current.on(
                'drawingChange',
                ({ drawingData, socketId }) => {
                    if (socketId) {
                        const canvas = canvasRef.current;
                        const context = canvas.getContext('2d');
                        context.fillStyle = 'white';
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        const image = new Image();
                        image.onload = function () {
                            context.drawImage(image, 0, 0);
                        };
                        image.src = drawingData;
                    } else {
                        onDrawingEvent(drawingData);
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

        const onColorUpdate = (e) => {
            current.color = e.target.className.split(' ')[1];
        };

        for (let i = 0; i < colors.length; i++) {
            colors[i].addEventListener('click', onColorUpdate);
        }

        let drawing = false;

        const drawLine = (x0, y0, x1, y1, color, emit) => {
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.strokeStyle = color;
            if (color === 'white') {
                context.lineWidth = 30;
            } else {
                context.lineWidth = 2;
            }
            context.stroke();
            context.closePath();
            if (!emit) {
                return;
            }

            const w = canvas.width;
            const h = canvas.height;

            socketRef.current.emit('drawingChange', {
                drawingData: {
                    x0: x0 / w,
                    y0: y0 / h,
                    x1: x1 / w,
                    y1: y1 / h,
                    color,
                },
                roomId: params.boardId,
            });
        };

        const onMouseDown = (e) => {
            drawing = true;
            current.x = e.clientX || e.touches[0].clientX;
            current.y = e.clientY || e.touches[0].clientY;
        };

        const onMouseMove = (e) => {
            if (!drawing) {
                return;
            }
            drawLine(
                current.x,
                current.y,
                e.clientX || e.touches[0].clientX,
                e.clientY || e.touches[0].clientY,
                current.color,
                true
            );
            current.x = e.clientX || e.touches[0].clientX;
            current.y = e.clientY || e.touches[0].clientY;
        };

        const onMouseUp = (e) => {
            if (!drawing) {
                return;
            }
            drawing = false;
            drawLine(
                current.x,
                current.y,
                e.clientX || e.touches[0].clientX,
                e.clientY || e.touches[0].clientY,
                current.color,
                true
            );
        };

        const throttle = (callback, delay) => {
            let previousCall = new Date().getTime();
            return function () {
                const time = new Date().getTime();

                if (time - previousCall >= delay) {
                    previousCall = time;
                    callback.apply(null, arguments);
                }
            };
        };

        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mouseout', onMouseUp);
        canvas.addEventListener('mousemove', throttle(onMouseMove, 10));

        canvas.addEventListener('touchstart', onMouseDown);
        canvas.addEventListener('touchend', onMouseUp);
        canvas.addEventListener('touchcancel', onMouseUp);
        canvas.addEventListener('touchmove', throttle(onMouseMove, 10));

        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', onResize);
        onResize();

        const onDrawingEvent = (data) => {
            const w = canvas.width;
            const h = canvas.height;
            drawLine(
                data.x0 * w,
                data.y0 * h,
                data.x1 * w,
                data.y1 * h,
                data.color
            );
        };

        return () => {
            if (socketRef.current) {
                socketRef.current?.disconnect();
                socketRef.current?.off('joined');
                socketRef.current.off('drawingChange');
                socketRef.current?.off('connect_error');
                socketRef.current?.off('connect_failed');
                socketRef.current?.off('disconnected');
            }
        };
    }, [currentUser.username]);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const downloadCanvas = () => {
        const canvas = canvasRef.current;
        setCanvasCurrent(canvas.toDataURL());
        const image = canvas.toDataURL('png');
        const link = document.createElement('a');
        const time = new Date();
        const imageName = time.toISOString();
        link.download = `${params.boardId}-${imageName}.png`;
        link.href = image;
        link.click();

        setTimeout(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            const image = new Image();
            image.onload = function () {
                context.drawImage(image, 0, 0);
            };
            image.src = canvasCurrent;
        }, 2000);
    };

    const leaveBoard = () => {
        window.close();
    };

    return (
        <div>
            <canvas ref={canvasRef} className='whiteboard' />
            <div
                ref={logoRef}
                className='logo'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <img
                    style={{ height: '40px' }}
                    src='/assets/landing-logo.svg'
                    alt='logo'
                />
                <h6
                    style={{
                        color: '#fff',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        margin: '0 0 0 10px',
                    }}
                >
                    Dev Chat+ Draw
                </h6>
            </div>
            <div ref={colorsRef} className='colors'>
                <div className='color black' />
                <div className='color red' />
                <div className='color green' />
                <div className='color blue' />
                <div className='color yellow' />

                {/* Create a Tooltip with Erase */}
                <Tooltip title='Erase'>
                    <div className='color white' />
                </Tooltip>

                {/* Create a vertical line */}
                <div className='vertical-line' />

                {/* Create a ToolTip with IconButton to Clear */}
                <Tooltip title='Clear'>
                    <IconButton
                        onClick={clearCanvas}
                        className='clear'
                        aria-label='clear'
                        sx={{ color: '#03256C' }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>

                {/* Create a ToolTip with IconButton to Download */}
                <Tooltip title='Save as PNG'>
                    <IconButton
                        onClick={downloadCanvas}
                        className='download'
                        aria-label='download'
                        sx={{ color: '#03256C' }}
                    >
                        <PermMediaIcon />
                    </IconButton>
                </Tooltip>

                {/* Create a ToolTip with IconButton to Leave */}
                <Tooltip title='Leave'>
                    <IconButton
                        onClick={leaveBoard}
                        className='leave'
                        aria-label='leave'
                        sx={{ color: '#EE4B2B' }}
                    >
                        <ExitToAppIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <div ref={usersRef} className='users'>
                {coders &&
                    coders.map((coder) => (
                        <Coder key={coder.socketId} username={coder.username} />
                    ))}
            </div>
        </div>
    );
}
