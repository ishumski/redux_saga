import {call, put, takeEvery, all} from 'redux-saga/effects'
import {USER_POST_FETCH_FAILED, USER_POST_FETCH_REQUESTED, USER_POST_FETCH_SUCCEEDED} from "../actions/user_posts_actions";
import {getUserPosts} from "../../api/posts";

function* fetchUserPosts(action) {
    try {
        const userPosts = yield call(getUserPosts, action.payload.userId)
        console.log('GET_USER_POSTS', userPosts)
        yield put({
            type: USER_POST_FETCH_SUCCEEDED,
            payload: {
                data: userPosts,
            },
        })
    } catch (e) {
        yield put({
            type: USER_POST_FETCH_FAILED,
            payload: {
                message: e.message
            }
        })
    }
}

function* userPostFetchRequestedWatcherSaga() {
    yield takeEvery(USER_POST_FETCH_REQUESTED, fetchUserPosts)
}

function* someSaga() {
    console.log('SOME_SAGA')
}

export function* rootSaga() {
    yield all([
        userPostFetchRequestedWatcherSaga(),
        someSaga()
    ])
}

