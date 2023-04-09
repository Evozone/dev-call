import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TypewriterCycle from '../components/landing_page/TypewriterCycle.js';

afterEach(cleanup); // clean up the DOM after each test

it('renders the correct text', () => {
    jest.useFakeTimers(); // mock the timer functions used by the component
    const { getByRole } = render(
        <TypewriterCycle strings={['Hello', 'World']} speed={200} />
    );

    // loop through the characters in the current string
    for (let i = 0; i < 'Hello'.length; i++) {
        act(() => {
            // advance the clock by the speed prop for each character
            jest.advanceTimersByTime(200);
        });
    }
    expect(getByRole('textbox')).toHaveTextContent('Hello');

    for (let i = 0; i < 'Hello'.length + 2; i++) {
        act(() => {
            // advance the clock by the speed prop for each character to delete
            jest.advanceTimersByTime(200);
        });
    }

    // loop through the characters in the current string
    for (let i = 0; i < 'World'.length; i++) {
        act(() => {
            // advance the clock by the speed prop for each character
            jest.advanceTimersByTime(200);
        });
    }
    expect(getByRole('textbox')).toHaveTextContent('World');
});

it('renders the cursor', () => {
    const { getByTestId } = render(
        <TypewriterCycle strings={['Hello', 'World']} />
    );
    expect(getByTestId('cursor')).toBeInTheDocument();
});

it('cycles through the strings', async () => {
    jest.useFakeTimers(); // mock the timer functions used by the component
    const { findByText } = render(
        <TypewriterCycle strings={['Hello', 'World']} speed={50} />
    );
    // wait for the first string to be displayed
    const hello = await findByText('Hello');
    expect(hello).toBeInTheDocument();

    // wait for the second string to be displayed
    const world = await findByText('World');
    expect(world).toBeInTheDocument();
});
