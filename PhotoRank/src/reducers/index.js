import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import FeedReducer from './FeedReducer';
import UploadReducer from './UploadReducer';

export default combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    feed: FeedReducer,
    upload: UploadReducer
});
