import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({
    socketRef,
    params,
    onCodeChange,
    language,
    theme,
}) {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const handleEditorChange = (value, event) => {
        onCodeChange(value);
        if (!event.isFlush) {
            socketRef.current.emit('codeChange', {
                code: value,
                roomId: params.groundId,
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
        <Editor
            height='100%'
            width={`100%`}
            language={language?.value || 'javascript'}
            onMount={handleEditorDidMount}
            theme={theme}
            // defaultValue='// some comment'
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
    );
}
