import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MessagePanel from '../components/ImageBox/BottomBox/MessagePanel';
import * as messagePanelActions from '../modules/messagePanel';

function mapStateToProps(state) {
  // console.log('mapStateToProps:',state)
  return {
    logLevel: state.messagePanel.logLevel,
    message: state.messagePanel.message,

  }
}

function mapDispatchToProps(dispatch) {
  return {MessagePanelActions: bindActionCreators(messagePanelActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePanel);