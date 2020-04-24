import {createAction, handleActions} from 'redux-actions';
import {addImageData, setPageTitles} from './imageList'
const chromeBrowser = require('../browser/Browser');

// action types
const SET_URL = 'navigator/SET_URL';
const LAUNCH = 'navigator/LAUNCH';
const TOGGLE_TRACK = 'navigator/TOGGLE_TRACK';
const ENABLE_TRACKBTN = 'navigator/ENABLE_TRACKBTN';
const ENABLE_LAUNCHBTN = 'navigator/ENABLE_LAUNCHBTN';

// action creator
export const setURL = createAction(SET_URL);
export const launchBrowser = createAction(LAUNCH);
export const toggleTrack = createAction(TOGGLE_TRACK);
export const enableTrackBtn = createAction(ENABLE_TRACKBTN);
export const enableLaunchBtn = createAction(ENABLE_LAUNCHBTN);

// react thunk
export const launchBrowserAsync = () => async (dispatch, getState) => {
    const state = getState();
    const {launchUrl} = state.navigator;
    const {browserWidth:width, browserHeight:height} = state.browserOptions;
    const browser = chromeBrowser.initBrowser({width, height});
    browser.registerPageEventHandler('saveFile', imageInfo => {
        console.log('saved:',imageInfo);
        dispatch(addImageData(imageInfo));
    })
    browser.registerBrowserEventHandler('pageChanged', ({pageIndex, title}) => {
        console.log('pageChanged:',pageIndex, title);        
        dispatch(setPageTitles({pageIndex, title}));
    })
    await browser.launch(launchUrl);
    browser.on('disconnected', () => {
        console.log('browser closed')
        dispatch(enableLaunchBtn());
        dispatch(toggleTrack(false));
    })
    dispatch(launchBrowser(browser));
    // dispatch(toggleTrackAsync());
}

export const toggleTrackAsync = () => async (dispatch, getState) => {
    const state = getState();
    const {browser, tracking} = state.navigator;
    const {trackingTab} = state.browserOptions;
    const {contentTypes, contentSizeMin, contentSizeMax, urlPatterns} = state.trackFilters;
    console.log(state.trackFilters);
    const {startTrack, stopTrack, mkTrackFilter} = browser;
    const TrackRequested = !tracking;
    // make track filter based on current track filter's state
    const trackFilter = mkTrackFilter({contentTypes, contentSizeMin, contentSizeMax, urlPatterns});
    const startSave = (trackFilter) => trackingTab === 'all' ? startTrack(trackFilter) : startTrack(trackFilter,0);
    const stopSave = () => trackingTab === 'all' ? stopTrack() : stopTrack(0);

    TrackRequested ? await startSave(trackFilter) : await stopSave();
    dispatch(toggleTrack(TrackRequested));
}


// initial state
const initialState = {
    launchUrl: 'https://www.google.com',
    browser: null,
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
        const browser = action.payload;
        console.log(browser)            
        return {
            ...state,
            launched: true,
            browser
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