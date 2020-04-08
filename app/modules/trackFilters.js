import {createAction, handleActions} from 'redux-actions';
const chromeBrowser = require('../browser');
const {screen} = require('electron');

// action types
const SET_CONTENT_TYPE = 'trackFilters/SET_CONTENT_TYPE';
const SET_CONTENT_SIZE_MIN = 'trackFilters/SET_CONTENT_SIZE_MIN';
const SET_CONTENT_SIZE_MAX = 'trackFilters/SET_CONTENT_SIZE_MAX';
const SET_TEXT_PATTERNS = 'trackFilters/SET_TEXT_PATTERNS';

// action creator
export const setContentTypes = createAction(SET_CONTENT_TYPE);
export const setContentSizeMin = createAction(SET_CONTENT_SIZE_MIN);
export const setContentSizeMax = createAction(SET_CONTENT_SIZE_MAX);
export const seturlPatterns = createAction(SET_TEXT_PATTERNS);

const initialState = { 
    contentTypes: ['image','jpg'],
    contentSizeMin: 1024,
    contentSizeMax: 10240000,
    urlPatterns: ['*']
}

// reducer
export default handleActions({
    [SET_CONTENT_TYPE]: (state, action) => {
        console.log(state, action)
        const contentTypes = action.payload;
        console.log(`*************${contentTypes}`)
        return {
            ...state,
            contentTypes
        }
    },
    [SET_CONTENT_SIZE_MIN]: (state, action) => {
        console.log(state, action)
        const contentSizeMin = action.payload;
        console.log(`*************${height}`)
        return {
            ...state,
            contentSizeMin
        }
    },
    [SET_CONTENT_SIZE_MAX]: (state, action) => {
        const contentSizeMax = action.payload;
        return {
            ...state,
            contentSizeMax
        }
    },
    [SET_TEXT_PATTERNS]: (state, action) => {
        const urlPatterns = action.payload;
        return {
            ...state,
            urlPatterns
        }
    },    
}, initialState);