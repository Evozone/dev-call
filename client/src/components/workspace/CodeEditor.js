import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function CodeEditor({
    socketRef,
    onCodeChange,
    lang,
    theme,
    checkState,
}) {
    const editorRef = useRef(null);
    const params = useParams();

    useEffect(() => {
        document.title = 'Dev Chat+ Code';
    }, []);

    const handleEditorDidMount = async(editor) => {
        editorRef.current = editor;
        const savedCode = localStorage.getItem(`${params.workspaceId}-code`);
        if (savedCode) {
            editorRef.current.setValue(savedCode);
        }else{
            const code = await getDoc(doc(db, 'workspace', params.workspaceId));
            if (code.exists()) {
                editorRef.current.setValue(code.data().code);
            }
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
                localStorage.setItem(`${params.workspaceId}-code`, code);
            });
        }
        return () => {
            socketRef?.current.off('codeChange');
        };
    }, [socketRef.current]);

    return (
        <Editor
            height='100%'
            width='100%'
            language={lang?.value}
            onMount={handleEditorDidMount}
            theme={theme}
            onChange={handleEditorChange}
            options={{
                selectOnLineNumbers: true,
                wordWrap: checkState.wordWrap ? 'on' : 'off',
                wordWrapColumn: 40,
                wrappingIndent: 'indent',
                minimap: {
                    enabled: checkState.miniMap,
                },
            }}
        />
    );
}
