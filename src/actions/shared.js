import {getInitialData, saveQuestion} from "../utils/api";
import {addQuestionToUser, receiveUsers} from './users';
import {addAnswerQuestion, addQuestion, receiveQuestions} from './questions';
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveQuestionAnswer } from '../utils/api';
import { addAnswerUser } from "./users";


export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(hideLoading());
            });
    };
}

export function handleSaveAnswer(questionId, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        return saveQuestionAnswer(authedUser, questionId, answer)
            .then(() => {
                dispatch(addAnswerQuestion(authedUser, questionId, answer));
                dispatch(addAnswerUser(authedUser, questionId, answer));
            })
            .catch((error) => {
                console.warn('Error in handleSaveAnswer:', error);
                alert('There was an error saving your answer. Please try again.');
            });
    };
}

export function handleSaveQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestion(optionOneText, optionTwoText, authedUser)
            .then((formattedQuestion) => {
                dispatch(addQuestion(formattedQuestion));
                dispatch(addQuestionToUser(formattedQuestion));
            })
            .then(() => dispatch(hideLoading()))
            .catch((error) => {
                console.error('Error saving question:', error);
                alert('There was an error saving the question. Please try again.');
                dispatch(hideLoading());
            });
    };
}
