import {createAction, handleActions} from 'redux-actions';
const utils = require('../utils');
const chromeBrowser = require('../browser');

// action types
// const ADD_IMAGE_DATA = 'imageList/ADD_IMAGE_DATA';
const SET_PAGE_IMAGES = 'imageList/SET_PAGE_IMAGES';
const SET_CURRENT_TAB = 'imageList/SET_CURRENT_TAB';
const FILTER_IMAGES_BY_TYPE = 'imageList/FILTER_IMAGES_BY_TYPE';
const FILTER_IMAGES_BY_MINSIZE = 'imageList/FILTER_IMAGES_BY_MINSIZE';
const FILTER_IMAGES_BY_MAXSIZE = 'imageList/FILTER_IMAGES_BY_MAXSIZE';
const FILTER_IMAGES_BY_NAME = 'imageList/FILTER_IMAGES_BY_NAME';

// action creator
// export const addImageData = createAction(ADD_IMAGE_DATA);
// export const setImageData = createAction(SET_IMAGE_DATA);
export const setPageImages = createAction(SET_PAGE_IMAGES)
export const setCurrentTab = createAction(SET_CURRENT_TAB)
export const filterImageByType = createAction(FILTER_IMAGES_BY_TYPE);
export const filterImageByMinSize = createAction(FILTER_IMAGES_BY_MINSIZE);
export const filterImageByMaxSize = createAction(FILTER_IMAGES_BY_MAXSIZE);
export const filterImageByName = createAction(FILTER_IMAGES_BY_NAME);


const imageDefault = {
    index: null,
    tmpFname: null,
    tmpSrc: null,
    metadata: {},
    dragStart: false,
    checked: false,
    show:true
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

const filterImageDataBy = ({imageData, fileTypes, fileSizeMin, fileSizeMax, filePatterns}) => {
  const formatFilter = (format) => {
    if(fileTypes.includes('all')) return true;
    return fileTypes.includes(format);
  }
  const sizeFilter = (size) => {console.log(`*****${size}`); return ((fileSizeMin < size) && (size < fileSizeMax));}
  const nameFilter = (name) => {
    console.log(`*****${name}`);
    const blnakRemoved = filePatterns.filter(pattern => pattern !== '');
    if(blnakRemoved.includes('*')) return true;
    const results = blnakRemoved.map(filename => {
      console.log(name)
      console.log(filename)
      return name.includes(filename)
    })
    return results.some(result => result === true);
  }
  const filteredImages = imageData
  .filter(image => formatFilter(image.metadata.format))
  .filter(image => sizeFilter(image.metadata.size))
  .filter(image => nameFilter(image.tmpFname));

  return filteredImages;
}

export const addImageData = (imageInfo) => async (dispatch, getState) => {
    console.log(`#### in addImageData:`, imageInfo)
    const state = getState();
    const {pageIndex} = imageInfo;
    const imageData = state.imageList.pageImages.get(pageIndex) || [];
    const images = [
        ...imageData,
        mkImageItem(imageInfo)
    ]
    dispatch(setPageImages({pageIndex, images}))
}

const initialState = {
    currentTab: 0,
    pageImages: new Map()
}

// reducer
export default handleActions({
    // [ADD_IMAGE_DATA]: (state, action) => {
    //     console.log(state, action)
    //     const imageInfo = action.payload;
    //     const {pageIndex} = imageInfo;
    //     console.log(`*************${imageInfo}`)
    //     const newImageData = [
    //         ...state.imageData,
    //         mkImageItem(imageInfo)
    //     ]
    //     return {
    //         ...state,
    //         imageData: newImageData
    //     }
    // },
    // [SET_IMAGE_DATA]: (state, action) => {
    //     const newImageData = action.payload;
    //     return {
    //         ...state,
    //         imageData: newImageData
    //     }
    // },
    [SET_PAGE_IMAGES]: (state, action) => {
        console.log('%%%%%%%%%%%%%%%%', action.payload);
        const {pageIndex, images} = action.payload;
        const pageImages = new Map(state.pageImages);
        pageImages.set(pageIndex, images);
        return {
            ...state,
            pageImages
        }
    },
    [SET_CURRENT_TAB]: (state, action) => {
        const currentTab = action.payload;
        return {
            ...state,
            currentTab
        }
    },
    [FILTER_IMAGES_BY_TYPE]: (state, action) => {
        const {pageIndex, fileTypes} = action.payload;
        const formatFilter = (image) => {
            const {format} = image.metadata;
            if(fileTypes.includes('all')) return {...image, show:true};
            if(fileTypes.includes(format)) return {...image, show:true};
            return {...image, show:false};
        }
        const newImageData = state.pageImages.get(pageIndex).map(image => formatFilter(image));
        const pageImages = new Map(state.pageImages);
        pageImages.set(pageIndex, newImageData);
        return {
            ...state,
            pageImages
        }
    },   
    [FILTER_IMAGES_BY_MINSIZE]: (state, action) => {
        const {pageIndex, fileSizeMin} = action.payload;
        const sizeFilter = image => {
            const {size} = image.metadata;
            const show = (size > fileSizeMin);
            console.log(show, image.show)
            if(image.show === show) return image;
            return {...image, show:!image.show}
        }
        const newImageData = state.pageImages.get(pageIndex).map(image => sizeFilter(image));
        const pageImages = new Map(state.pageImages);
        pageImages.set(pageIndex, newImageData);
        return {
            ...state,
            pageImages
        }
    },
    [FILTER_IMAGES_BY_MAXSIZE]: (state, action) => {
        const {pageIndex, fileSizeMax} = action.payload;
        const sizeFilter = image => {
            const {size} = image.metadata;
            console.log(`*****${size}`); 
            if(size < fileSizeMax) return {...image, show:true};
            return {...image, show:false};
        }
        const newImageData = state.pageImages.get(pageIndex).map(image => sizeFilter(image));
        const pageImages = new Map(state.pageImages);
        pageImages.set(pageIndex, newImageData);
        return {
            ...state,
            pageImages
        }
    },    
    [FILTER_IMAGES_BY_NAME]: (state, action) => {
        const {pageIndex, filePatterns} = action.payload;
        const nameFilter = (image) => {
            const name = image.tmpFname;
            console.log(`*****${name}`);
            const blnakRemoved = filePatterns.filter(pattern => pattern !== '');
            if(blnakRemoved.includes('*')) return {...image, show:true};
            const results = blnakRemoved.map(filename => {
              console.log(name)
              console.log(filename)
              return name.includes(filename)
            })
            if(results.some(result => result === true)) return {...image, show:true};
            return {...image, show:false};
        }
        const newImageData = state.pageImages.get(pageIndex).map(image => nameFilter(image));
        const pageImages = new Map(state.pageImages);
        pageImages.set(pageIndex, newImageData);
        return {
            ...state,
            pageImages
        }
    },        
}, initialState);