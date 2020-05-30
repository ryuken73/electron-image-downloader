import {createAction, handleActions} from 'redux-actions';
import {addImageData, setCurrentTab, addPage, delPage, setPageTitles} from './imageList'
import utils from '../utils';
import options from '../config/options';
import optionStore from '../config/optionStore';

const chromeBrowser = require('../browser/Browser');

// initialize config store and expose related method
// optionProvider.get(key) : return option from localStorage or default
// optionProvider.set(key, value) : save option in localStorage or nothing do

const DEFAULT_OPTIONS = {...options};

const storageType = 'localStorage';
const storage = utils.browserStorage.init(storageType) ? utils.browserStorage : new Map();
export const optionProvider = optionStore(DEFAULT_OPTIONS, storage);

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
    // make new Browser instance
    const tempDir = optionProvider.get('tempDir');
    const browser = chromeBrowser.initBrowser({width, height, tempDir});
    const unProcessedImages = [];
    const delayedDispatch = utils.fp.delayedExecute(dispatch);
    let serialDispatcher;
    browser.registerPageEventHandler('saveFile', imageInfo => {
        console.log('saved:',imageInfo);
        console.log(`+++++++ length of unProcessedImages : ${unProcessedImages.length}`);
        unProcessedImages.push(imageInfo);
        if(!serialDispatcher){
            serialDispatcher = setInterval(() => {
                const imageInfo = unProcessedImages.shift();
                if(imageInfo){
                    dispatch(addImageData(imageInfo));
                } else {
                    clearInterval(serialDispatcher);
                    serialDispatcher = null;
                }
            }, 100)
        }
        // dispatch(addImageData(imageInfo));
    })
    browser.registerBrowserEventHandler('pageAdded', ({pageIndex, title}) => {
        console.log('pageAdded:',pageIndex);  
        dispatch(setCurrentTab(pageIndex));
        dispatch(addPage({pageIndex})); 
        dispatch(setPageTitles({pageIndex, title}));
        // dispatch(setCurrentTab(pageIndex));
    })
    browser.registerBrowserEventHandler('pageClosed', removedPageIndex => {
        console.log('pageClosed:', removedPageIndex);    
        const {pageImages} = getState().imageList;
        const imageData = pageImages.get(removedPageIndex);
        const deleteFileJobs = imageData.map(async image => {
            const fname = image.tmpSrc;
            return await browser.delFile(fname);
        })
        Promise.all(deleteFileJobs)
        .then(results => {
            console.log('delete all images from closed tab');
            dispatch(delPage(removedPageIndex));
        })
    })
    browser.registerBrowserEventHandler('titleChanged', ({pageIndex, title}) => {
        console.log('titleChanged:',pageIndex, title);        
        dispatch(setPageTitles({pageIndex, title}));
        dispatch(setCurrentTab(pageIndex));
    })
    // open first page and goto url
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

// const storageType = 'localStorage';
// const defaultUrl = utils.browserStorage.init(storageType) ?
//                    utils.browserStorage.get('homeUrl') : DEFAULT_OPTIONS.homeUrl;

const defaultUrl = optionProvider.get('homeUrl');

console.log(defaultUrl)

// initial state
const initialState = {
    launchUrl: defaultUrl,
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