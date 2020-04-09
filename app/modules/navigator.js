import {createAction, handleActions} from 'redux-actions';
import {addImageData} from './imageList'
const chromeBrowser = require('../browser');

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
    browser.on('targetcreated', async (target) => {
        console.log('target created');
        if(target.type() !== 'page') return;
        const page = await target.page();
        // set common settings on page (height, width and timeout)
        const {width, height, defaultTimeout} = browser.pageOptions;
        page.setDefaultTimeout(defaultTimeout);
        page.setViewport({width, height});
        // attach event when file save done, dispatch addImage on pannel
        page.on('saveFile', fname => {
                console.log('saved:',fname);
                dispatch(addImageData(fname))
        })
    })
    dispatch(launchBrowser({browser, page}));
}

export const toggleTrackAsync = () => async (dispatch, getState) => {
    const state = getState();
    const {browser, page, tracking} = state.navigator;
    const {trackingTab} = state.browserOptions;
    const {contentTypes, contentSizeMin, contentSizeMax, urlPatterns} = state.trackFilters;
    console.log(state.trackFilters);
    const {startTrack, stopTrack, mkTrackFilter} = chromeBrowser;
    const newTrackFlag = !tracking;
    const genTrackFilter = mkTrackFilter({contentTypes, contentSizeMin, contentSizeMax, urlPatterns});
    const startSave = trackingTab === 'all' ? startTrack(browser) : startTrack(page);
    const stopSave = trackingTab === 'all' ? stopTrack(browser) : stopTrack(page);
    // const trackMethod = trackingTab === 'all' ? chromeBrowser.startTrackingAll : chromeBrowser.startTracking
    // newTrackFlag ? await chromeBrowser.startTracking(page) : await chromeBrowser.stopTracking(page);
    newTrackFlag ? await startSave(genTrackFilter) : await stopSave();
    dispatch(toggleTrack(newTrackFlag));
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
        const {browser, page} = action.payload;
        console.log(browser, page)
        return {
            ...state,
            launched: true,
            browser,
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