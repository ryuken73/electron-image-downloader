import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import ImageListPanel from '../components/ImageBox/RightBox/ImageListPanel';
import ImageTabs from '../components/ImageBox/RightBox/ImageTabs';
import * as imageActions from '../modules/imageList';

function mapStateToProps(state) {
  console.log('mapStateToProps:',state)
  return {
    pageImages: state.imageList.pageImages,
    pageTitles: state.imageList.pageTitles,
    currentTab: state.imageList.currentTab,
  }
}

function mapDispatchToProps(dispatch) {
  return {ImageActions: bindActionCreators(imageActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageTabs);