import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
// import './app.global.css';

// original
const store = configureStore();
//

// import {createStore} from 'redux';
// import reducers from './reducers/downloader';
// const store = createStore(reducers);

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);
