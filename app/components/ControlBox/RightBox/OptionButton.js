import React from 'react';
import Button from '@material-ui/core/Button';
import utils from '../../../utils';
import options from '../../../config/options'; 


const DEFAULT_OPTIONS = {...options};

const getOptionsFromLocalStorage = () => {
    const storageType = 'localStorage';
    const LOCAL_STORAGE_AVAILABLE = utils.browserStorage.storageAvailable(storageType);
    if(!LOCAL_STORAGE_AVAILABLE) return DEFAULT_OPTIONS;  
    // utils.browserStorage.use(storageType);
    const homeUrl = utils.browserStorage.get('homeUrl') || DEFAULT_OPTIONS.homeUrl;
    const saveDir = utils.browserStorage.get('saveDir') || DEFAULT_OPTIONS.saveDir;
    const tempDir = utils.browserStorage.get('tempDir') || DEFAULT_OPTIONS.tempDir;
    const deleteOnClose = utils.browserStorage.get('deleteOnClose') || DEFAULT_OPTIONS.deleteOnClose;
    const deleteOnStart = utils.browserStorage.get('deleteOnStart') || DEFAULT_OPTIONS.deleteOnStart;
    const deleteAfterSave = utils.browserStorage.get('deleteAfterSave') || DEFAULT_OPTIONS.deleteAfterSave;
    return {homeUrl, saveDir, tempDir, deleteOnClose, deleteOnStart, deleteAfterSave};
} 

export default function OptionButton(props) {
    const {setDialogOpen, setAllOptions} = props.OptionDialogActions;
    const onClickOptionsBtn = () => {
        const optionsSaved = getOptionsFromLocalStorage();
        console.log(optionsSaved);
        setAllOptions(optionsSaved);
        setDialogOpen(true);
    }
    return (
        <Button fullWidth onClick={onClickOptionsBtn}>Options</Button> 
    )
}
