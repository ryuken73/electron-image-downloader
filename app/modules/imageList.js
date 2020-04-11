import {createAction, handleActions} from 'redux-actions';
const chromeBrowser = require('../browser');

// action types
const ADD_IMAGE_DATA = 'imageList/ADD_IMAGE_DATA';
const SET_IMAGE_DATA = 'imageList/SET_IMAGE_DATA';

// action creator
export const addImageData = createAction(ADD_IMAGE_DATA);
export const setImageData = createAction(SET_IMAGE_DATA);



// export const launchBrowserAsync = () => async (dispatch, getState) => {
//     const state = getState();
//     const {launchUrl} = state.navigator;
//     const {page, browser} = await chromeBrowser.launch(launchUrl);
//     browser.on('disconnected', () => {
//         console.log('browser closed')
//         dispatch(enableLaunchBtn());
//         dispatch(toggleTrack(false));
//     })
//     dispatch(launchBrowser(page));
// }

// export const toggleTrackAsync = () => async (dispatch, getState) => {
//     const state = getState();
//     const {page, tracking} = state.navigator;
//     const newTrackFlag = !tracking;
//     newTrackFlag ? await chromeBrowser.startTracking(page) : await chromeBrowser.stopTracking(page);
//     dispatch(toggleTrack(newTrackFlag));
// }


// initial state
// image = {index, filename, imageSrc, dragStart:false, checkeck:false}
// let imageCount = 0;

const imageDefault = {
    index: null,
    tmpFname: null,
    tmpSrc: null,
    metadata: {},
    dragStart: false,
    checked: false
}

const mkImageItem = (imageInfo) => {
    return {
        ...imageDefault,
        // index: ++imageCount,
        index: imageInfo.metadata.reqIndex,
        tmpFname: imageInfo.tmpFname,
        tmpSrc: imageInfo.tmpSrc,
        metadata: imageInfo.metadata
    }
}

const initialState = {
    imageData: [],
}

// reducer
export default handleActions({
    [ADD_IMAGE_DATA]: (state, action) => {
        console.log(state, action)
        const imageInfo = action.payload;
        console.log(`*************${imageInfo}`)
        const newImageData = [
            ...state.imageData,
            mkImageItem(imageInfo)
        ]
        return {
            ...state,
            imageData: newImageData
        }
    },
    [SET_IMAGE_DATA]: (state, action) => {
        const newImageData = action.payload;
        return {
            ...state,
            imageData: newImageData
        }
    }
    // [LAUNCH]: (state, action) => {
    //     console.log('launch browser triggered', state);
    //     const page = action.payload;
    //     console.log(page)
    //     return {
    //         ...state,
    //         launched: true,
    //         page
    //     }
    // },
    // [ENABLE_LAUNCHBTN]: (state, action) => {
    //     return {
    //         ...state,
    //         launched: false
    //     }
    // },
    // [TOGGLE_TRACK]: (state, action) => {
    //     console.log('toggling', state);
    //     const newTrackFlag = action.payload;
    //     console.log(newTrackFlag)
    //     return {
    //         ...state,
    //         tracking: newTrackFlag
    //     }
    // }
}, initialState);