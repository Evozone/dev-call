//@bhargav we can add a URL regex for text content
// so if its a URL we can make it a link
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Link, Typography } from '@mui/material';

export default function TextBody({ message }) {
    const currentUser = useSelector((state) => state.auth);
    const [timeAgo, setTimeAgo] = useState('');
    const [isLink, setIsLink] = useState(false);
    const ref = useRef();

    useEffect(() => {
        var offset = new Date().getTimezoneOffset() * 60;
        var result = new Date((message.date.seconds - offset) * 1000)
            .toISOString()
            .substring(11, 16);
        setTimeAgo(result);
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        setIsLink(funcIsLink(message.text));
    }, [message]);

    const funcIsLink = (message) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return message.match(urlRegex);
    };

    return (
        <Box
            ref={ref}
            sx={{
                // @bhargav pls take care of below backgroundColor
                backgroundColor: 'info.main',
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
                }),
            }}
        >
            {isLink ? (
                <Link
                    href={message.text}
                    target='_blank'
                    rel='noopener'
                    sx={{
                        textDecoration: 'underline',
                        color: 'white',
                    }}
                >
                    {message.text}
                </Link>
            ) : (
                <Typography> {message.text} </Typography>
            )}
            <Typography
                sx={{
                    textAlign: 'right',
                    fontSize: '11px',
                    marginBottom: '-5px',
                    marginLeft: '8px',
                    //@bhargav pls take care of below color
                    color: 'whitesmoke',
                }}
            >
                {timeAgo}
            </Typography>
        </Box>
    );
}
