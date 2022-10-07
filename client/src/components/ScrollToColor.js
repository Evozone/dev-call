import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const ScrollHandler = props => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: props.window ? window() : undefined
    });

    return React.cloneElement(props.children, {
        style: {
            background: trigger ? 'linear-gradient(116.82deg, #29b6f6 20%, #0288d1 100%)' : 'transparent',
            color: trigger ? 'white' : 'black',
            transition: 'background 0.5s ease-in-out',
            boxShadow: trigger ? '0 0 10px 0 rgba(0,0,0,0.5)' : 'none',
            padding: '10px 0px'
        }
    });
};

const ScrollToColor = props => {
    return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

export default ScrollToColor;
