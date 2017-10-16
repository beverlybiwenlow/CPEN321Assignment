import {
    FETCH_USER_POST,
    FETCH_USER_POSTS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    clean: true,
    posts: {}
};

export default (state = INITIAL_STATE , action) => {
    switch(action.type) {
        case FETCH_USER_POST:
            return {...state, clean: true};
        case FETCH_USER_POSTS_SUCCESS:
            return {...state, posts: action.payload, clean: false};
        default:
            return state;
    }
}
