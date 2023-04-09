import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';

export default function TextBody({ message, inputRef, sendername }) {
    const endRef = useRef();

    const currentUser = useSelector((state) => state.auth);
    const [messageTime, setMessageTime] = useState('');
    const [isLink, setIsLink] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const [imageURL, setImageURL] = useState('');

    const urlRegex =
        /([a-zA-Z0-9]+:\/\/)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\.[A-Za-z]{2,4})(:[0-9]+)?(\/.*)?/;

    const splitUrlRegex =
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

    const imageRegex =
        /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg|.gif)(\?[^\s[",><]*)?/gi;

    useEffect(() => {
        const offset = new Date().getTimezoneOffset() * 60;
        const time = new Date((message.date.seconds - offset) * 1000)
            .toISOString()
            .substring(11, 16);

        setMessageTime(time);
        setIsImage(imageRegex.test(message.text));
        setIsLink(urlRegex.test(message.text));
        setTimeout(() => {
            endRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }, [message]);

    useEffect(() => {
        inputRef.current.focus();
    });

    const funcSplitMessage = (message) => {
        let splitMessage = message.split(splitUrlRegex);

        if (splitMessage.length === 1) {
            splitMessage = message.split(urlRegex);
        }

        splitMessage = splitMessage.filter((item) => {
            return (
                item !== '' &&
                item !== undefined &&
                item !== 'https' &&
                item !== 'http'
            );
        });
        return splitMessage;
    };

    const handleImgModal = (e) => {
        const src = e.target.src;
        if (imageModal) {
            setImageModal(false);
            setImageURL('');
        } else {
            setImageModal(true);
            setImageURL(src);
        }
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    borderRadius: '20px',
                    borderBottomLeftRadius: '2px',
                    maxWidth: '30rem',
                    width: 'fit-content',
                    p: '12px',
                    color: 'white',
                    mb: 1,
                    display: 'flex',
                    alignItems: 'end',
                    ...(currentUser.uid === message.senderid
                        ? {
                              alignSelf: 'flex-end',
                              borderBottomLeftRadius: '20px',
                              borderBottomRightRadius: '1px',
                              backgroundColor: '#25D366',
                          }
                        : { backgroundColor: '#34B7F1' }),
                    ...(isImage
                        ? {
                              flexDirection: 'column',
                          }
                        : {
                              flexDirection: 'row',
                          }),
                    ...(sendername && { display: 'block' }),
                }}
            >
                {imageModal && (
                    <Modal
                        open={imageModal}
                        onClose={handleImgModal}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 950,
                                height: 650,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                borderRadius: '10px',
                                p: 4,
                                border: 'none',
                                display: 'flex',
                                justifyContent: 'center',
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
                                onClick={handleImgModal}
                            />
                            <img
                                style={{
                                    objectFit: 'contain',
                                    height: '100%',
                                    display: 'block',
                                }}
                                alt='loading image...'
                                src={imageURL}
                            />
                            <a
                                style={{ color: '#34B7F1' }}
                                href={imageURL}
                                target='_blank'
                                rel='noreferrer'
                            >
                                Open Original
                            </a>
                        </Box>
                    </Modal>
                )}
                {sendername && (
                    <Typography
                        sx={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: 'white',
                            mr: '5px',
                        }}
                    >
                        {message.senderUsername}
                    </Typography>
                )}
                {isLink ? (
                    <Box sx={{ wordBreak: 'break-word' }}>
                        {funcSplitMessage(message.text).map((item, index) => {
                            if (urlRegex.test(item)) {
                                let src = item;
                                if (!item.includes('https://')) {
                                    src = 'https://' + item;
                                }
                                if (isImage) {
                                    return (
                                        <img
                                            onClick={handleImgModal}
                                            key={index}
                                            src={src}
                                            alt={src}
                                            loading='lazy'
                                            style={{
                                                width: '100%',
                                                minWidth: '100px',
                                                maxHeight: '250px',
                                                borderRadius: '10px',
                                                objectFit: 'contain',
                                                cursor: 'pointer',
                                                minHeight: '50px',
                                            }}
                                        />
                                    );
                                } else {
                                    return (
                                        <Link
                                            key={index}
                                            href={src}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            sx={{
                                                color: 'white',
                                                textDecoration: 'underline',
                                                '&:hover': {
                                                    color: 'lightblue',
                                                },
                                            }}
                                        >
                                            {item}
                                        </Link>
                                    );
                                }
                            } else {
                                return (
                                    <Typography key={index}>{item}</Typography>
                                );
                            }
                        })}
                    </Box>
                ) : (
                    <Typography sx={{ wordBreak: 'break-word' }}>
                        {message.text}
                    </Typography>
                )}
                <Typography
                    ref={endRef}
                    sx={{
                        textAlign: 'right',
                        fontSize: '11px',
                        ml: '4px',
                        mb: '-5px',
                        alignSelf: 'flex-end',
                        color: 'rgba(255,255,255,0.6)',
                    }}
                >
                    {messageTime}
                </Typography>
            </Box>
        </React.Fragment>
    );
}
