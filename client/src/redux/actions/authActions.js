import { GET_ERRORS,SET_USER_DATA } from './types';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register User
export const registerUser = (userData, history) => (dispatch) => {

        axios.post('/api/users/register', userData)
        .then(res => {
            history.push('/login');     
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));

}

// Login User
export const loginUser = (loginCreds) => (dispatch) => {

    axios.post('/api/users/login', loginCreds)
    .then(res => {
        
        // Save token to Local Storage
        const { token } = res.data;
        localStorage.setItem('jwtToken',token);

        // Set token to auth header
        setAuthToken(token);

        // Decode token
        const user = jwt_decode(token);

        // Set current user
        dispatch(setCurrentUser(user));

    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

// Logout User
export const logoutUser = (history) => dispatch => {

    // Remove token from local storage
    localStorage.removeItem('jwtToken');

    // remove Auth header
    setAuthToken(false);

    // Set state to null
    dispatch(setCurrentUser({}));

    if(history){
        
        // redirect to home
        history.push("/");
    }

}

// Set Logged in User to Redux state
export const setCurrentUser = (user) => {
    return {
        type: SET_USER_DATA,
        payload: user
    }
}