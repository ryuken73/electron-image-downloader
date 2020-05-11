import {createAction, handleActions} from 'redux-actions';
import {delImageFromImagelist} from './imageList';
import utils from '../utils';
import options from '../config/options';

const DEFAULT_OPTIONS = {...options};
const storageType = 'localStorage';
const saveDirectory = utils.browserStorage.storageAvailable(storageType) ?
                      utils.browserStorage.get('saveDir') : DEFAULT_OPTIONS.saveDir;

// action types

const SET_FILE_PREFIX = 'savePanel/SET_FILE_PREFIX';
const SET_SAVE_DIRECTORY = 'savePanel/SET_SAVE_DIRECTORY';

// action creator
export const setFilePrefix = createAction(SET_FILE_PREFIX);
export const setSaveDirectory = createAction(SET_SAVE_DIRECTORY);

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


const initialState = { 
    filePrefix: '',
    saveDirectory
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
    [SET_SAVE_DIRECTORY]: (state, action) => {
        const saveDirectory = action.payload;
        return {
            ...state,
            saveDirectory
        }
    } 
}, initialState);