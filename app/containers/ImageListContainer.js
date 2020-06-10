import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageListPanel from '../components/ImageBox/RightBox/ImageListPanel';
import * as imageActions from '../modules/imageList';

function mapStateToProps(state, ownProps) {
  // console.log('mapStateToProps:',state)
  const pageImages = state.imageList.pageImages;
  const {pageIndex, hidden} = ownProps;
  const imageData = pageImages.get(pageIndex) || [];
  
  return {
    pageIndex,
    imageData,
    hidden,
    fileTypes: state.displayFilters.fileTypes,
    fileSizeMin: state.displayFilters.fileSizeMin,
    fileSizeMax: state.displayFilters.fileSizeMax,
    filePatterns: state.displayFilters.filePatterns,
    imagePreviewOpen: state.imageList.imagePreviewOpen,
    imagePreviewSrc: state.imageList.imagePreviewSrc,
    imagePreviewSrcIndex: state.imageList.imagePreviewSrcIndex,
    imagePreviewSrcName: state.imageList.imagePreviewSrcName,
    imageShow: state.imageList.imageShow
  }
}

function mapDispatchToProps(dispatch) {
  return {ImageActions: bindActionCreators(imageActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageListPanel);