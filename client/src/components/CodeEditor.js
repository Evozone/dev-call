import React, { useEffect } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

export default function CodeEditor() {
    useEffect(() => {
        async function init() {
            Codemirror.fromTextArea(
                document.getElementById('realtimePlayground'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                    lineWrapping: true,
                }
            );
        }
        init();
    }, []);
    return <textarea id='realtimePlayground'></textarea>;
}
