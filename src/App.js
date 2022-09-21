import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Home from './components/Home';
import LandingPage from './LandingPage';
import { signInAction } from './actions/actions';
import Loading from './components/Loading';

const App = () => {
    const dispatch = useDispatch();

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

    const isSignedIn = useSelector((state) => state.auth.isSignedIn);

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
        }
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Loading />
            {isSignedIn ? (
                <Home themeChange={themeChange} mode={mode} />
            ) : (
                <LandingPage />
            )}
        </ThemeProvider>
    );
};

export default App;
