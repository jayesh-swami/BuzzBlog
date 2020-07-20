import { SET_TITLE } from './types';

// Set title
export const setTitle = (title) => {
    return{
        type: SET_TITLE,
        payload: title
    }
}