import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SavePanel from '../components/ImageBox/LeftBox/SavePanel';
import * as savePanelAction from '../modules/savePanel';
import * as imageListAction from '../modules/imageList';

function mapStateToProps(state) {
  // console.log('mapStateToProps:',state)
  const pageImages = state.imageList.pageImages.get(state.imageList.currentTab) || [];
  const allImageChecked = pageImages.length === 0 ? false : pageImages.every(image => image.checked);
  const someImageChecked = pageImages.length === 0 ? false : pageImages.some(image => image.checked);
  const saveInProgress = state.savePanel.saveInProgress;
  const deleteInProgress = state.savePanel.deleteInProgress;
  return {
    filePrefix: state.savePanel.filePrefix,
    saveDirectory: state.savePanel.saveDirectory,
    pageSaveDirectory: state.savePanel.pageSaveDirectory,
    currentTab: state.imageList.currentTab,
    pageTitles: state.imageList.pageTitles,
    deleteAfterSave: state.optionDialog.deleteAfterSave,
    closeTabAfterSave: state.optionDialog.closeTabAfterSave,
    imageShow: state.imageList.imageShow,
    allImageChecked,
    enableSaveButton: someImageChecked && !saveInProgress && !deleteInProgress,
    enableDeleteButton: someImageChecked && !saveInProgress && !deleteInProgress
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SavePanelAction: bindActionCreators(savePanelAction, dispatch),
    ImageListAction: bindActionCreators(imageListAction, dispatch),
  
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SavePanel);