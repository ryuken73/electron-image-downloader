// // @flow
// import React, { Component } from 'react';
// import App from '../components/App';

// type Props = {};

// export default class MainPage extends Component<Props> {
//   props: Props;
//   render() {
//     return <App />;
//   }
// }

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navigator from '../components/ControlBox/LeftBox/Navigator';
import * as AppActions from '../actions/index';

function mapStateToProps(state) {
  console.log(state)
  return {
    launchUrl: state.downloader.url
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);