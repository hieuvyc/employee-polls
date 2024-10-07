import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import LeaderboardPage from './LeaderboardPage';

const mockStore = configureMockStore([thunk]);

describe('LeaderboardPage Component', () => {
    let store;

    beforeEach(() => {

        store = mockStore({
            users: {
                sarahedo: {
                    id: 'sarahedo',
                    name: 'Sarah Edo',
                    avatarURL: 'https://example.com/sarah-avatar.png',
                    answers: {
                        question1: 'optionOne',
                        question2: 'optionTwo',
                    },
                    questions: ['question1', 'question2'],
                },
                tylermcginnis: {
                    id: 'tylermcginnis',
                    name: 'Tyler McGinnis',
                    avatarURL: 'https://example.com/tyler-avatar.png',
                    answers: {
                        question3: 'optionOne',
                    },
                    questions: ['question3'],
                },
            },
        });
    });

    it('should display the correct username, number of questions asked, and number of questions answered', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LeaderboardPage />
                </MemoryRouter>
            </Provider>
        );

        const sarahName = screen.getByText('Sarah Edo');
        const sarahAnswered = screen.getByText('Answered: 2');
        const sarahCreated = screen.getByText('Created: 2');

        expect(sarahName).toBeInTheDocument();
        expect(sarahAnswered).toBeInTheDocument();
        expect(sarahCreated).toBeInTheDocument();

        const tylerName = screen.getByText('Tyler McGinnis');
        const tylerAnswered = screen.getByText('Answered: 1');
        const tylerCreated = screen.getByText('Created: 1');

        expect(tylerName).toBeInTheDocument();
        expect(tylerAnswered).toBeInTheDocument();
        expect(tylerCreated).toBeInTheDocument();
    });
});
