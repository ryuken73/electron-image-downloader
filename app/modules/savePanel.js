import {createAction, handleActions} from 'redux-actions';
import {delImage, delImageFromImagelist, setImageSaved} from './imageList';
import utils from '../utils';
import {optionProvider} from './navigator';

const path = require('path');
const saveDirectory = optionProvider.get('saveDir');

// action types

const SET_FILE_PREFIX = 'savePanel/SET_FILE_PREFIX';
const SET_PAGE_SAVE_DIRECTORY = 'savePanel/SET_PAGE_SAVE_DIRECTORY';
const SET_SAVE_IN_PROGRESS = 'savePanel/SET_SAVE_IN_PROGRESS';
const SET_DELETE_IN_PROGRESS = 'savePanel/SET_DELETE_IN_PROGRESS';

// action creator
export const setFilePrefix = createAction(SET_FILE_PREFIX);
export const setPageSaveDirectory = createAction(SET_PAGE_SAVE_DIRECTORY);
export const setSaveInProgress = createAction(SET_SAVE_IN_PROGRESS);
export const setDeleteInProgress = createAction(SET_DELETE_IN_PROGRESS);

export const deleteFilesSelectedBatch = () => (dispatch, getState)=> {
    const state = getState();
    const pageIndex = state.imageList.currentTab;
    const checkedImage = state.imageList.pageImages.get(pageIndex).filter(image => image.checked);
    const deleteJobs = checkedImage.map(async image => {
        return await utils.file.delete(image.tmpSrc);
    })
    Promise.all(deleteJobs)
    .then(results =>{
        console.log('all checked file deleted!')
        checkedImage.forEach(image => dispatch(delImageFromImagelist({pageIndex, imageIndex:image.index})))
    })
    .catch((err) => console.error(err));
}

// export const deleteFilesSelected = () => async (dispatch, getState)=> {
//     const state = getState();
//     const pageIndex = state.imageList.currentTab;
//     const checkedImage = state.imageList.pageImages.get(pageIndex).filter(image => image.checked);
//     for(let image of checkedImage){
//         const delayedDispatch = utils.fp.delayedExecute(dispatch, 100);
//         await delayedDispatch(delImage(image.index))
//     }
// }

export const deleteFilesSelected = (pageIndex) => async (dispatch, getState)=> {
    const state = getState();
    // const pageIndex = state.imageList.currentTab;
    const checkedImage = state.imageList.pageImages.get(pageIndex).filter(image => image.checked);
    dispatch(setDeleteInProgress(true));
    for(let image of checkedImage){
        const delayedDispatch = utils.fp.delayedExecute(dispatch, 100);
        await delayedDispatch(delImage(image.index, pageIndex))
    }
    dispatch(setDeleteInProgress(false));
}

export const saveFilesSelected = (pageIndex) => async (dispatch, getState)=> {
    const state = getState();
    // const pageIndex = state.imageList.currentTab;
    const checkedImage = state.imageList.pageImages.get(pageIndex).filter(image => image.checked);
    const pageSaveDirectory = state.savePanel.pageSaveDirectory;
    dispatch(setSaveInProgress(true));
    // const saveJobs = checkedImage.map(async image => {
    for(let image of checkedImage) { 
        const srcFileName = image.tmpFname;
        const srcFullName = image.tmpSrc;
        const dstFullName = path.join(pageSaveDirectory, srcFileName);
        console.log(srcFullName, dstFullName);
        const copyFunction = state.optionDialog.deleteAfterSave ? utils.file.move : utils.file.copy;
        await copyFunction(srcFullName, dstFullName);
        // TODO : too many dispatch makes application slow! first
        // dispatch(setImageSaved({pageIndex, imageIndex: image.index}));
        // dispatch(delImageFromImagelist({pageIndex, imageIndex:image.index}));
        const delayedDispatch = utils.fp.delayedExecute(dispatch, 100);
        await delayedDispatch(delImage(image.index, pageIndex))
    }
    dispatch(setSaveInProgress(false));
}


const initialState = { 
    filePrefix: '',
    saveDirectory,
    pageSaveDirectory: saveDirectory,
    saveInProgress: false,
    deleteInProgress: false
}

// reducer
export default handleActions({
    [SET_FILE_PREFIX]: (state, action) => {
        const filePrefix = action.payload;
        return {
            ...state,
            filePrefix
        }
    },
    [SET_PAGE_SAVE_DIRECTORY]: (state, action) => {
        const pageSaveDirectory = action.payload;
        return {
            ...state,
            pageSaveDirectory
        }
    },
    [SET_SAVE_IN_PROGRESS]: (state, action) => {
        const saveInProgress = action.payload;
        return {
            ...state,
            saveInProgress
        }
    },
    [SET_DELETE_IN_PROGRESS]: (state, action) => {
        const deleteInProgress = action.payload;
        return {
            ...state,
            deleteInProgress
        }
    } 
}, initialState);