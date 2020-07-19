import { createStore, applyMiddleware,compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import logger from 'redux-logger';

const middleware = [thunk,logger];

const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;