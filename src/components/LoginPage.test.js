import React from 'react';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from "../store";
import LoginPage from './LoginPage';

describe('LoginPage Component', () => {

    it('should render username field, password field, and submit button', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const usernameInput = screen.getByPlaceholderText('User');
        expect(usernameInput).toBeInTheDocument();

        const passwordInput = screen.getByPlaceholderText('Password');
        expect(passwordInput).toBeInTheDocument();

        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeInTheDocument();
    });
});
