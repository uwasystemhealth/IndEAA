/*
This contains all the Redux Sagas (handler of all sideEffects of Dispatch events)
Usage: Notification and Error Detection
*/
// Importing the types of the services
import { rawServices as services } from "store/feathersClient"
import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'

import { addNotificationMessageParams } from "actions/general"

function* feathersSaga() {``
    yield takeEvery(services.users.types.SERVICES_USERS_CREATE_FULFILLED, function* (action) {
        const { payload } = action
        // Payload is the dispatch action items
        yield put(addNotificationMessageParams({
            message: `User (${payload.email}) has been successfully created`
        }))
    });
    yield takeEvery(services.users.types.SERVICES_USERS_CREATE_REJECTED, function* (action) {
        const { payload } = action
        console.log(payload)
        console.log(action)
        // Payload is the dispatch action items
        yield put(addNotificationMessageParams({
            message: payload.message
        }))
    });
}

export default feathersSaga