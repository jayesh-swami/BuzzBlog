import { PROFILE_LOADING,PROFILE_NOT_FOUND,GET_PROFILES,GET_USER_PROFILE,CLEAR_CURRENT_PROFILE,GET_ERRORS } from "./types";
import axios from "axios";


// Get Current User Profile
export const getUserProfile = () => dispatch => {

    dispatch(setProfileLoading());

    axios.get('/api/profile')
    .then(res => dispatch({
        type: GET_USER_PROFILE,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: GET_USER_PROFILE,
        payload: {}
    }))

}

//Profile Loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// Clear Profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}
