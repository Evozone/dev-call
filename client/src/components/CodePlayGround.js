import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SettingsIcon from '@mui/icons-material/Settings';

import Coder from './Coder';
import CodeEditor from './CodeEditor';
import { Typography } from '@mui/material';
import { initSocket } from '../socket';
import EditorDropdown from './EditorDropdown';
import { defineTheme } from '../utils/defineTheme';
import OutputBox from './OutputBox';
import CodeInput from './CodeInput';
import OutputDetails from './OutputDetails';
import { languageOptions } from '../constants/languageOptions';

// CodePlayGround component
export default function CodePlayGround() {
    let params = useParams();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth);
    const socketRef = useRef(null);
    const codeRef = useRef(null);

    const [coders, setCoders] = useState([]);
    const [lang, setLang] = useState(languageOptions[0]);
    const [theme, setTheme] = useState('vs-dark');
    const [codeInput, setCodeInput] = useState('');
    const [outputDetails, setOutputDetails] = useState(null);
    const [processingCode, setProcessingCode] = useState(false);

    useEffect(() => {
        if (!window.localStorage.getItem('dev')) {
            navigate('/');
        }
        document.title = 'Dev Chat+ Code';

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
                // alert('Socket connection failed, try again later.');
                // navigate('/');
            }

            socketRef.current.emit('join', {
                roomId: params.groundId,
                username: currentUser.username,
            });

            socketRef.current.on(
                'joined',
                ({ clients, username, socketId }) => {
                    if (username !== currentUser.username) {
                        console.log(`${username} joined the room.`);
                    }
                    setCoders(clients);
                    setTimeout(() => {
                        socketRef.current.emit('syncCode', {
                            code: codeRef.current,
                            socketId,
                        });
                    }, 1000);
                }
            );

            socketRef.current.on('disconnected', ({ socketId, username }) => {
                console.log(`${username} left the room.`);
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
            socketRef.current?.disconnect();
            socketRef.current?.off('joined');
            socketRef.current?.off('disconnected');
        };
    }, [currentUser]);

    const leaveCodePlayGround = () => {
        window.close();
    };

    const copyRoomURL = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Room URL copied to clipboard.');
    };

    const handleLangChange = (event) => {
        const value = event.target.value;
        setLang(languageOptions.find((option) => option.value === value));
    };

    const handleThemeChange = (event) => {
        const th = event.target.value;

        if (['light', 'vs-dark'].includes(th)) {
            setTheme(th);
        } else {
            defineTheme(th).then(() => setTheme(th));
        }
    };

    const handleCodeInputChange = (event) => {
        setCodeInput(event.target.value);
    };

    const checkStatus = async (token) => {
        try {
            let res = await fetch(
                `${process.env.REACT_APP_RAPID_API_URL}/${token}?base64_encoded=true`,
                {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
                        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                    },
                }
            );
            let response = await res.json();
            let statusId = response.status?.id;
            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token);
                }, 3500);
                return;
            } else {
                setOutputDetails(response);
                setProcessingCode(false);
                console.log('response', response);
                return;
            }
        } catch (err) {
            setProcessingCode(false);
            console.log('err', err);
        }
    };

    const handleCodeSubmission = async () => {
        const sourceCode = codeRef.current;
        const languageId = lang.id;
        console.log(codeInput);
        console.log(sourceCode);
        setProcessingCode(true);

        await fetch(
            `${process.env.REACT_APP_RAPID_API_URL}?base64_encoded=true`,
            {
                method: 'POST',
                headers: {
                    'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
                    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                    'content-type': 'application/json',
                    accept: 'application/json',
                },
                body: JSON.stringify({
                    language_id: languageId,
                    source_code: btoa(sourceCode),
                    stdin: btoa(codeInput),
                }),
            }
        )
            .then(async (response) => {
                const data = await response.json();
                console.log(data);
                checkStatus(data.token);
            })
            .catch((err) => {
                setProcessingCode(false);
                const error = err.response ? err.response.data : err;
                console.error('errpr - ', error);
                // const status = err.response.status;
                // if (status === 429) {
                //     console.log("too many requests", status);
                //     alert('Quota of 12 requests exceeded for the Day! Please switch to a premium plan to increase your quota.');
                // }
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                overflow: 'auto',
            }}
        >
            <Box
                sx={{
                    background: 'linear-gradient(60deg, #0288d1 20%, #1976d2 100%)',
                    p: 2,
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 2,
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Box>
                        <img
                            style={{ height: '50px' }}
                            src='/logo192.png'
                            alt='logo'
                        />
                    </Box>
                    <Typography sx={{ mb: 2, mt: 3 }} variant='h6'>
                        Dev&apos;s Connected
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            // gridTemplateColumns:
                            //     'repeat(auto-fill, minmax(60px, 1fr))',
                            gap: '16px 8px',
                            gridAutoFlow: 'dense',
                            maxHeight: '400px',
                            overflowY: 'auto',
                        }}
                    >
                        {coders.map((coder) => (
                            <Coder
                                key={coder.socketId}
                                username={coder.username}
                            />
                        ))}
                    </Box>
                </Box>
                <Button
                    variant='contained'
                    sx={{ bgcolor: '#25D366', mb: 2, color: 'white' }}
                    color='success'
                    disableElevation
                    endIcon={<ContentCopyIcon />}
                    onClick={copyRoomURL}
                >
                    Copy Room URL
                </Button>
                <Button
                    variant='contained'
                    sx={{ bgcolor: '#25D366', color: 'white', width: '75%' }}
                    color='success'
                    disableElevation
                    endIcon={<LogoutIcon />}
                    onClick={leaveCodePlayGround}
                >
                    Leave
                </Button>
            </Box>
            <Box sx={{ flex: 7 }}>
                <CodeEditor
                    socketRef={socketRef}
                    params={params}
                    onCodeChange={(code) => {
                        codeRef.current = code;
                    }}
                    language={lang}
                    theme={theme}
                />
            </Box>

            {/* Code Side Panel */}
            <Box
                sx={{ p: 2, flex: 3, display: 'flex', flexDirection: 'column' }}
            >
                <EditorDropdown
                    lang={lang}
                    theme={theme}
                    handleLangChange={handleLangChange}
                    handleThemeChange={handleThemeChange}
                />
                <OutputBox outputDetails={outputDetails} />
                <CodeInput
                    codeInput={codeInput}
                    handleCodeInputChange={handleCodeInputChange}
                />
                <Button
                    variant={processingCode ? 'disabled' : 'contained'}
                    sx={{
                        bgcolor: '#25D366',
                        color: 'white',
                        width: 'fit-content',
                        alignSelf: 'end',
                        mt: 2,
                        mb: 3,
                    }}
                    color='success'
                    startIcon={<SettingsIcon />}
                    disableElevation
                    onClick={handleCodeSubmission}
                >
                    {processingCode ? 'Processing...' : 'Compile & Execute'}
                </Button>
                <OutputDetails outputDetails={outputDetails} />
            </Box>

        </Box>
    );
}
