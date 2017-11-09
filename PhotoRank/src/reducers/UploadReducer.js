import {
    UPDATE_DATABASE_SUCCESS,
    UPLOADING_IMAGE_IN_PROGRESS,
    SELECT_IMAGE_SUCCESS,
    CAPTION_CHANGED,
    TAG_CHANGED,
    LOCATION_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    location: '',
    caption: '',
    tags: '',
    selectedImage: false,
    uploadSuccess: false,
    url: null
};

export default (state = INITIAL_STATE , action) => {
    switch(action.type) {
        case UPLOADING_IMAGE_IN_PROGRESS:
            return {...state, url: ''}
        case SELECT_IMAGE_SUCCESS:
            return {...state, selectedImage: true, url: action.payload}
        case UPDATE_DATABASE_SUCCESS:
            return INITIAL_STATE;
        case CAPTION_CHANGED:
            return {...state, caption: action.payload }
        case TAG_CHANGED:
            return {...state, tags: action.payload }
        case LOCATION_CHANGED:
            return {...state, location: action.payload }
        default:
            return state;
    }
};
