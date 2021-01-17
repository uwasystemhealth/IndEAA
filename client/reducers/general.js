// This will be the general store that is used for non-specific storage of data in the state

const initState = {
    currentRoleSelected: null,
    notifications: []
    /*
    Notification is of type [{
        key
        message: "",
        variant: "", possible values ["success","error","warning","info"]
    }]
    */
}



export const generalReducer = (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_CURRENT_ROLE_SELECTED":
            return {
                ...state,
                currentRoleSelected: action.role
            }
        case "ADD_NOTIFICATION_MESSAGE":
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: uuidv4(),
                        ...action.notification
                    }
                ]
            }
        case "REMOVE_NOTIFICATION_MESSAGE":
            return {
                ...state,
                notifications: [
                    ...state.notifications.filter(({ key }) => key != action.key)
                ]
            }
        default:
            return state
    }
}

// Generate Unique ID
// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}