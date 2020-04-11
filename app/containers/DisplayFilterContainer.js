import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DisplayFilters from '../components/ControlBox/RightBox/DisplayFilters';
import * as displayFilterActions from '../modules/displayFilters';

function mapStateToProps(state) {
  console.log('mapStateToProps:',state)
  return {
    fileTypes: state.displayFilters.fileTypes,
    fileSizeMin: state.displayFilters.fileSizeMin,
    fileSizeMax: state.displayFilters.fileSizeMax,
    filePatterns: state.displayFilters.filePatterns,
  }
}

function mapDispatchToProps(dispatch) {
  return {DisplayFilterActions: bindActionCreators(displayFilterActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFilters);