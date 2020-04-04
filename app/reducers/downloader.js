import * as types from '../actions/ActionTypes';
const initialState = {
    url: 'https://www.naver.com'
}

function downloader(state=initialState, action){
    switch(action.type){
        case types.CHANGE_URL:
            return {
                ...state,
                url: action.url
            };
        default:
            return state;
    }
};

export default downloader;