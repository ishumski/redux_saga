import {call, put, takeEvery, all, actionChannel, take} from 'redux-saga/effects'
import { buffers } from 'redux-saga'
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


// ACTION с каналами позволяет делать последовательные запросы
// закончился первый, начался следующий
export function* userPostFetchRequestedWatcherSaga() {
    //action channel
    const requestChannel = yield actionChannel(
        USER_POST_FETCH_REQUESTED,
        buffers.sliding(1)
    )
    while (true){
        const action = yield take(requestChannel)
        console.log('action', action)
        yield call(fetchUserPosts, action)
    }
}


