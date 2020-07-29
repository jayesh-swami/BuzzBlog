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

// Create a new gossip
export const createGossip = (newGoss,history) => dispatch => {

    Axios.post('/api/gossips',newGoss)
    .then(res => {
        history.push('/gossips');
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));

}

// Delete a gossip
export const deleteGossip = (gossID,history) => dispatch => {

    Axios.delete(`/api/gossips/${gossID}`)
    .then(res => history.push('/gossips'))
    .catch(err => history.push('/dashboard'));

}

// Post a comment on the Gossip
export const createComment = (comment,id) => dispatch => {

    console.log(comment);

    Axios.post(`/api/gossips/comment/${id}`,comment)
    .then(res => dispatch(getGossipbyID(id)))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))

}

// Delete your comment on a gossip
export const deleteComment = (commentID,gossID) => dispatch => {

    Axios.delete(`/api/gossips/comment/${gossID}/${commentID}`)
    .then(res => dispatch(getGossipbyID(gossID)))
    .catch(err => dispatch(getGossipbyID(gossID)));
}

// Add a reply to a comment
export const createReply = (comment,commentID, gossID) => dispatch => {

    Axios.post(`/api/gossips/comment/reply/${gossID}/${commentID}`,comment)
    .then(res => {
        dispatch(getGossipbyID(gossID));
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))

}

// Delete a reply
export const deleteReply = (replyID, commentID, gossID) => dispatch => {

    Axios.delete(`/api/gossips/comment/reply/${gossID}/${commentID}/${replyID}`)
    .then(res => dispatch(getGossipbyID(gossID)))
    .catch(err => dispatch(getGossipbyID(gossID)))
}