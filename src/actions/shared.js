import { getInitialData } from "../utils/api";
import { receiveUsers } from './users';
import {addAnswerQuestion, receiveQuestions} from './questions';
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
