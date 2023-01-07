import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import SidePanel from './SidePanel';
import Whiteboard from './whiteboard/Whiteboard';
import CodeEditor from './CodeEditor';
import SideStrip from './SideStrip';
import useWorkspaceSocket from '../hooks/useWorkspaceSocket';
import { languageOptions } from '../../utils/languageOptions';
import { customGlobalScrollBars } from '../CustomGlobalCSS';

export default function WorkSpace() {
    const params = useParams();
    const canvasRef = useRef(null);
    const socketRef = useRef();
    const codeRef = useRef(null);

    useEffect(() => {
        if (!window.localStorage.getItem('dev')) {
            window.location.href = '/';
        }
    }, []);

    const currentUser = useSelector((state) => state.auth);
    const coders = useWorkspaceSocket(
        currentUser,
        params,
        socketRef,
        canvasRef,
        codeRef
    );

    const [selected, setSelected] = useState('code');
    const [mainComponent, setMainComponent] = useState('code');
    const [open, setOpen] = useState(false);
    const [lang, setLang] = useState(languageOptions[0]);
    const [theme, setTheme] = useState('vs-dark');
    const [checkState, setCheckState] = useState({
        miniMap: false,
        wordWrap: true,
    });

    const handleSelect = (event, newSelected) => {
        if (newSelected !== null) {
            setSelected(newSelected);
            if (newSelected === 'code') {
                setMainComponent('code');
            } else if (newSelected === 'whiteboard') {
                setMainComponent('whiteboard');
            }
            if (newSelected === 'whiteboard') {
                setOpen(false);
            } else {
                setOpen(true);
            }
        } else {
            if (selected === 'whiteboard') {
                setOpen(false);
            } else {
                toggleSidebar();
            }
        }
    };

    const toggleSidebar = () => {
        setOpen(!open);
    };

    const handleCheckboxChange = (event) => {
        setCheckState({
            ...checkState,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#010101' }}>
            {customGlobalScrollBars('dark')}
            <CssBaseline />
            {/* Placed here because of z-index issues */}
            <SidePanel
                {...{
                    lang,
                    setLang,
                    theme,
                    setTheme,
                    selected,
                    open,
                    codeRef,
                    setOpen,
                    coders,
                    handleCheckboxChange,
                }}
            />
            {/* A side strip which controls the sidebar */}
            <SideStrip {...{ handleSelect, selected }} />
            {mainComponent === 'whiteboard' && (
                <Whiteboard socketRef={socketRef} canvasRef={canvasRef} />
            )}
            {mainComponent === 'code' && (
                <Box
                    component='main'
                    sx={{
                        flexGrow: 1,
                        bgcolor: '#F5F5F522',
                        color: 'white',
                        margin: '5px',
                        borderRadius: '5px',
                        transition: 'margin-left 0.3s ease-in-out',
                        marginLeft: open ? '405px' : '5px',
                    }}
                >
                    <CodeEditor
                        {...{ socketRef, open, lang, theme, checkState }}
                        onCodeChange={(code) => {
                            codeRef.current = code;
                        }}
                    />
                </Box>
            )}
        </Box>
    );
}
