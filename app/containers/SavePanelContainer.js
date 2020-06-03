import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SavePanel from '../components/ImageBox/LeftBox/SavePanel';
import * as savePanelAction from '../modules/savePanel';
import * as imageListAction from '../modules/imageList';

function mapStateToProps(state) {
  console.log('mapStateToProps:',state)
  const pageImages = state.imageList.pageImages.get(state.imageList.currentTab) || [];
  const allImageChecked = pageImages.length === 0 ? false : pageImages.every(image => image.checked);
  console.log(`%%%%%%%%%%%%%%%%%%%%%% ${allImageChecked}`, pageImages)
  return {
    filePrefix: state.savePanel.filePrefix,
    saveDirectory: state.savePanel.saveDirectory,
    pageSaveDirectory: state.savePanel.pageSaveDirectory,
    currentTab: state.imageList.currentTab,
    pageTitles: state.imageList.pageTitles,
    deleteAfterSave: state.optionDialog.deleteAfterSave,
    imageShow: state.imageList.imageShow,
    allImageChecked
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SavePanelAction: bindActionCreators(savePanelAction, dispatch),
    ImageListAction: bindActionCreators(imageListAction, dispatch),
  
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SavePanel);