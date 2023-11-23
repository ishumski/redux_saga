import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./store/reducers/rootReducer";
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from "./store/sagas/sagas_main";
import {userPostFetchRequestedWatcherSaga} from "./store/sagas/sagas_with_action_channel";


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

//SAGAS RUN
// sagaMiddleware.run(rootSaga)
sagaMiddleware.run(userPostFetchRequestedWatcherSaga)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
