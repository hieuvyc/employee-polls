import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import PollCreationPage from '../components/PollCreationPage';

const mockStore = configureMockStore([thunk]);

describe('PollCreationPage Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            authedUser: 'sarahedo',
        });
    });

    it('should render the poll creation form with two inputs and a submit button', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PollCreationPage />
                </MemoryRouter>
            </Provider>
        );

        const optionOneInput = screen.getByPlaceholderText('Option One');
        const optionTwoInput = screen.getByPlaceholderText('Option Two');
        const submitButton = screen.getByText('Submit');

        expect(optionOneInput).toBeInTheDocument();
        expect(optionTwoInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('should disable the submit button if the options are empty', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PollCreationPage />
                </MemoryRouter>
            </Provider>
        );

        const submitButton = screen.getByText('Submit');
        expect(submitButton).toBeDisabled();
    });

    it('should enable the submit button when both options are filled', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PollCreationPage />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Option One'), {
            target: { value: 'Option 1' },
        });
        fireEvent.change(screen.getByPlaceholderText('Option Two'), {
            target: { value: 'Option 2' },
        });

        const submitButton = screen.getByText('Submit');
        expect(submitButton).toBeEnabled();
    });

});
