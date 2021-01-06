export const setCurrentRoleSelected = (role) => async (dispatch, getState) => {
    return dispatch({
        type: "CHANGE_CURRENT_ROLE_SELECTED",
        role
    })
}

export const setNotificationMessage = (notification) => async (dispatch, getState) => {
    return dispatch({
        type: "CHANGE_NOTIFICATION",
        notification
    })
}

export const resetNotificationMessage = () => setNotificationMessage({
    message: "",
    color: "",
    icon: "",
})