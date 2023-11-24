import {combineReducers} from "redux";
import {reducer} from "./reducer";
import {loginFlowReducer} from "./login_reducer";

export const rootReducer = combineReducers({
    app: reducer,
    user: loginFlowReducer
})