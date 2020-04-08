import {createAction, handleActions} from 'redux-actions';
const chromeBrowser = require('../browser');
const {screen} = require('electron');

// action types
const SET_BROWSER_WIDTH = 'browserOptions/SET_BROWSER_WIDTH';
const SET_BROWSER_HEIGHT = 'browserOptions/SET_BROWSER_HEIGHT';

// action creator
export const setBrowserWidth = createAction(SET_BROWSER_WIDTH);
export const setBrowserHeight = createAction(SET_BROWSER_HEIGHT);


// initial state
// image = {index, filename, imageSrc, dragStart:false, checkeck:false}
const {width, height} = screen.getPrimaryDisplay().workAreaSize;

const initialState = { 
    browserWidth: width,
    browserHeight: height,
}

// reducer
export default handleActions({
    [SET_BROWSER_WIDTH]: (state, action) => {
        console.log(state, action)
        const width = action.payload;
        console.log(`*************${width}`)
        return {
            ...state,
            browserWidth: width
        }
    },
    [SET_BROWSER_HEIGHT]: (state, action) => {
        console.log(state, action)
        const height = action.payload;
        console.log(`*************${height}`)
        return {
            ...state,
            browserHeight: height
        }
    },
}, initialState);