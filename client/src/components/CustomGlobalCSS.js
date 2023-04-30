import GlobalStyles from '@mui/material/GlobalStyles';

export const customGlobalScrollBars = (mode) => {

    const component = <GlobalStyles styles={{

        '*::-webkit-scrollbar': {
            width: '0.6rem',
        },
        '*::-webkit-scrollbar-track': {
            color: 'transparent',
            border: 'none',
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '0.3rem',
        },
        '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
        },
        ...(mode === 'dark'
            ? {
                '::-webkit-scrollbar-thumb': {
                    border: '2px solid #1a1a1a',
                },

                '*::-webkit-scrollbar-track': {
                    backgroundColor: '#1a1a1a',
                },
            }
            : {
                ...(mode === 'royalblue'
                    ? {
                        '*::-webkit-scrollbar-track': {
                            backgroundColor: '#011831',
                            border: 'none',
                        },
                        '*::-webkit-scrollbar-thumb': {
                            backgroundColor: '#314469',
                            borderRadius: '0.3rem',
                            border: '2px solid #011831',
                        },
                        '*::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#0288d1',
                        },
                    }
                    : {
                        '::-webkit-scrollbar-thumb': {
                            border: '2px solid #f5f5f5',
                        }
                    }
                )
            }),

    }} />;

    return component;
}

export const blinkingKeyboardCursor = () => {

    const component = <GlobalStyles styles={{

        '@keyframes blinking-cursor': {
            '0%': {
                opacity: 1,
            },
            '50%': {
                opacity: 0,
            },
            '100%': {
                opacity: 1,
            },
        },

        '.react-rotating-text-cursor': {
            animation: 'blinking-cursor 0.8s cubic-bezier(0.68, 0.01, 0.01, 0.99) 0s infinite',
        },

    }} />;

    return component;
}

export const smoothScrolling = () => {

    const component = <GlobalStyles styles={{

        'html': {
            scrollBehavior: 'smooth',
        },

    }} />;

    return component;
}

export const markdownHTML = () => {

    const theme = window.localStorage.getItem('devcallTheme');

    const component = <GlobalStyles styles={{

        'p': {
            margin: 0,
        },

        // Dark mode
        'pre': {
            maxWidth: '100%',
            overflowX: 'auto',
            color: theme === 'dark' ? '#f5f5f5' : '#1a1a1a',
            fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
            fontSize: '0.9rem',
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
            padding: '0.2rem 0.4rem',
            borderRadius: '0.3rem',
            border: theme === 'dark' ? '2px solid #f5f5f5' : '2px solid #1a1a1a',
        },

        'code': {
            // Fit the parent
            width: '100%',
        },

        'table': {
            border: '1px solid #ccc',
            borderSpacing: '0',
        },

        'th': {
            border: '1px solid #ccc',
            padding: '0.2rem 0.4rem',
        },

        'td': {
            border: '1px solid #ccc',
            padding: '0.2rem 0.4rem',
        },

        // Blockquote

        'blockquote': {
            borderLeft: '0.3rem solid #ccc',
            margin: '0',
            padding: '0.2rem 0.4rem',
        },

        // All heading are followed by br

        'h1, h2, h3, h4, h5, h6': {
            margin: '0',
            padding: '0',
        },
    }} />;

    return component;
}

