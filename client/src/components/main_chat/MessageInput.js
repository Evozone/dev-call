import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';
import { v4 as uuid } from 'uuid';

export default function MessageInput({
    handleSendMessage,
    inputRef,
    mode,
    uploadFile,
}) {
    const [imageModal, setImageModal] = useState(false);
    const [imgLocalURL, setImgLocalURL] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleImageInput = (e) => {
        const file = e?.target.files[0];
        if (file) {
            const fileExt = file?.name.split('.').pop();
            if (fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'png') {
                const fileNewName = uuid() + '.' + fileExt;
                const localUrl = URL.createObjectURL(file);
                setImgLocalURL(localUrl);
                setImageFile(file);
                setImageModal(true);
                setFileName(fileNewName);
                e.target.value = '';
            } else {
                alert('Please upload a valid image file');
            }
        }
    };

    const handleCloseImgModal = () => {
        setImageModal(false);
        setImgLocalURL('');
        setImageFile(null);
        setFileName('');
    };

    const handleSendImage = () => {
        uploadFile(imageFile, fileName);
        handleCloseImgModal();
    };

    const handleKey = (e) => {
        const text = inputRef.current.value;
        e.code === 'Enter' && !e.shiftKey && handleSendMessage(text, false);
    };

    const handleSendMsg = () => {
        const text = inputRef.current.value;
        handleSendMessage(text, false);
    };

    return (
        <Box
            sx={{
                position: 'sticky',
                bottom: '0',
                zIndex: '2',
            }}
        >
            {imageModal && (
                <Modal
                    open={imageModal}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            minWidth: 400,
                            maxWidth: 700,
                            height: 450,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            borderRadius: '10px',
                            p: 2,
                            pb: 1,
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <CancelIcon
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                            }}
                            cursor='pointer'
                            onClick={handleCloseImgModal}
                        />
                        <img
                            style={{
                                objectFit: 'contain',
                                height: '90%',
                                width: '100%',
                                display: 'block',
                            }}
                            alt='loading image...'
                            src={imgLocalURL}
                        />
                        <Divider sx={{ mt: '2px', width: '100%' }} />
                        <IconButton
                            onClick={handleSendImage}
                            sx={{ alignSelf: 'flex-end' }}
                        >
                            <Tooltip title='Send Image'>
                                <SendIcon
                                    sx={{
                                        fontSize: '33px',
                                        color: 'info.main',
                                    }}
                                />
                            </Tooltip>
                        </IconButton>
                    </Box>
                </Modal>
            )}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor:
                        mode === 'work'
                            ? '#00205d'
                            : mode === 'dark'
                                ? '#1a1a1a'
                                : '#f5f5f5',
                    p: 1,
                }}
            >
                <TextField
                    inputRef={inputRef}
                    variant='outlined'
                    sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            backgroundColor:
                                mode === 'dark' || mode === 'work'
                                    ? '#101010'
                                    : 'rgba(0, 0, 0, 0.05)',
                        },
                    }}
                    size='small'
                    multiline
                    maxRows={18}
                    placeholder='Enter to send, Shift + Enter for new line'
                    autoFocus
                    onKeyDown={handleKey}
                />
                <input
                    accept='image/*'
                    id='sendImage'
                    type='file'
                    style={{ display: 'none' }}
                    onChange={handleImageInput}
                />
                <IconButton sx={{ ml: 1, pb: '4px' }}>
                    <label htmlFor='sendImage'>
                        <Tooltip title='Select an Image'>
                            <ImageIcon
                                sx={{
                                    fontSize: '33px',
                                    color: 'info.main',
                                    cursor: 'pointer',
                                }}
                            />
                        </Tooltip>
                    </label>
                </IconButton>

                <IconButton onClick={handleSendMsg} sx={{}}>
                    <Tooltip title='Hit Enter to send'>
                        <SendIcon
                            sx={{
                                fontSize: '33px',
                                color: 'info.main',
                            }}
                        />
                    </Tooltip>
                </IconButton>
            </Box>
        </Box>
    );
}
