import {createAction, handleActions} from 'redux-actions';
import utils from '../utils';
import {optionProvider} from './navigator';



// action types
const SET_CONTENT_TYPE = 'trackFilters/SET_CONTENT_TYPE';
const SET_CONTENT_SIZE_MIN = 'trackFilters/SET_CONTENT_SIZE_MIN';
const SET_CONTENT_SIZE_MAX = 'trackFilters/SET_CONTENT_SIZE_MAX';
const SET_URL_PATTERN = 'trackFilters/SET_URL_PATTERN';

// action creator
export const setContentTypes = createAction(SET_CONTENT_TYPE);
export const setContentSizeMin = createAction(SET_CONTENT_SIZE_MIN);
export const setContentSizeMax = createAction(SET_CONTENT_SIZE_MAX);
export const setUrlPattern = createAction(SET_URL_PATTERN);

// helper funciton

const getOptionsFromLocalStorage = () => {
    const contentTypes = optionProvider.get('contentTypes');
    const contentSizeMin = optionProvider.get('contentSizeMin');
    const contentSizeMax = optionProvider.get('contentSizeMax');
    const urlPatterns = optionProvider.get('urlPatterns');

    return {contentTypes, contentSizeMin, contentSizeMax, urlPatterns};
} 

const initialState = getOptionsFromLocalStorage();

// reducer
export default handleActions({
    [SET_CONTENT_TYPE]: (state, action) => {
        const contentTypes = action.payload;
        return {
            ...state,
            contentTypes
        }
    },
    [SET_CONTENT_SIZE_MIN]: (state, action) => {
        const contentSizeMin = Number(action.payload);
        if(isNaN(contentSizeMin)) return {...state};
        return {
            ...state,
            contentSizeMin
        }
    },
    [SET_CONTENT_SIZE_MAX]: (state, action) => {
        const contentSizeMax = Number(action.payload);
        if(isNaN(contentSizeMax)) return {...state};
        return {
            ...state,
            contentSizeMax
        }
    },
    [SET_URL_PATTERN]: (state, action) => {
        const urlPatterns = action.payload;
        console.log('***********',urlPatterns)
        return {
            ...state,
            urlPatterns
        }
    },    
}, initialState);