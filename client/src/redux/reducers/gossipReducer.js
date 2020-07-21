import { GET_GOSSIPS,SET_GOSSIPS_LOADING,GET_GOSSIP } from '../actions/types';

const initialState = {
    gossips: {},
    isLoading: true,
    gossip: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GOSSIPS:
            return { ...state, isLoading: false, gossips: action.payload }
        case GET_GOSSIP:
            return { ...state, isLoading: false, gossip: action.payload }
        case SET_GOSSIPS_LOADING:
            return { ...state, isLoading: true }
        default:
            return state;
    }

}