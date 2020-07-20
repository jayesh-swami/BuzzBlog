import { PROFILE_LOADING,PROFILE_NOT_FOUND,GET_PROFILES,GET_USER_PROFILE,CLEAR_CURRENT_PROFILE,GET_ERRORS } from "./types";
import axios from "axios";


// Get Current User Profile
export const getUserProfile = () => dispatch => {

    dispatch(setProfileLoading());

    axios.get('/api/profiles')
    .then(res => dispatch({
        type: GET_USER_PROFILE,
        payload: res.data
    }))
    .catch(err => {
        dispatch({
        type: GET_USER_PROFILE,
        payload: {}
    })})

}

// Profile Loading
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

// Create a user's profile
export const createUserProfile = (newProfile,history) => dispatch => {

    // Posting a new profile
    axios.post('/api/profiles',newProfile)
    .then(res => {
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data
        })
        history.push('/dashboard');
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))

}

// Add a goss experience
export const addGossExperience = (gossExp,history) => dispatch => {

    axios.post('/api/profiles/gossexp',gossExp)
    .then(res => {
        dispatch({
        type: GET_USER_PROFILE,
        payload: res.data
        });
        history.push('/dashboard');
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))

}

// Add a caught goss
export const addCaughtGoss = (caughtgoss, history) => dispatch => {

    axios.post('/api/profiles/caughtgoss', caughtgoss)
        .then(res => {
            dispatch({
                type: GET_USER_PROFILE,
                payload: res.data
            });
            history.push('/dashboard');
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))

}