import {createAction, handleActions} from 'redux-actions';

// action types
const SELECT_ALL_IMAGES = 'savePanel/SELECT_ALL_IMAGES';
const SAVE_SELECTED = 'savePanel/SAVE_SELECTED';
const DELETE_SELECTED = 'savePanel/DELETE_SELECTED';

// action creator
export const setFileTypes = createAction(SET_FILE_TYPE);
export const setFileSizeMin = createAction(SET_FILE_SIZE_MIN);
export const setFileSizeMax = createAction(SET_FILE_SIZE_MAX);
export const setFilePattern = createAction(SET_FILE_PATTERN);

const initialState = { 
    fileTypes: ['all'],
    fileSizeMin: 1024,
    fileSizeMax: 10240000,
    filePatterns: ['*']
}

// reducer
export default handleActions({
    [SET_FILE_TYPE]: (state, action) => {
        const fileTypes = action.payload;
        return {
            ...state,
            fileTypes
        }
    },
    [SET_FILE_SIZE_MIN]: (state, action) => {
        const fileSizeMin = Number(action.payload);
        if(isNaN(fileSizeMin)) return {...state};
        return {
            ...state,
            fileSizeMin
        }
    },
    [SET_FILE_SIZE_MAX]: (state, action) => {
        const fileSizeMax = Number(action.payload);
        if(isNaN(fileSizeMax)) return {...state};
        return {
            ...state,
            fileSizeMax
        }
    },
    [SET_FILE_PATTERN]: (state, action) => {
        const filePatterns = action.payload;
        console.log('***********',filePatterns)
        return {
            ...state,
            filePatterns
        }
    },    
}, initialState);