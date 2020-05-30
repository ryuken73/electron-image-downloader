const path = require('path');
import {createAction, handleActions} from 'redux-actions';
import DEFAULT_OPTIONS from '../config/options'; 

// action types
const SET_LOG_INFO = 'messagePanel/LOG_INFO';
const SET_LOG_ERROR = 'messagePanel/LOG_ERROR';
const SET_LOG_FAIL = 'messagePanel/LOG_FAIL';

// action creator
export const logInfo = createAction(SET_LOG_INFO);
export const logError = createAction(SET_LOG_ERROR);
export const logFail = createAction(SET_LOG_FAIL);

const initialState = {
    logLevel: 'INFO',
    message: 'ready'
};
// reducer
export default handleActions({
    [SET_LOG_INFO]: (state, action) => {
        const message = action.payload;
        return {
            ...state,
            logLevel: 'INFO',
            message
        }
    }, 
    [SET_LOG_ERROR]: (state, action) => {
        const message = action.payload;
        return {
            ...state,
            logLevel: 'ERROR',
            message
        }
    }, 
    [SET_LOG_FAIL]: (state, action) => {
        const message = action.payload;
        return {
            ...state,
            logLevel: 'FAIL',
            message
        }
    }, 
}, initialState);