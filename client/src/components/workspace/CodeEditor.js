import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function CodeEditor({
    socketRef,
    onCodeChange,
    open,
    lang,
    theme,
}) {
    const editorRef = useRef(null);
    const params = useParams();

    useEffect(() => {
        document.title = 'Dev Chat+ Code';
    }, []);

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
        const savedCode = localStorage.getItem(`${params.workspaceId}-code`);
        if (savedCode && editorRef.current) {
            editorRef.current.setValue(savedCode);
        }
    };

    const handleEditorChange = (value, event) => {
        onCodeChange(value);
        localStorage.setItem(`${params.workspaceId}-code`, value);
        if (!event.isFlush) {
            socketRef.current.emit('codeChange', {
                code: value,
                roomId: params.workspaceId,
            });
        }
    };

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('codeChange', ({ code }) => {
                editorRef.current.setValue(code);
            });
        }
        return () => {
            socketRef?.current.off('codeChange');
        };
    }, [socketRef.current]);

    return (
        <Box
            sx={{
                transition: 'width 0.2s',
                width: open ? 'calc(100vw - 470px)' : '100%',
            }}
        >
            <Editor
                height='99.3vh'
                width='inherit'
                language={lang?.value}
                onMount={handleEditorDidMount}
                theme={theme}
                defaultValue="//Code is saved in your browser's local storage w.r.t the workspace."
                onChange={handleEditorChange}
                options={{
                    selectOnLineNumbers: true,
                    wordWrap: 'on',
                    wordWrapColumn: 40,
                    wrappingIndent: 'indent',
                    minimap: {
                        enabled: false,
                    },
                }}
            />
        </Box>
    );
}
