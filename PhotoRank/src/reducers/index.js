import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import FeedReducer from './FeedReducer';

export default combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    feed: FeedReducer
});
