import { getInitialData } from "../utils/api";
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { showLoading, hideLoading } from "react-redux-loading-bar";

// This action creator fetches the initial data (users and questions)
export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        // Fetch users and questions in parallel
        return getInitialData()
            .then(({users, questions}) => {
                // Dispatch actions to store users and questions in the Redux store
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(hideLoading());
            });
    };
}
