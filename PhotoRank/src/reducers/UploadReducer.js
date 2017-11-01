import {
    UPDATE_DATABASE_SUCCESS,
    UPLOADING_IMAGE_IN_PROGRESS
} from '../actions/types';

const INITIAL_STATE = {
    uploadSuccess: false,
    url: null
};

export default (state = INITIAL_STATE , action) => {
    switch(action.type) {
        case UPLOADING_IMAGE_IN_PROGRESS:
            return {...state, url: ''}
        case UPDATE_DATABASE_SUCCESS:
            return {...state, uploadSuccess: true, url: action.payload};
        default:
            return state;
    }
};
