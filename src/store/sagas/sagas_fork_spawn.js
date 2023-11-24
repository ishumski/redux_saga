import {call, fork, put, spawn} from 'redux-saga/effects'
import {getUserAlbums} from "../../api/albums";
import {getUserPosts} from "../../api/posts";
import {SAVE_USER_ALBUMS} from "../actions/user_albums_actions";
import {SAVE_USER_POSTS} from "../actions/user_posts_actions";

function* fetchAlbums(userId){
 const data = yield call(getUserAlbums, userId)
    yield put({
        type: SAVE_USER_ALBUMS,
        payload:{
            data
        }
    })
}

function* fetchPosts(userId){
    const data =  yield call(getUserPosts, userId)

    yield put({
        type: SAVE_USER_POSTS,
        payload:{
            data
        }
    })
}



function* forkSpawnSagaWorker(userId){
    yield spawn(fetchAlbums, userId)
    yield fork(fetchPosts, userId)
    // yield fork(fetchAlbums, userId)
    // yield fork(fetchPosts, userId)
    console.log('DONE')
}

export function* forkSpawnSagaWatcher(){
    const userId = 1
    yield call(forkSpawnSagaWorker, userId)
}