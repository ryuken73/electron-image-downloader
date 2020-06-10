import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OptionDialog from '../components/OptionDialog';
import * as optionDialogActions from '../modules/optionDialog';

function mapStateToProps(state) {
  // console.log('mapStateToProps:',state)
  return {
    dialogOpen: state.optionDialog.dialogOpen,
    homeUrl: state.optionDialog.homeUrl,
    saveDir: state.optionDialog.saveDir,
    tempDir: state.optionDialog.tempDir,
    deleteOnClose: state.optionDialog.deleteOnClose,
    deleteOnStart: state.optionDialog.deleteOnStart,
    deleteAfterSave: state.optionDialog.deleteAfterSave,
    closeTabAfterSave: state.optionDialog.closeTabAfterSave
  }
}

function mapDispatchToProps(dispatch) {
  return {OptionDialogActions: bindActionCreators(optionDialogActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionDialog);