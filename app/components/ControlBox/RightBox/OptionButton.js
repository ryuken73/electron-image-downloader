import React from 'react';
import Button from '@material-ui/core/Button';
import utils from '../../../utils';
import defaultOptions from '../../../config/options'; 
import mkOptionStore from '../../../config/getOption'; 



const DEFAULT_OPTIONS = {...defaultOptions};

const getOptionsFromLocalStorage = () => {
    const storageType = 'localStorage';
    const optionProvider = utils.browserStorage.storageAvailable(storageType) ? utils.browserStorage : new Map();
    const getOption = mkOptionStore(DEFAULT_OPTIONS, optionProvider); 
    const homeUrl = getOption('homeUrl');
    const saveDir = getOption('saveDir');
    const tempDir = getOption('tempDir');
    const deleteOnClose = getOption('deleteOnClose');
    const deleteOnStart = getOption('deleteOnStart');
    const deleteAfterSave = getOption('deleteAfterSave');

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
