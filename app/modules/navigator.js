import {createAction, handleActions} from 'redux-actions';
import {addImageData} from './imageList'
const chromeBrowser = require('../browser');

// action types
const SET_URL = 'navigator/SET_URL';
const LAUNCH = 'navigator/LAUNCH';
const TOGGLE_TRACK = 'navigator/TOGGLE_TRACK';
const ENABLE_LAUNCHBTN = 'navigator/ENABLE_LAUNCHBTN';

// action creator
export const setURL = createAction(SET_URL);
export const launchBrowser = createAction(LAUNCH);
export const toggleTrack = createAction(TOGGLE_TRACK);
export const enableLaunchBtn = createAction(ENABLE_LAUNCHBTN);


export const launchBrowserAsync = () => async (dispatch, getState) => {
    const state = getState();
    const {launchUrl} = state.navigator;
    const {browserWidth:width, browserHeight:height} = state.browserOptions;
    console.log(width, height)
    const {page, browser} = await chromeBrowser.launch({url:launchUrl, width, height});
    browser.on('disconnected', () => {
        console.log('browser closed')
        dispatch(enableLaunchBtn());
        dispatch(toggleTrack(false));
    })
    page.on('saveFile', fname => {
        console.log('saved:',fname);
        dispatch(addImageData(fname))
    })
    dispatch(launchBrowser(page));
}

export const toggleTrackAsync = () => async (dispatch, getState) => {
    const state = getState();
    const {page, tracking} = state.navigator;
    const newTrackFlag = !tracking;
    newTrackFlag ? await chromeBrowser.startTracking(page) : await chromeBrowser.stopTracking(page);
    dispatch(toggleTrack(newTrackFlag));
}


// initial state
const initialState = {
    launchUrl: 'https://www.google.com',
    page: null,
    tracking: false,
    launched: false
}

// reducer
export default handleActions({
    [SET_URL]: (state, action) => {
        console.log(state, action)
        const launchUrl = action.payload;
        return {
            ...state,
            launchUrl
        }
    },
    [LAUNCH]: (state, action) => {
        console.log('launch browser triggered', state);
        const page = action.payload;
        console.log(page)
        return {
            ...state,
            launched: true,
            page
        }
    },
    [ENABLE_LAUNCHBTN]: (state, action) => {
        return {
            ...state,
            launched: false
        }
    },
    [TOGGLE_TRACK]: (state, action) => {
        console.log('toggling', state);
        const newTrackFlag = action.payload;
        console.log(newTrackFlag)
        return {
            ...state,
            tracking: newTrackFlag
        }
    }
}, initialState);