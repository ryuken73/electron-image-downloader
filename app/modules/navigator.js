import {createAction, handleActions} from 'redux-actions';

// action types
const SET_URL = 'navigator/SET_URL';
const LAUNCH = 'navigator/LAUNCH';
const TOGGLE_TRACK = 'navigator/TOGGLE_TRACK';

// action creator
export const setURL = createAction(SET_URL);
export const launchBrowser = createAction(LAUNCH);
export const toggleTrack = createAction(TOGGLE_TRACK);

// initial state
const initialState = {
    launchUrl: 'https://www.google.com',
    tracking: false
}

// reducer
export default handleActions({
    [SET_URL] : (state, action) => {
        console.log(state, action)
        const launchUrl = action.payload;
        return {
            ...state,
            launchUrl
        }
    }
}, initialState);