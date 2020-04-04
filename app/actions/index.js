import * as types from './ActionTypes';

export const changeUrl = (url) => ({
    type: types.CHANGE_URL,
    url: url
});