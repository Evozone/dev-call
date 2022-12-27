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
                ...(mode === 'teal'
                    ? {
                        '*::-webkit-scrollbar-track': {
                            backgroundColor: '#0288d1',
                            border: 'none',
                        },
                        '*::-webkit-scrollbar-thumb': {
                            backgroundColor: '#03256C',
                            borderRadius: '0.3rem',
                            border: '2px solid #0288d1',
                        },
                        '*::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#001242',
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
