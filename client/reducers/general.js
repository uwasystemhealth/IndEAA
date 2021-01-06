// This will be the general store that is used for non-specific storage of data in the state

const initState = {
    currentRoleSelected: null,
    notification: {
        message: "",
        color: "",
        icon: "",
    }
}



export const generalReducer = (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_CURRENT_ROLE_SELECTED":
            return {
                ...state,
                currentRoleSelected: action.role
            }
        case "CHANGE_NOTIFICATION_MESSAGE":
            return {
                ...state,
                notification: { ...state.notification, ...action.notification },
            }

        default:
            return state
    }
}