import {createAction, handleActions} from 'redux-actions';
import {delImageFromImagelist} from './imageList';
import utils from '../utils';
import options from '../config/options';

const path = require('path');

const DEFAULT_OPTIONS = {...options};
const storageType = 'localStorage';
const saveDirectory = utils.browserStorage.storageAvailable(storageType) ?
                      utils.browserStorage.get('saveDir') : DEFAULT_OPTIONS.saveDir;

// action types

const SET_FILE_PREFIX = 'savePanel/SET_FILE_PREFIX';
const SET_PAGE_SAVE_DIRECTORY = 'savePanel/SET_PAGE_SAVE_DIRECTORY';

// action creator
export const setFilePrefix = createAction(SET_FILE_PREFIX);
export const setPageSaveDirectory = createAction(SET_PAGE_SAVE_DIRECTORY);

export const deleteFilesSelected = () => (dispatch, getState)=> {
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

export const saveFilesSelected = () => (dispatch, getState)=> {
    const state = getState();
    const pageIndex = state.imageList.currentTab;
    const checkedImage = state.imageList.pageImages.get(pageIndex).filter(image => image.checked);
    const pageSaveDirectory = state.savePanel.pageSaveDirectory;
    const saveJobs = checkedImage.map(async image => {
        const srcFileName = image.tmpFname;
        const srcFullName = image.tmpSrc;
        const dstFullName = path.join(pageSaveDirectory, srcFileName);
        console.log(srcFullName, dstFullName);
        const copyFunction = state.optionDialog.deleteAfterSave ? utils.file.move : utils.file.copy;
        return await copyFunction(srcFullName, dstFullName);
    })
    console.log(saveJobs);
    Promise.all(saveJobs)
    .then(results =>{
        console.log('all checked file saved!')
        checkedImage.forEach(image => dispatch(delImageFromImagelist({pageIndex, imageIndex:image.index})))
    })
    .catch((err) => console.error(err));
}


const initialState = { 
    filePrefix: '',
    saveDirectory,
    pageSaveDirectory: saveDirectory
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
    } 
}, initialState);