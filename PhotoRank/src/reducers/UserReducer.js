import {
    CREATE_PROFILE_SUCCESS,
    FETCH_PROFILE_SUCCESS,
    DISPLAY_NAME_CHANGED,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_BUTTON_REVERT
} from '../actions/types';

const INITIAL_STATE = {
    displayName: '',
    updateButtonText: 'Save Changes',
    userPosts: {}
};

export default (state = INITIAL_STATE , action) => {
    switch(action.type) {
        case FETCH_PROFILE_SUCCESS:
            return {...state, displayName : action.payload};
        case DISPLAY_NAME_CHANGED:
            return {...state, displayName: action.payload};
        case UPDATE_PROFILE_SUCCESS:
            return {...state, updateButtonText: 'Profile Updated!'}
        case UPDATE_BUTTON_REVERT:
            return {...state, updateButtonText: 'Save Changes'}
        default:
            return state;
    }
};
