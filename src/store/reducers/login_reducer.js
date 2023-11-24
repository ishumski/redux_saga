import {LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, STOP_LOGIN_PENDING} from "../actions/user_login_actions";


const initialState = {
    error: null,
    token: null,
    isLoginPending: false,
}

export const loginFlowReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_REQUEST: {
            return {
                ...state,
                // посмотреть по поводу ерорки нужно ли тут это поле
                error: null,
                isLoginPending: true,
            }
        }
        case LOGIN_SUCCESS: {
            console.log('LOGIN_SUCCESS', action)
            return {
                ...state,
                token: action.payload.token,
                isLoginPending: false,
            }
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                error: action.payload.error,
                isLoginPending: false,
            }
        }
        case STOP_LOGIN_PENDING: {
            return {
                ...state,
                isLoginPending: false,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                error: null,
                token: null,
                isLoginPending: false,
            }
        }
        default:
            return state
    }
}