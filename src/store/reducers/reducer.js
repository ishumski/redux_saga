import {SAVE_USER_POSTS, USER_POST_FETCH_SUCCEEDED} from "../actions/user_posts_actions";
import {SAVE_USER_ALBUMS} from "../actions/user_albums_actions";

const initialState = {
    posts: null,
    albums: null
}

export const reducer = (state= initialState, action)=>{
    switch (action.type){
        case USER_POST_FETCH_SUCCEEDED: {
            return {
                ...state,
                posts: action.payload.data
            }
        }
        case SAVE_USER_POSTS: {
            return {
                ...state,
                posts: action.payload.data
            }
        }
        case SAVE_USER_ALBUMS: {
            return {
                ...state,
                albums: action.payload.data
            }
        }
        default: {
            return state
        }
    }
}
