import { SET_USER_DATA } from '../actions/types';
import isEmpty from '../../utils/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state=initialState, action) {
    
    switch(action.type){
        case SET_USER_DATA:
            return {...state, isAuthenticated: !isEmpty(action.payload), user: action.payload }
        default:
            return state;
    }

}