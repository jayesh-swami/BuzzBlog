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

// Delete a goss Exp
export const deleteGossExp = (gossExpID, history) => dispatch => {

    axios.delete(`/api/profiles/gossexp/${gossExpID}`)
        .then(res => {
            dispatch({
                type: GET_USER_PROFILE,
                payload: res.data
            });
            history.push('/dashboard');
        })
        .catch(err => console.log(err));

}

// Delete a caught goss
export const deleteCaughtGoss = (caughtGossID, history) => dispatch => {

    axios.delete(`/api/profiles/caughtgoss/${caughtGossID}`)
        .then(res => {
            dispatch({
                type: GET_USER_PROFILE,
                payload: res.data
            });
            history.push('/dashboard');
        })
        .catch(err => console.log(err));

}

// Get all profiles and their details
export const getAllProfiles = () => dispatch => {

    dispatch(setProfileLoading());

    axios.get('/api/profiles/all')
    .then(res => dispatch({
        type:GET_PROFILES,
        payload: res.data
    }))
    .catch(err => {
        dispatch({
        type: GET_PROFILES,
        payload: null
    })})

}

// Get profile by handle
export const getProfileByHandle = (handle) => dispatch => {

    dispatch(setProfileLoading(true));

    axios.get(`/api/profiles/handle/${handle}`)
    .then(res => dispatch({
        type: GET_USER_PROFILE,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: GET_USER_PROFILE,
        payload: {}
    }))

}