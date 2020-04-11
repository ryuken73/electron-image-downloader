import {createAction, handleActions} from 'redux-actions';
const utils = require('../utils');
const chromeBrowser = require('../browser');

// action types
const ADD_IMAGE_DATA = 'imageList/ADD_IMAGE_DATA';
const SET_IMAGE_DATA = 'imageList/SET_IMAGE_DATA';

// action creator
export const addImageData = createAction(ADD_IMAGE_DATA);
export const setImageData = createAction(SET_IMAGE_DATA);

const imageDefault = {
    index: null,
    tmpFname: null,
    tmpSrc: null,
    metadata: {},
    dragStart: false,
    checked: false
}

const mkImageItem = (imageInfo) => {
    const {size} = imageInfo.metadata;
    imageInfo.metadata.sizeKB = utils.number.toByteUnit({number:Number(size), unit:'KB'});
    return {
        ...imageDefault,
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
}, initialState);