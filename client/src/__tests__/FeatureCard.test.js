import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FeatureCard from '../components/FeatureCard';

test('renders correct image and text content', () => {
    const image = '../public/logo192.png';
    const title = 'Some Title';
    const description = 'Some description';
    const { getByAltText, getByText } = render(
        <FeatureCard image={image} title={title} description={description} />
    );

    const imageElement = getByAltText(title);
    expect(imageElement).toHaveAttribute('src', image);
    expect(imageElement).toBeInTheDocument();

    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();

    const descriptionElement = getByText(description);
    expect(descriptionElement).toBeInTheDocument();
});

