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

        'a': {
            color: 'white',
            maxWidth: '100%',
            wordBreak: 'break-word',
        },

        'a:hover': {
            color: 'lightblue',
        },

        'p': {
            margin: 0,
            maxWidth: '100%',
        },

        'pre': {
            margin: '0',
            padding: '0',
            fontSize: '0.8rem',
        },

        'table': {
            border: '1px solid #ccc',
            borderSpacing: '0',
            backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#000000',
            borderRadius: '10px',
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

