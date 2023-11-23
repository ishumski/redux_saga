import {useDispatch, useSelector} from "react-redux";
import {USER_POST_FETCH_REQUESTED} from "./store/actions/user_posts_actions";

const App = () => {
    const dispatch = useDispatch()
    const userPosts = useSelector((state)=>state.app)

    const handleClick = () => {
        dispatch({type: USER_POST_FETCH_REQUESTED, payload: {userId: 1,}})
        dispatch({type: USER_POST_FETCH_REQUESTED, payload: {userId: 1,}})
        dispatch({type: USER_POST_FETCH_REQUESTED, payload: {userId: 1,}})
        dispatch({type: USER_POST_FETCH_REQUESTED, payload: {userId: 1,}})
    }


    return (
        <button type='button' onClick={handleClick}>
            Получить посты пользователя
        </button>
    );
};

export default App;
