import { feathersClient } from "store/feathersClient"

// Returns a function that has access to dispatch and getState
export const signIn = () => async (dispatch, getState) => {
    try {
        const loginDetails = await feathersClient.reAuthenticate()
        console.log(loginDetails)
        return dispatch({
            type: "SIGNIN_SUCCESS",
            ...loginDetails
        })
    }
    catch (error) {
        // Cant Authenticate
        console.log(error)
        // TODO: Insert Set Login Provider to Null
        return dispatch({
            type: "SIGNIN_ERROR",
            error
        })
    }
}

export const signOut = () => async (dispatch, getState) => {
    await feathersClient.logout()
    return dispatch({
        type: "SIGNOUT_SUCCESS"
    })
}