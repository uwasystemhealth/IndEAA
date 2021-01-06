export const setCurrentRoleSelected = (role) => async (dispatch,getState)=>{
    return dispatch({
        type:"CHANGE_CURRENT_ROLE_SELECTED",
        role
    })
}