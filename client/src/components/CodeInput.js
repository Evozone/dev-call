import { TextareaAutosize, Typography } from '@mui/material';
import React from 'react';

function CodeInput({ handleCodeInputChange, codeInput }) {
    return (
        <React.Fragment>
            <Typography size='small' variant='body1'>
                Custom Input{' '}
            </Typography>
            <TextareaAutosize
                aria-label='minimum height'
                minRows={3}
                maxRows={5}
                style={{
                    maxWidth: '100%',
                    width: '100%',
                    borderRadius: '4px',
                    resize: 'none',
                }}
                value={codeInput}
                onChange={handleCodeInputChange}
            />
        </React.Fragment>
    );
}

export default CodeInput;
