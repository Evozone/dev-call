import React from 'react'

// MUI components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


export default function NoChatTemplate({ mode }) {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          mode === 'dark' ? '#1f1f1f' : 'whitesmoke',
      }}
    >
      <img
        src={
          mode === 'dark'
            ? '/assets/welcome-screen-dark.svg'
            : '/assets/welcome-screen.svg'
        }
        alt='chat'
        style={{ width: '400px', height: '400px' }}
      />
      <Typography
        sx={{
          color: mode === 'dark' ? '#0288d1' : '#1976d2',
          fontFamily: 'Comfortaa',
          fontWeight: '700',
          fontSize: '2rem',
        }}
      >
        welcome to dev chat +
      </Typography>
    </Box>
  )
}
