import { GET_ERRORS, GET_GOSSIPS, SET_GOSSIPS_LOADING,GET_GOSSIP } from './types';
import Axios from 'axios';

// Get all gossips
export const getGossips = () => dispatch => {

    dispatch(setGossipLoading());

    Axios.get('/api/gossips')
    .then(res => dispatch({
        type: GET_GOSSIPS,
        payload: res.data
    }))
    .catch(err => dispatch({
        type: GET_GOSSIPS,
        payload: null
    }))

}

// Set is loading gossips to true
export const setGossipLoading = () => ({
    type: SET_GOSSIPS_LOADING
});

// Get Gossip by ID
export const getGossipbyID = (id) => dispatch => {

    dispatch(setGossipLoading());

    Axios.get(`/api/gossips/${id}`)
    .then(res => dispatch({
        type: GET_GOSSIP,
        payload: res.data
    }))
    .catch(err => dispatch({
        type:GET_GOSSIP,
        payload: null
    }))

}
