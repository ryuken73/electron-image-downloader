import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BrowserOptions from '../components/ControlBox/LeftBox/BrowserOptions';
import * as browserOptionsActions from '../modules/browserOptions';

function mapStateToProps(state) {
  console.log('mapStateToProps:',state)
  return {
    width: state.browserOptions.browserWidth,
    height: state.browserOptions.browserHeight,
    trackingTab: state.browserOptions.trackingTab
  }
}

function mapDispatchToProps(dispatch) {
  return {BrowserOptionsActions: bindActionCreators(browserOptionsActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowserOptions);