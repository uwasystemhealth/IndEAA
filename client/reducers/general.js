// This will be the general store that is used for non-specific storage of data in the state

const initState = {
    currentRoleSelected:null
}



export const generalReducer = (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_CURRENT_ROLE_SELECTED":
            return {
                ...state,
                currentRoleSelected: action.role
            }
        default:
            return state
    }
}