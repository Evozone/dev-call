import { useState } from 'react';
import './App.css';
import PermanentDrawerLeft from './components/Drawer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
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

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <PermanentDrawerLeft themeChange={themeChange} mode={mode} />
        </ThemeProvider>
    );
};

export default App;
