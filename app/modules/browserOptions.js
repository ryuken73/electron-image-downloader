import {createAction, handleActions} from 'redux-actions';
const chromeBrowser = require('../browser');
const {screen} = require('electron');

// action types
const SET_BROWSER_WIDTH = 'browserOptions/SET_BROWSER_WIDTH';
const SET_BROWSER_HEIGHT = 'browserOptions/SET_BROWSER_HEIGHT';
const SET_TRACKING_TAB = 'browserOptions/SET_TRACKING_TAB';

// action creator
export const setBrowserWidth = createAction(SET_BROWSER_WIDTH);
export const setBrowserHeight = createAction(SET_BROWSER_HEIGHT);
export const setTrackingTab = createAction(SET_TRACKING_TAB);


// initial state
// image = {index, filename, imageSrc, dragStart:false, checkeck:false}
const {width, height} = screen.getPrimaryDisplay().workAreaSize;

const initialState = { 
    browserWidth: width,
    browserHeight: height,
    trackingTab: 'all'
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
    [SET_TRACKING_TAB]: (state, action) => {
        const trackingTab = action.payload;
        return {
            ...state,
            trackingTab
        }
    }
}, initialState);