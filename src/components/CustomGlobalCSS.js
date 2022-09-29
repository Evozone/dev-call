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
                }
            }
            : {
                '::-webkit-scrollbar-thumb': {
                    border: '2px solid #f5f5f5',
                },
            }),
    }} />

    return component;
}