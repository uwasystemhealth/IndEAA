import { feathersClient } from 'store/feathersClient';

// Returns a function that has access to dispatch and getState
export const signIn = (isUserUpdate) => async (dispatch, getState) => {
    try {
        // Force Update on User update
        const forceUpdate = isUserUpdate || false;
        const loginDetails = await feathersClient.reAuthenticate(forceUpdate);
        console.log(loginDetails);
        return dispatch({
            type: 'SIGNIN_SUCCESS',
            ...loginDetails
        });
    }
    catch (error) {
        // Cant Authenticate
        // TODO: Insert Set Login Provider to Null
        return dispatch({
            type: 'SIGNIN_ERROR',
            error
        });
    }
};

export const signOut = () => async (dispatch, getState) => {
    await feathersClient.logout();
    return dispatch({
        type: 'SIGNOUT_SUCCESS'
    });
};