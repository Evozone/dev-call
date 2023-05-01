import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CssBaseline from '@mui/material/CssBaseline';
import Tooltip from '@mui/material/Tooltip';
import { doc, updateDoc, setDoc } from 'firebase/firestore';

import SidePanel from './SidePanel';
import Whiteboard from './whiteboard/Whiteboard';
import CodeEditor from './CodeEditor';
import SideStrip from './SideStrip';
import useWorkspaceSocket from '../../hooks/useWorkspaceSocket';
import { languageOptions } from '../../utils/languageOptions';
import { customGlobalScrollBars } from '../CustomGlobalCSS';
import { db } from '../../firebaseConfig';
import {
    notifyAction,
    startLoadingAction,
    stopLoadingAction,
} from '../../actions/actions';

export default function WorkSpace() {
    const params = useParams();
    const canvasRef = useRef(null);
    const socketRef = useRef();
    const codeRef = useRef(null);
    const dispatch = useDispatch();

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
    const [messages, setMessages] = useState(null);

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

    const uploadDataToCloud = async () => {
        try {
            dispatch(startLoadingAction());
            const canvasData = localStorage.getItem(
                `${params.workspaceId}-drawing`
            );
            const code = localStorage.getItem(`${params.workspaceId}-code`);
            const data = {
                code,
                canvasData,
            };
            const dbRef = doc(db, 'workspace', params.workspaceId);
            await updateDoc(dbRef, data);
        } catch (error) {
            dispatch(
                notifyAction(true, 'error', 'Error uploading data to cloud')
            );
        } finally {
            dispatch(stopLoadingAction());
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'flex-end',
                bgcolor: '#010101',
            }}
        >
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
                    params,
                    messages,
                    setMessages,
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
                        transition: 'width 0.2s',
                        width: open ? 'calc(100vw - 460px)' : '100%',
                    }}
                >
                    <CodeEditor
                        {...{ socketRef, lang, theme, checkState }}
                        onCodeChange={(code) => {
                            codeRef.current = code;
                        }}
                    />
                </Box>
            )}
            <Tooltip title='Backup workspace data to cloud' placement='top'>
                <Fab
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        backgroundColor: '#03256C',
                        color: 'white',

                        '&:hover': {
                            backgroundColor: '#2196f3',
                        },
                    }}
                    onClick={uploadDataToCloud}
                >
                    <CloudUploadIcon />
                </Fab>
            </Tooltip>
        </Box>
    );
}
