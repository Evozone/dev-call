import React, { useState, useEffect } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const ScrollHandler = props => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: props.window ? window() : undefined
    });

    // Initialize the scroll position state variable with a value of 0
    const [scrollPosition, setScrollPosition] = useState(0);

    // Handle the scroll event of the window object
    const handleScroll = () => {
        // Update the scroll position state variable with the current scroll position
        // of the window, mapped from a range of [0, 100vh] to [0.5, 1]
        setScrollPosition((0.8 * window.scrollY) / window.innerHeight);
    };


    // Add the scroll event listener when the component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Remove the scroll event listener when the component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return React.cloneElement(props.children, {
        style: {
            background: trigger ? `linear-gradient(116.82deg, rgba(2, 136, 209, ${scrollPosition}) 0%, rgba(25, 118, 210, ${scrollPosition}) 100%)` : 'transparent',
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
