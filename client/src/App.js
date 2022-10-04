import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { signInAction } from './actions/actions';
import Home from './components/Home';
import LandingPage from './LandingPage';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import VideoCall from './components/VideoCall';
import CodePlayGround from './components/CodePlayGround';
import './App.css';

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const localTheme = window.localStorage.getItem('devcallTheme');

    const [mode, setMode] = useState(localTheme ? localTheme : 'light');

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

    const themeChange = () => {
        const updatedTheme = mode === 'light' ? 'dark' : 'light';
        window.localStorage.setItem('devcallTheme', updatedTheme);
        setMode(updatedTheme);
    };

    useEffect(() => {
        const auth = window.localStorage.getItem('dev');
        if (auth) {
            const { dnd } = JSON.parse(auth);
            const {
                sub: uid,
                email,
                name,
                picture: photoURL,
                iat: signInTime,
            } = jwtDecode(dnd);
            dispatch(signInAction(uid, email, name, photoURL, dnd, signInTime));
            if (window.location.pathname == '/') {
                navigate('/chat');
            }
        }
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Loading />
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route
                    path='/chat'
                    element={
                        <ProtectedRoute>
                            <Home themeChange={themeChange} mode={mode} />
                        </ProtectedRoute>
                    }
                />
                <Route path='/meet/:roomId' element={<VideoCall />} />
                <Route path='/code/:groundId' element={<CodePlayGround />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
