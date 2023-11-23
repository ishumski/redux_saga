import {USER_POST_FETCH_SUCCEEDED} from "../actions/user_posts_actions";

const initialState = {
    posts: null
}

export const reducer = (state= initialState, action)=>{
    switch (action.type){
        case USER_POST_FETCH_SUCCEEDED: {
            return {
                ...state,
                posts: action.payload.data
            }
        }
        default: {
            return state
        }
    }
}
