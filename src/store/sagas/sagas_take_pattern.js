import {call, put, takeEvery, takeLatest, takeLeading, take, cancel, fork} from 'redux-saga/effects'
import {getUserPosts} from "../../api/posts";
import {
    USER_POST_FETCH_FAILED,
    USER_POST_FETCH_REQUESTED,
    USER_POST_FETCH_SUCCEEDED
} from "../actions/user_posts_actions";


function* fetchUserPostsWorker(action) {
    try {
        const posts = yield call(getUserPosts, action.payload.userId)
        put({
            type: USER_POST_FETCH_SUCCEEDED,
            payload: {
                data: posts
            }
        })
        console.log('POSTS:', `Request  with ${action.payload.actionId} was executed`)
    } catch (err) {
        yield put({
            type: USER_POST_FETCH_FAILED,
            payload: {
                message: err.message
            }
        })
    }


}

function* userPostsFetchRequestedWatcher() {
    // takeEvery выполнит все таски, которые пришли
    // yield takeEvery(USER_POST_FETCH_REQUESTED, fetchUserPostsWorker)

    // takeLatest выполнит только последнюю таску, которая пришла в списке
    // yield takeLatest(USER_POST_FETCH_REQUESTED, fetchUserPostsWorker)

    // takeLeading выполнит только первую таску, которая пришла в списке
    // yield takeLeading(USER_POST_FETCH_REQUESTED, fetchUserPostsWorker)

    // just take example blocking saga
    // while (true) {
    //     const action = yield take(USER_POST_FETCH_REQUESTED)
    //     yield call(getUserPosts, action)
    // }

    // takeEvery using take/fork(none blocking!!!) only
    // while (true) {
    //   const action = yield take(USER_POST_FETCH_REQUESTED)
    //   yield fork(fetchUserPosts, action)
    // }

    // takeLatest
    let task
    while (true) {
        // console.log("IN_WHILE_LOOP")
      const action = yield take(USER_POST_FETCH_REQUESTED)
      if (task) {
          // console.log("IF_TRUE_CONDITION", task)
        yield cancel(task)
      }
      task = yield fork(fetchUserPostsWorker, action)
        // console.log('TASK', task)
    }

}


export function* takePatternSaga() {
    yield userPostsFetchRequestedWatcher()
}