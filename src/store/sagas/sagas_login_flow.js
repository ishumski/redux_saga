import {call, put, takeEvery, all, actionChannel, take} from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import {USER_POST_FETCH_FAILED, USER_POST_FETCH_REQUESTED, USER_POST_FETCH_SUCCEEDED} from "../actions/user_posts_actions";
import {getUserPosts} from "../../api/posts";





