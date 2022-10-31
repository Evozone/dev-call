import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Link, Typography } from '@mui/material';

export default function TextBody({ message, inputRef }) {
    const endRef = useRef();

    const currentUser = useSelector((state) => state.auth);
    const [timeAgo, setTimeAgo] = useState('');
    const [isLink, setIsLink] = useState(false);

    const urlRegex =
        /([a-zA-Z0-9]+:\/\/)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\.[A-Za-z]{2,4})(:[0-9]+)?(\/.*)?/;

    const splitUrlRegex =
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

    useEffect(() => {
        var offset = new Date().getTimezoneOffset() * 60;
        var result = new Date((message.date.seconds - offset) * 1000)
            .toISOString()
            .substring(11, 16);
        setTimeAgo(result);
        setIsLink(urlRegex.test(message.text));
    }, [message]);

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: 'smooth' });
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

    return (
        <Box
            ref={endRef}
            sx={{
                borderRadius: '20px',
                borderBottomLeftRadius: '2px',
                maxWidth: '30rem',
                width: 'fit-content',
                p: 1,
                px: 2,
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
            }}
        >
            {isLink ? (
                <Box sx={{ wordBreak: 'break-word' }}>
                    {funcSplitMessage(message.text).map((item, index) => {
                        if (urlRegex.test(item)) {
                            let src = item;
                            if (!item.includes('https://')) {
                                src = 'https://' + item;
                            }
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
                        } else {
                            return <Typography key={index}>{item}</Typography>;
                        }
                    })}
                </Box>
            ) : (
                <Typography sx={{ wordBreak: 'break-word' }}>
                    {message.text}
                </Typography>
            )}
            <Typography
                sx={{
                    textAlign: 'right',
                    fontSize: '11px',
                    marginBottom: '-5px',
                    marginLeft: '8px',
                    color: 'rgba(255,255,255,0.6)',
                }}
            >
                {timeAgo}
            </Typography>
        </Box>
    );
}
