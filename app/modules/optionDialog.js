const path = require('path');
import {createAction, handleActions} from 'redux-actions';
import DEFAULT_OPTIONS from '../config/options'; 

// action types
const SET_DIALOG_OPEN = 'optionDialog/SET_DIALOG_OPEN';
const SET_HOME_URL = 'optionDialog/SET_HOME_URL';
const SET_SAVE_DIR = 'optionDialog/SET_SAVE_DIR';
const SET_TEMP_DIR = 'optionDialog/SET_TEMP_DIR';
const SET_DELETE_ON_CLOSE = 'optionDialog/SET_DELETE_ON_CLOSE';
const SET_DELETE_ON_START = 'optionDialog/SET_DELETE_ON_START';
const SET_DELETE_AFTER_SAVE = 'optionDialog/SET_DELETE_AFTER_SAVE';
const SET_CLOSE_TAB_AFTER_SAVE = 'optionDialog/SET_CLOSE_TAB_AFTER_SAVE';
const SET_ALL_OPTIONS = 'optionDialog/SET_ALL_OPTIONS';

// action creator
export const setDialogOpen = createAction(SET_DIALOG_OPEN);
export const setHomeUrl = createAction(SET_HOME_URL);
export const setSaveDir = createAction(SET_SAVE_DIR);
export const setTempDir = createAction(SET_TEMP_DIR);
export const setDeleteOnClose = createAction(SET_DELETE_ON_CLOSE);
export const setDeleteOnStart = createAction(SET_DELETE_ON_START);
export const setDeleteAfterSave = createAction(SET_DELETE_AFTER_SAVE);
export const setCloseTabAfterSave = createAction(SET_CLOSE_TAB_AFTER_SAVE);
export const setAllOptions = createAction(SET_ALL_OPTIONS);


const initialState = {
    dialogOpen: false,
    ...DEFAULT_OPTIONS
};
// reducer
export default handleActions({
    [SET_DIALOG_OPEN]: (state, action) => {
        const dialogOpen = action.payload;
        return {
            ...state,
            dialogOpen
        }
    },
    [SET_HOME_URL]: (state, action) => {
        const homeUrl = action.payload
        return {
            ...state,
            homeUrl
        }
    },
    [SET_SAVE_DIR]: (state, action) => {
        const saveDir = action.payload
        return {
            ...state,
            saveDir
        }
    },
    [SET_TEMP_DIR]: (state, action) => {
        const tempDir = action.payload
        return {
            ...state,
            tempDir
        }
    },
    [SET_DELETE_ON_CLOSE]: (state, action) => {
        const deleteOnClose = action.payload
        return {
            ...state,
            deleteOnClose
        }
    },
    [SET_DELETE_ON_START]: (state, action) => {
        const deleteOnStart = action.payload
        return {
            ...state,
            deleteOnStart
        }
    },
    [SET_DELETE_AFTER_SAVE]: (state, action) => {
        const deleteAfterSave = action.payload
        return {
            ...state,
            deleteAfterSave
        }
    },
    [SET_CLOSE_TAB_AFTER_SAVE]: (state, action) => {
        const closeTabAfterSave = action.payload
        return {
            ...state,
            closeTabAfterSave
        }
    },
    [SET_ALL_OPTIONS]: (state, action) => {
        const options = action.payload;
        return {
            ...state,
            ...options
        }
    },    
}, initialState);