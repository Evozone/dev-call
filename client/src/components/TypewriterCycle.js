// A component that cycles through a list of strings, typing them out one character at a time.
// Also uses a blinking cursor.

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { blinkingKeyboardCursor } from './CustomGlobalCSS';

export const TypewriterCycle = ({ strings, speed }) => {

    const [index, setIndex] = useState(0);
    const [currentString, setCurrentString] = useState('');
    const [currentChar, setCurrentChar] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => {
            // If we're deleting, remove a character.
            if (isDeleting) {
                setCurrentString(currentString.substring(0, currentString.length - 1));
                // If we're done deleting, turn off the flag and move to the next string.
                if (currentString.length === 0) {
                    setIsDeleting(false);
                    setIndex((index + 1) % strings.length);
                    setCurrentChar(0);
                }
            } else {
                // If we're not deleting, add a character.
                setCurrentString(strings[index].substring(0, currentChar + 1));

                // If we're done adding, turn on the flag and move to the next character.
                if (currentChar === strings[index].length) {
                    setIsDeleting(true);
                }

                // If we're not done adding, move to the next character.
                setCurrentChar(currentChar + 1);
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [currentString, currentChar, isDeleting, index, strings, speed]);

    return (
        <span style={{
            color: '#03256C',
        }}>
            {currentString}
            {blinkingKeyboardCursor()}
            <span className="react-rotating-text-cursor">│</span>
        </span>
    );
};

TypewriterCycle.propTypes = {
    strings: PropTypes.arrayOf(PropTypes.string).isRequired,
    speed: PropTypes.number,
};

TypewriterCycle.defaultProps = {
    speed: 200,
};