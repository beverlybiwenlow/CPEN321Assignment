import {
    CREATE_PROFILE_SUCCESS,
    FETCH_PROFILE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    displayName: '',
    userPosts: {}
};

export default (state = INITIAL_STATE , action) => {
    switch(action.type) {
        case FETCH_PROFILE_SUCCESS:
            return {...state, displayName : action.payload};
        default:
            return state;
    }
};
