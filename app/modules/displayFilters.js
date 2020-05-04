import {createAction, handleActions} from 'redux-actions';

// action types
const SET_FILE_TYPE = 'displayFilters/SET_FILE_TYPE';
const SET_FILE_SIZE_MIN = 'displayFilters/SET_FILE_SIZE_MIN';
const SET_FILE_SIZE_MAX = 'displayFilters/SET_FILE_SIZE_MAX';
const SET_FILE_PATTERN = 'displayFilters/SET_FILE_PATTERN';

// action creator
export const setFileTypes = createAction(SET_FILE_TYPE);
export const setFileSizeMin = createAction(SET_FILE_SIZE_MIN);
export const setFileSizeMax = createAction(SET_FILE_SIZE_MAX);
export const setFilePattern = createAction(SET_FILE_PATTERN);

const initialState = { 
    fileTypes: ['all'],
    fileSizeMin: 10240,
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