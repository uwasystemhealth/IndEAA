const initState = {
    user: null,
    error: null
};

// When populated, user     object will have the same fields as the mongoose type
/*
_id, createdAt, email, googleId, name, picture
*/

export const authenticateReducer = (state = initState, action) => {
    switch (action.type) {
    case 'SIGNIN_SUCCESS':
        return {
            ...state,
            user: action.user
        };
    case 'SIGNIN_ERROR':
        return {
            ...state,
            error: action.error
        };
    case 'SIGNOUT_SUCCESS':
        return initState;
    default:
        return state;
    }
};