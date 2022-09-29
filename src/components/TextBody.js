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
                <Link
                    // Truncate everything before http
                    // @vishal this is a hack, we can do better [at least opens the correct link]
                    href={message.text.substring(message.text.indexOf('http'))}
                    target='_blank'
                    rel='noopener'
                    // Underline only that which
                    sx={{
                        textDecoration: 'underline',
                        color: 'whitesmoke',
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
                    color: 'rgba(255,255,255,0.6)',
                }}
            >
                {timeAgo}
            </Typography>
        </Box>
    );
}
