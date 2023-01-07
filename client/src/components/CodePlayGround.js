// import React, { useEffect, useRef, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import LogoutIcon from '@mui/icons-material/Logout';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import SettingsIcon from '@mui/icons-material/Settings';

// import { customGlobalScrollBars } from './CustomGlobalCSS';
// import Coder from './workspace/Coder';
// import CodeEditor from './workspace/CodeEditor';
// import { Typography } from '@mui/material';
// import { initSocket } from '../socket';
// import EditorDropdown from './workspace/EditorDropdown';
// import { defineTheme } from '../utils/defineTheme';
// import OutputBox from './workspace/OutputBox';
// import CodeInput from './workspace/CodeInput';
// import OutputDetails from './workspace/OutputDetails';
// import { languageOptions } from '../constants/languageOptions';
// import { notifyAction } from '../actions/actions';

// export default function CodePlayGround({ open }) {
//     const params = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const currentUser = useSelector((state) => state.auth);
//     const socketRef = useRef(null);
//     const codeRef = useRef(null);

//     const [coders, setCoders] = useState([]);
//     const [lang, setLang] = useState(languageOptions[0]);
//     const [theme, setTheme] = useState('vs-dark');
//     const [codeInput, setCodeInput] = useState('');
//     const [outputDetails, setOutputDetails] = useState(null);
//     const [processingCode, setProcessingCode] = useState(false);

//     // useEffect(() => {
//     //     if (!window.localStorage.getItem('dev')) {
//     //         navigate('/');
//     //     }
//     //     document.title = 'Dev Chat+ Code';

//     //     const init = async () => {
//     //         socketRef.current = await initSocket();

//     //         socketRef.current.on('connect_error', (error) =>
//     //             handleErrors(error)
//     //         );
//     //         socketRef.current.on('connect_failed', (error) =>
//     //             handleErrors(error)
//     //         );
//     //         function handleErrors(error) {
//     //             // eslint-disable-next-line no-console
//     //             console.log('socket error', error);
//     //             alert(
//     //                 'Socket connection failed, PLease close the tab & try again later.'
//     //             );
//     //             // navigate('/');
//     //         }

//     //         socketRef.current.emit('join', {
//     //             roomId: params.groundId,
//     //             username: currentUser.username,
//     //         });

//     //         socketRef.current.on(
//     //             'joined',
//     //             ({ clients, username, socketId }) => {
//     //                 if (username !== currentUser.username) {
//     //                     dispatch(
//     //                         notifyAction(true, 'success', `${username} joined`)
//     //                     );
//     //                 }
//     //                 setCoders(clients);
//     //                 setTimeout(() => {
//     //                     socketRef.current.emit('syncCode', {
//     //                         code: codeRef.current,
//     //                         socketId,
//     //                     });
//     //                 }, 1000);
//     //             }
//     //         );

//     //         socketRef.current.on('disconnected', ({ socketId, username }) => {
//     //             dispatch(notifyAction(true, 'info', `${username} left.`));
//     //             setCoders((prev) => {
//     //                 return prev.filter(
//     //                     (client) => client.socketId !== socketId
//     //                 );
//     //             });
//     //         });
//     //     };

//     //     if (currentUser.username) {
//     //         init();
//     //     }

//     //     return () => {
//     //         socketRef.current?.disconnect();
//     //         socketRef.current?.off('joined');
//     //         socketRef.current?.off('disconnected');
//     //     };
//     // }, [currentUser]);

//     const leaveCodePlayGround = () => {
//         window.close();
//     };

//     const copyRoomURL = () => {
//         navigator.clipboard.writeText(window.location.href);
//         dispatch(
//             notifyAction(true, 'success', 'Room URL copied to clipboard.')
//         );
//     };

//     const handleLangChange = (event) => {
//         const value = event.target.value;
//         setLang(languageOptions.find((option) => option.value === value));
//     };

//     const handleThemeChange = (event) => {
//         const th = event.target.value;

//         if (['light', 'vs-dark'].includes(th)) {
//             setTheme(th);
//         } else {
//             defineTheme(th).then(() => setTheme(th));
//         }
//     };

//     const handleCodeInputChange = (event) => {
//         setCodeInput(event.target.value);
//     };

//     const checkStatus = async (token) => {
//         try {
//             let res = await fetch(
//                 `${process.env.REACT_APP_RAPID_API_URL}/${token}?base64_encoded=true`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
//                         'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
//                     },
//                 }
//             );
//             let response = await res.json();
//             let statusId = response.status?.id;
//             if (statusId === 1 || statusId === 2) {
//                 setTimeout(() => {
//                     checkStatus(token);
//                 }, 3500);
//                 return;
//             } else {
//                 setOutputDetails(response);
//                 setProcessingCode(false);
//                 return;
//             }
//         } catch (err) {
//             setProcessingCode(false);
//             dispatch(
//                 notifyAction(
//                     true,
//                     'error',
//                     `Server Error: ${err.message || err}`
//                 )
//             );
//         }
//     };

//     const handleCodeSubmission = async () => {
//         const sourceCode = codeRef.current;
//         const languageId = lang.id;
//         setProcessingCode(true);

//         await fetch(
//             `${process.env.REACT_APP_RAPID_API_URL}?base64_encoded=true`,
//             {
//                 method: 'POST',
//                 headers: {
//                     'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
//                     'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
//                     'content-type': 'application/json',
//                     accept: 'application/json',
//                 },
//                 body: JSON.stringify({
//                     language_id: languageId,
//                     source_code: btoa(sourceCode),
//                     stdin: btoa(codeInput),
//                 }),
//             }
//         )
//             .then(async (response) => {
//                 const data = await response.json();
//                 checkStatus(data.token);
//             })
//             .catch((err) => {
//                 setProcessingCode(false);
//                 const error = err.response ? err.response.data : err;
//                 dispatch(
//                     notifyAction(
//                         true,
//                         'error',
//                         `Server Error: ${error.message || error}`
//                     )
//                 );
//                 // const status = err.response.status;
//                 // if (status === 429) {
//                 //     console.log("too many requests", status);
//                 //     alert('Quota of 12 requests exceeded for the Day! Please switch to a premium plan to increase your quota.');
//                 // }
//             });
//     };

//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 flexFlow: 'row wrap',
//                 minHeight: '99vh',
//                 backgroundColor: 'black',
//             }}
//         >
//             {customGlobalScrollBars('dark')}
//             {/* List of Devs */}
//             {/* <Box
//                 sx={{
//                     flex: '2 0 75px',
//                     background:
//                         'linear-gradient(30deg, #1976d2 0%, #2196f3 50%, #1976d2 100%)',
//                     p: 2,
//                     m: 1,
//                     borderRadius: 1,
//                     color: 'white',
//                     display: 'flex',
//                     flexDirection: 'column',
//                 }}
//             >
//                 <Box sx={{ flex: 1 }}>
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             mb: 2,
//                         }}
//                     >
//                         <img
//                             style={{ height: '50px' }}
//                             src='/assets/landing-logo.svg'
//                             alt='logo'
//                         />
//                         <Typography
//                             variant='h6'
//                             sx={{
//                                 ml: 2,
//                                 fontFamily: 'Comfortaa, sans-serif',
//                                 fontWeight: '700',
//                             }}
//                         >
//                             dev chat + code
//                         </Typography>
//                     </Box>
//                     <Typography sx={{ mb: 2, mt: 3 }} variant='h6'>
//                         Dev&apos;s Connected
//                     </Typography>
//                     <Box
//                         sx={{
//                             display: 'grid',
//                             m: 1,
//                             gridTemplateColumns: 'repeat(4, 1fr)',
//                             // gridTemplateColumns:
//                             //     'repeat(auto-fill, minmax(60px, 1fr))',
//                             gap: '16px 8px',
//                             gridAutoFlow: 'dense',
//                             maxHeight: '400px',
//                             overflowY: 'auto',
//                         }}
//                     >
//                         {coders &&
//                             coders.map((coder) => (
//                                 <Coder
//                                     key={coder.socketId}
//                                     username={coder.username}
//                                 />
//                             ))}
//                     </Box>
//                 </Box>

//                 <Button
//                     variant='contained'
//                     sx={{
//                         width: 'fit-content',
//                         m: 1,
//                         bgcolor: '#03256C',
//                         color: '#fff',
//                         '&:hover': {
//                             bgcolor: '#03256C99',
//                         },
//                     }}
//                     disableElevation
//                     endIcon={<ContentCopyIcon />}
//                     onClick={copyRoomURL}
//                 >
//                     Copy Room URL
//                 </Button>
//                 <Button
//                     variant='contained'
//                     sx={{
//                         width: 'fit-content',
//                         m: 1,
//                         bgcolor: '#03256C',
//                         color: '#fff',
//                         '&:hover': {
//                             bgcolor: '#03256C99',
//                         },
//                     }}
//                     disableElevation
//                     endIcon={<LogoutIcon />}
//                     onClick={leaveCodePlayGround}
//                 >
//                     Leave
//                 </Button>
//             </Box> */}
//             {/* Code Editor */}
//             <Box
//                 sx={{
//                     width: open ? 'calc(100vw - 470px)' : '100%',
//                 }}
//             >
//                 <CodeEditor
//                     socketRef={socketRef}
//                     params={params}
//                     onCodeChange={(code) => {
//                         codeRef.current = code;
//                     }}
//                     language={lang}
//                     theme={theme}
//                 />
//             </Box>
//             {/* Code Side Panel */}
//             {/* <Box
//                 sx={{
//                     p: 2,
//                     flex: '2 0 150px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     background: 'black',
//                     color: '#EFF6EE',
//                 }}
//             >
//                 <EditorDropdown
//                     lang={lang}
//                     theme={theme}
//                     handleLangChange={handleLangChange}
//                     handleThemeChange={handleThemeChange}
//                 />
//                 <OutputBox outputDetails={outputDetails} />
//                 <CodeInput
//                     codeInput={codeInput}
//                     handleCodeInputChange={handleCodeInputChange}
//                 />
//                 <Button
//                     variant={processingCode ? 'disabled' : 'contained'}
//                     sx={{
//                         bgcolor: '#25D366',
//                         color: 'white',
//                         width: 'fit-content',
//                         alignSelf: 'end',
//                         mt: 2,
//                         mb: 3,
//                     }}
//                     color='success'
//                     startIcon={<SettingsIcon />}
//                     disableElevation
//                     onClick={handleCodeSubmission}
//                 >
//                     {processingCode ? 'Processing...' : 'Compile & Execute'}
//                 </Button>
//                 <OutputDetails outputDetails={outputDetails} />
//             </Box> */}
//         </Box>
//     );
// }
