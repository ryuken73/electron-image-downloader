import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageListPanel from '../components/ImageBox/RightBox/ImageListPanel';
import * as imageActions from '../modules/imageList';

function mapStateToProps(state) {
  console.log('mapStateToProps:',state)
  return {
    imageData: state.imageList.imageData,
    fileTypes: state.displayFilters.fileTypes,
    fileSizeMin: state.displayFilters.fileSizeMin,
    fileSizeMax: state.displayFilters.fileSizeMax,
    filePatterns: state.displayFilters.filePatterns,
  }
}

function mapDispatchToProps(dispatch) {
  return {ImageActions: bindActionCreators(imageActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageListPanel);