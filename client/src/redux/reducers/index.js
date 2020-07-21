import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import titleReducer from './titleReducer';
import gossipReducer from './gossipReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    title: titleReducer,
    gossips: gossipReducer
})