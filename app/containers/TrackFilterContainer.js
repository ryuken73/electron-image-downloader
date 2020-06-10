import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TrackFilters from '../components/ControlBox/RightBox/TrackFilters';
import * as trackFilterActions from '../modules/trackFilters';

function mapStateToProps(state) {
  // console.log('mapStateToProps:',state)
  return {
    contentTypes: state.trackFilters.contentTypes,
    contentSizeMin: state.trackFilters.contentSizeMin,
    contentSizeMax: state.trackFilters.contentSizeMax,
    urlPatterns: state.trackFilters.urlPatterns,
    tracking: state.navigator.tracking
  }
}

function mapDispatchToProps(dispatch) {
  return {TrackFilterActions: bindActionCreators(trackFilterActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackFilters);