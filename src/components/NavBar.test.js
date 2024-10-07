import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import NavBar from './NavBar';

const mockStore = configureMockStore([thunk]);

describe('NavBar Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            authedUser: 'sarahedo',
            users: {
                sarahedo: {
                    id: 'sarahedo',
                    name: 'Sarah Edo',
                    avatarURL: 'https://example.com/sarah-avatar.png',
                },
            },
        });
    });

    it('should display all expected navigation links', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <NavBar />
                </MemoryRouter>
            </Provider>
        );

        const homeLink = screen.getByText('Home');
        const newPollLink = screen.getByText('New Poll');
        const leaderboardLink = screen.getByText('Leaderboard');
        const logoutButton = screen.getByText('Logout');

        expect(homeLink).toBeInTheDocument();
        expect(newPollLink).toBeInTheDocument();
        expect(leaderboardLink).toBeInTheDocument();
        expect(logoutButton).toBeInTheDocument();

        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
        expect(newPollLink.closest('a')).toHaveAttribute('href', '/add');
        expect(leaderboardLink.closest('a')).toHaveAttribute('href', '/leaderboard');
    });
});
