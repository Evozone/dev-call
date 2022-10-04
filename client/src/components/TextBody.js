import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Link, Typography } from '@mui/material';

export default function TextBody({ message }) {
    const currentUser = useSelector((state) => state.auth);
    const [timeAgo, setTimeAgo] = useState('');
    const [isLink, setIsLink] = useState(false);
    const ref = useRef();
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;

    useEffect(() => {
        var offset = new Date().getTimezoneOffset() * 60;
        var result = new Date((message.date.seconds - offset) * 1000)
            .toISOString()
            .substring(11, 16);
        setTimeAgo(result);
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        setIsLink(funcIsLink(message.text));
    }, [message]);

    // If the message contains a URL, return true
    const funcIsLink = (message) => {
        return urlRegex.test(message);
    };

    // Separate the message into an array of strings and URLs
    const funcSplitMessage = (message) => {
        var splitMessage = message.split(urlRegex);
        // Remove all instances of empty strings, undefined, and 'https'
        splitMessage = splitMessage.filter((item) => {
            return item !== '' && item !== undefined && item !== 'https';
        });

        return splitMessage;
    };

    return (
        <Box
            ref={ref}
            sx={{
                backgroundColor: '#34B7F1',
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
                ...(currentUser.uid === message.senderid && {
                    alignSelf: 'flex-end',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '1px',
                    backgroundColor: '#25D366',
                }),
            }}
        >
            {isLink ? (
                <Box sx={{ wordBreak: 'break-word' }}>
                    {/* @vishal I've kept it here because I want the components <Link> and <Typography>
                    to stay within the <Box>, in one place */}
                    {funcSplitMessage(message.text).map((item, index) => {
                        if (urlRegex.test(item)) {
                            return (
                                <Link
                                    key={index}
                                    href={item}
                                    target="_blank"
                                    rel="noopener noreferrer"
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
                <Typography> {message.text} </Typography>
            )}
            {/* Timestamp */}
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
