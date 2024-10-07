import { _saveQuestion, _saveQuestionAnswer, _getUsers, _getQuestions } from './_DATA';

describe('_saveQuestion', () => {
    it('should return the saved question with all expected fields when valid data is provided', async () => {
        const questionData = {
            optionOneText: 'Option 1 text',
            optionTwoText: 'Option 2 text',
            author: 'mtsamis',
        };

        const result = await _saveQuestion(questionData);

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('author', 'mtsamis');
        expect(result).toHaveProperty('optionOne.text', 'Option 1 text'); // Option 1 text should match
        expect(result).toHaveProperty('optionTwo.text', 'Option 2 text'); // Option 2 text should match

    });

    it('should throw an error if incorrect data is provided', async () => {
        const badQuestionData = {
            optionOneText: '',
            optionTwoText: 'Option 2 text',
            author: 'mtsamis',
        };

        await expect(_saveQuestion(badQuestionData)).rejects.toEqual(
            'Please provide optionOneText, optionTwoText, and author'
        );
    });
});

describe('_saveQuestionAnswer', () => {
    it('should return true and update the users and questions data correctly when valid data is provided', async () => {
        const answerData = {
            authedUser: 'sarahedo',
            qid: 'vthrdm985a262al8qx3do',
            answer: 'optionOne',
        };

        const initialUsers = await _getUsers();
        const initialQuestions = await _getQuestions();

        expect(initialUsers['sarahedo'].answers).not.toHaveProperty('vthrdm985a262al8qx3do');
        expect(initialQuestions['vthrdm985a262al8qx3do'].optionOne.votes).not.toContain('sarahedo');

        const result = await _saveQuestionAnswer(answerData);

        const updatedUsers = await _getUsers();
        const updatedQuestions = await _getQuestions();

        expect(result).toBe(true);

        expect(updatedUsers['sarahedo'].answers).toHaveProperty('vthrdm985a262al8qx3do', 'optionOne');

        expect(updatedQuestions['vthrdm985a262al8qx3do'].optionOne.votes).toContain('sarahedo');
    });

    it('should throw an error if authedUser is missing', async () => {
        const invalidData = {
            authedUser: null,
            qid: 'vthrdm985a262al8qx3do',
            answer: 'optionOne',
        };

        await expect(_saveQuestionAnswer(invalidData)).rejects.toEqual(
            'Please provide authedUser, qid, and answer'
        );
    });

    it('should throw an error if answer is missing', async () => {
        const invalidData = {
            authedUser: 'sarahedo',
            qid: 'vthrdm985a262al8qx3do',
            answer: null,
        };

        await expect(_saveQuestionAnswer(invalidData)).rejects.toEqual(
            'Please provide authedUser, qid, and answer'
        );
    });
});
