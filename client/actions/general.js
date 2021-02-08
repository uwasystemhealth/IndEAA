export const setCurrentRoleSelected = (role) => async (dispatch, getState) => {
    return dispatch({
        type: 'CHANGE_CURRENT_ROLE_SELECTED',
        role
    });
};

// Used for Saga Put (Dispatch version of Sagas)
export const addNotificationMessageParams = (notification) => {
    if (typeof notification.message === 'undefined') {
        throw new Error('Required Parameter Message in Notification');
    }

    // if variant is not specified, determine the most likely variant
    // using REGEX
    if (typeof notification.variant === 'undefined') {
        const { message } = notification;
        if (message.match(/success/i)) {
            notification.variant = 'success';
        }
        else if (message.match(/failed/i)) {
            notification.variant = 'error';
        }
        else if (message.match(/loading/i)) {
            notification.variant = 'info';
        }
    }
    return ({
        type: 'ADD_NOTIFICATION_MESSAGE',
        notification
    });


};


// This will be used if notification message are to be created outside of Redux Saga
export const addNotificationMessage = (notification) => async (dispatch, getState) => {
    return dispatch(addNotificationMessageParams(notification));
};


export const removeNotificationMessage = (key) => async (dispatch, getState) => {
    return dispatch({
        type: 'REMOVE_NOTIFICATION_MESSAGE',
        key
    });
};

export const setPageMiddleTitle = (pageMiddleTitle) => async (dispatch, getState) => {
    return dispatch({
        type: 'SET_PAGE_MIDDLE_TITLE',
        pageMiddleTitle
    });
};
