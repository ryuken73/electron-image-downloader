import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavigatorPanel from '../components/ControlBox/LeftBox/NavigatorPanel';
import * as navigatorActions from '../modules/navigator';

function mapStateToProps(state) {
  console.log('mapStateToProps:',state)
  return {
    launchUrl: state.navigator.launchUrl,
    tracking: state.navigator.tracking,
    launched: state.navigator.launched
  }
}

function mapDispatchToProps(dispatch) {
  return {NavigatorActions: bindActionCreators(navigatorActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigatorPanel);