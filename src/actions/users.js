export const RECEIVE_USERS = 'RECEIVE_USERS';

// Action creator to receive users
export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    };
}
