/*
This contains all the Redux Sagas (handler of all sideEffects of Dispatch events)
Usage: Notification and Error Detection
*/
// Importing the types of the services
import { rawServices as services } from "store/feathersClient"
import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'

import { addNotificationMessageParams } from "actions/general"

// Add notification
const handleFulfilled = (serviceType, identifierField, method = "created") => {
    function* handlerFunction(action) {
        const { payload } = action
        // Payload is the dispatch action items
        yield put(addNotificationMessageParams({
            message: `${serviceType} (${payload[identifierField]}) has been successfully ${method}`
        }))
    }
    return handlerFunction
}

const handleRejected = () => {
    function* handlerFunction(action) {
        const { payload } = action
        // Payload is the dispatch action items
        yield put(addNotificationMessageParams({
            message: payload.message
        }))
    }
    return handlerFunction
}

function* feathersSaga() {

    // USERS services
    yield takeEvery(services.users.types.SERVICES_USERS_CREATE_FULFILLED, handleFulfilled("User", "email", "created"));
    yield takeEvery(services.users.types.SERVICES_USERS_CREATE_REJECTED, handleRejected());
    yield takeEvery(services.users.types.SERVICES_USERS_PATCH_FULFILLED, handleFulfilled("User", "email", "updated"));
    yield takeEvery(services.users.types.SERVICES_USERS_PATCH_REJECTED, handleRejected());
    yield takeEvery(services["course-evaluation"].types["SERVICES_COURSE-EVALUATION_CREATE_FULFILLED"], handleFulfilled("Course Evaluation", "courseId", "created"));
    yield takeEvery(services["course-evaluation"].types["SERVICES_COURSE-EVALUATION_CREATE_REJECTED"], handleRejected());
    yield takeEvery(services["course-evaluation"].types["SERVICES_COURSE-EVALUATION_PATCH_FULFILLED"], handleFulfilled("Course Evaluation", "courseId", "updated"));
    yield takeEvery(services["course-evaluation"].types["SERVICES_COURSE-EVALUATION_PATCH_REJECTED"], handleRejected());

}

export default feathersSaga