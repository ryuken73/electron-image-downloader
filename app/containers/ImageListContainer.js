import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageListPanel from '../components/ImageBox/RightBox/ImageListPanel';
import * as imageActions from '../modules/imageList';

function mapStateToProps(state) {
  console.log('mapStateToProps:',state)
  return {
    imageData: state.imageList.imageData,
  }
}

function mapDispatchToProps(dispatch) {
  return {ImageActions: bindActionCreators(imageActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageListPanel);