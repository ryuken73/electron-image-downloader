import {remote} from 'electron';
import path from 'path';

const app = remote.app;
const homeDir = app.getPath('home');


const defaultOptions = {
    homeUrl: 'https://www.google.com',
    saveDir: path.join(homeDir, 'save'),
    tempDir: path.join(homeDir, 'temp'),
    deleteOnClose: 'YES',
    deleteOnStart: 'YES',
    deleteAfterSave: 'YES' 
}


export default defaultOptions;