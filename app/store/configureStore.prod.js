// @flow
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
// import createRootReducer from '../reducers';
// import type { counterStateType } from '../reducers/types';
import * as modules from '../modules';

const history = createHashHistory();
const reducers = combineReducers({
  router: connectRouter(history),
  ...modules
});

// const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState?: counterStateType) {
  return createStore<*, counterStateType, *>(
    reducers,
    initialState,
    enhancer
  );
}

export default { configureStore, history };
