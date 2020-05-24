import {remote} from 'electron';
import path from 'path';

const app = remote.app;
const homeDir = app.getPath('home');

const trackDefault = { 
    contentTypes: ['image','jpg'],
    contentSizeMin: 102400,
    contentSizeMax: 10240000,
    urlPatterns: ['*']
}


const defaultOptions = {
    homeUrl: 'https://www.google.com',
    saveDir: path.join(homeDir, 'save'),
    tempDir: path.join(homeDir, 'temp'),
    deleteOnClose: 'YES',
    deleteOnStart: 'YES',
    deleteAfterSave: 'YES',
    ...trackDefault
}


export default defaultOptions;