import {
    RESET_FEED,
    FETCH_USER_POSTS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    clean: true,
    posts: {}
};

export default (state = INITIAL_STATE , action) => {
    switch(action.type) {
        case RESET_FEED:
            return INITIAL_STATE;
        case FETCH_USER_POSTS_SUCCESS:
            return {...state, posts: action.payload, clean: false};
        default:
            return state;
    }
}
