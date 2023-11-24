import {call, put, fork,cancel,cancelled, take} from 'redux-saga/effects'
import {LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, STOP_LOGIN_PENDING} from "../actions/user_login_actions";
import {clearToken, login, saveToken} from "../../api/user";

function* authorizeWorker(username, password) {
    console.log('authorizeWorker', {username, password})
    try {
        const token = yield call(login, username, password)
        console.log('TOKEN_WORKER', token)
        yield put({
            type: LOGIN_SUCCESS,
            payload: {
                token
            }
        })
        yield call(saveToken, token)
    } catch (err) {
        console.log('ERRORIO', err.message)
        yield put({
            type: LOGIN_ERROR,
            payload: {
                error: err.message
            }
        })
    } finally {
        if(yield cancelled()){
            put({
                type: STOP_LOGIN_PENDING
            })
        }
    }
}


export function* loginFlowSagaWatcher() {
    while (true) {
        const {payload} = yield take(LOGIN_REQUEST)
        console.log('payloadWatcher', payload)
        const task = yield fork(authorizeWorker, payload.username, payload.password)

        const {type} = yield take([LOGOUT, LOGIN_ERROR])

        console.log('action', type)

        if (type === LOGOUT || type === LOGIN_ERROR) {
            yield cancel(task)
        }
        yield call(clearToken)
    }
}




