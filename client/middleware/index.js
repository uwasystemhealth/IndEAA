import reduxThunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import createSagaMiddleware from "redux-saga"
// import { routerMiddleware } from 'react-router-redux';
// import { browserHistory } from 'react-router';
import logger from './logger';

// This needs to be activated after applying it to the storep
export const sagaMiddleware = createSagaMiddleware()

export default [
  reduxThunk, // Thunk middleware for Redux
  reduxPromiseMiddleware, // Resolve, reject promises with conditional optimistic updates
  sagaMiddleware,
  // routerMiddleware(browserHistory), // !! IMPORTANT for location.href changes
  logger, // A basic middleware logger
];
