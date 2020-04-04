import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import * as modules from '../modules';

const history = createHashHistory();

const configureStore = (initialState) => {
  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });
  
  // Router Middleware
  const router = routerMiddleware(history);
  
  // get reducers
  const reducers = combineReducers({
    router: connectRouter(history),
    ...modules
  });


  const middlewares = [thunk, logger, router];
  
  const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devtools || compose;

  const store = createStore(reducers, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));

  // if (module.hot) {
  //   module.hot.accept(
  //     '../reducers',
  //     // eslint-disable-next-line global-require
  //     () => store.replaceReducer(require('../reducers').default)
  //   );
  // }
  return store;
  // const configure = (preloadedState) => createStore(reducers, preloadedState, composeEnhancers(
  //   applyMiddleware(...middlewares)
  // ));
}


export default {configureStore, history};



// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import { createHashHistory } from 'history';
// import { routerMiddleware, routerActions } from 'connected-react-router';
// import { createLogger } from 'redux-logger';
// import createRootReducer from '../reducers';
// import * as counterActions from '../actions/counter';
// import type { counterStateType } from '../reducers/types';

// const history = createHashHistory();

// createRootReducers return combinedReducers..
// const rootReducer = createRootReducer(history);


// const configureStore = (initialState?: counterStateType) => {
//   // Redux Configuration
//   const middleware = [];
//   const enhancers = [];

//   // Thunk Middleware
//   middleware.push(thunk);

//   // Logging Middleware
//   const logger = createLogger({
//     level: 'info',
//     collapsed: true
//   });

//   // Skip redux logs in console during the tests
//   if (process.env.NODE_ENV !== 'test') {
//     middleware.push(logger);
//   }

//   // Router Middleware
//   const router = routerMiddleware(history);
//   middleware.push(router);

//   // Redux DevTools Configuration
//   const actionCreators = {
//     ...counterActions,
//     ...routerActions
//   };
//   // If Redux DevTools Extension is installed use it, otherwise use Redux compose
//   /* eslint-disable no-underscore-dangle */
//   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         // Options: http://extension.remotedev.io/docs/API/Arguments.html
//         actionCreators
//       })
//     : compose;
//   /* eslint-enable no-underscore-dangle */

//   // Apply Middleware & Compose Enhancers
//   enhancers.push(applyMiddleware(...middleware));
//   const enhancer = composeEnhancers(...enhancers);

//   // Create Store
//   const store = createStore(rootReducer, initialState, enhancer);

//   if (module.hot) {
//     module.hot.accept(
//       '../reducers',
//       // eslint-disable-next-line global-require
//       () => store.replaceReducer(require('../reducers').default)
//     );
//   }

//   return store;
// };

// export default { configureStore, history };
