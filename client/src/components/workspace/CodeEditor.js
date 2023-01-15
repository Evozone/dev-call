import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router-dom';

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

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
        const savedCode = localStorage.getItem(`${params.workspaceId}-code`);
        if (savedCode) {
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
            defaultValue={
                '// Binary Search in C\n\n#include <stdio.h>\n\nint binarySearch(int array[], int x, int low, int high) {\n  // Repeat until the pointers              low and high meet each other\n  while (low <= high) {\n    int mid = low + (high - low) / 2;\n\n    if (array[mid] == x)\n      return mid;\n\n    if (array[mid] < x)\n      low = mid + 1;\n\n    else\n      high = mid - 1;   \n  }\n\n  return -1;\n}\n\nint main(void) {\n  int array[] = {3, 4, 5, 6, 7, 8, 9};\n  int n = sizeof(array) / sizeof(array[0]);\n  int x = 4;\n  int result = binarySearch(array, x, 0, n - 1);\n  if (result == -1)\n    printf("Not found");\n  else\n    printf("Element is found at index %d", result);\n  return 0;\n}'
            }
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
