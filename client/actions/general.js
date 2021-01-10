export const setCurrentRoleSelected = (role) => async (dispatch, getState) => {
    return dispatch({
        type: "CHANGE_CURRENT_ROLE_SELECTED",
        role
    })
}

export const addNotificationMessage = (notification) => async (dispatch, getState) => {
    return dispatch({
        type: "ADD_NOTIFICATION_MESSAGE",
        notification
    })
}


export const removeNotificationMessage = (key) => async (dispatch, getState) => {
    return dispatch({
        type: "REMOVE_NOTIFICATION_MESSAGE",
        key
    })
}
