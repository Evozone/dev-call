import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Loading from '../components/util/Loading';

describe('Loading', () => {
    it('should render a loading spinner when the loading state is true', () => {
        // Create a redux store with a loading state of true
        const store = configureStore({
            reducer: () => ({ loading: { isVisible: true } }),
        });

        // Render the Loading component inside a Provider with the test store
        const { getByTestId } = render(
            <Provider store={store}>
                <Loading />
            </Provider>
        );

        // Expect the loading spinner (CircularProgress) to be present in the DOM
        expect(getByTestId('loading-spinner')).toBeVisible();
    });

    it('should not render a loading spinner when the loading state is false', () => {
        // Create a redux store with a loading state of false
        const store = configureStore({
            reducer: () => ({ loading: { isVisible: false } }),
        });

        // Render the Loading component inside a Provider with the test store
        const { queryByTestId } = render(
            <Provider store={store}>
                <Loading />
            </Provider>
        );

        // Expect the loading spinner (CircularProgress) to not be present in the DOM
        expect(queryByTestId('loading-spinner')).not.toBeVisible();
    });
});
