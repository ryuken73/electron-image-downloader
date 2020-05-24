import React from 'react';
import Button from '@material-ui/core/Button';
import {optionProvider} from '../../../modules/navigator';

const getOptionsFromLocalStorage = () => {
    const homeUrl = optionProvider.get('homeUrl');
    const saveDir = optionProvider.get('saveDir');
    const tempDir = optionProvider.get('tempDir');
    const deleteOnClose = optionProvider.get('deleteOnClose');
    const deleteOnStart = optionProvider.get('deleteOnStart');
    const deleteAfterSave = optionProvider.get('deleteAfterSave');
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
