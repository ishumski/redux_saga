import {useDispatch, useSelector} from "react-redux";
import {USER_POST_FETCH_REQUESTED} from "./store/actions/user_posts_actions";
import {LOGIN_REQUEST, LOGOUT} from "./store/actions/user_login_actions";

const App = () => {
    const dispatch = useDispatch()
    const userPosts = useSelector((state) => state.app)
    const {isLoginPending, error, token} = useSelector((state) => state.user)

    const handleClick = () => {
        dispatch({type: USER_POST_FETCH_REQUESTED, payload: {userId: 1, actionId:1}})
        dispatch({type: USER_POST_FETCH_REQUESTED, payload: {userId: 1, actionId:2}})
        dispatch({type: USER_POST_FETCH_REQUESTED, payload: {userId: 1, actionId:3}})
        dispatch({type: USER_POST_FETCH_REQUESTED, payload: {userId: 1, actionId:4}})
    }

    const handleLoginClick = () => {
        console.log('LOGIN_REQUEST', LOGIN_REQUEST)
        dispatch({
            type: LOGIN_REQUEST,
            payload: {
                username: 'user1',
                password: 'user1password',
            },
        })
    }
    const handleLogoutClick = () => {
        console.log('LOGOUT', LOGOUT)
        dispatch({ type: LOGOUT })
    }


    return (
        <>
            <button type='button' onClick={handleClick}>
                Получить посты пользователя
            </button>
            <div className="app__login-container">
                <button onClick={handleLoginClick}>Log in</button>
                <button onClick={handleLogoutClick}>Logout</button>
                {isLoginPending && <p>Logging in...</p>}
                {error && <p>Error: {error}</p>}
                {token && <p>{token}</p>}
            </div>
        </>
    );
};

export default App;
