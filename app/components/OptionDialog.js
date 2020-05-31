import React from 'react';
import Box from '@material-ui/core/Box';
import {SmallMarginTextField} from './template/smallComponents';
import {SmallPaddingFormControlLabel} from './template/smallComponents';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import OptionTextInput from './template/OptionTextInput';
import OptionRadioButton from './template/OptionRadioButton';
import FolderIcon  from '@material-ui/icons/Folder';
import {SmallPaddingIconButton} from './template/smallComponents';
import utils from '../utils';
import DEFAULT_OPTIONS from '../config/options'; 
import {optionProvider} from '../modules/navigator';

const { dialog } = require('electron').remote;

const INPUT_WIDTH='400px'
const SUBTITLE_WIDTH='25%';

const OptionTextInputWithDefault = props => {
  const {children} = props;
  return <OptionTextInput subTitleWidth={SUBTITLE_WIDTH} inputWidth={INPUT_WIDTH} {...props}>{children}</OptionTextInput>
}

const boolLabels = [
  {value: 'YES', label: 'YES'},
  {value: 'NO', label: 'NO'}
]

const OptionRadioButtonWithDefault = props => {
  const {children} = props;
  return <OptionRadioButton titlewidth={SUBTITLE_WIDTH} formlabels={boolLabels} {...props}>{children}</OptionRadioButton>
}

const setOptionsOnLocalStorage = (options) => {
  const {homeUrl, saveDir, tempDir} = options;
  const {deleteOnClose, deleteOnStart, deleteAfterSave} = options;
  optionProvider.set('homeUrl', homeUrl);
  optionProvider.set('saveDir', saveDir);
  optionProvider.set('tempDir', tempDir);
  optionProvider.set('deleteOnClose', deleteOnClose);
  optionProvider.set('deleteOnStart', deleteOnStart);
  optionProvider.set('deleteAfterSave', deleteAfterSave);
  return true;
} 

export default function OptionDialog(props) {
  // const [open, setOpen] = React.useState(true);
  console.log('######################## re-render OptionDialog', props)
  const {dialogOpen, homeUrl, saveDir, tempDir} = props;
  const {deleteOnClose, deleteOnStart, deleteAfterSave} = props;
  const {setDialogOpen, setHomeUrl, setSaveDir, setTempDir} = props.OptionDialogActions;
  const {setDeleteOnClose, setDeleteOnStart, setDeleteAfterSave, setAllOptions} = props.OptionDialogActions;
  const [scroll, setScroll] = React.useState('paper');

  const actionFunctions = {
    'homeUrl': setHomeUrl,
    'saveDir': setSaveDir,
    'tempDir': setTempDir,
    'deleteOnClose': setDeleteOnClose,
    'deleteOnStart': setDeleteOnStart,
    'deleteAfterSave': setDeleteAfterSave,
  }

  const onChange = type => {
    // console.log(type)
    return event => {
        console.log(type, event.target.value);
        actionFunctions[type](event.target.value);
    }
  }   

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const onClickSelectSaveDirectory = () => {
    dialog.showOpenDialog(({properties:['openDirectory']}), filePaths=> {
      if(filePaths === undefined) return;
      setSaveDir(filePaths[0]);      
    })
  };
 
  const onClickSelectTempDirectory = () => {
    dialog.showOpenDialog(({properties:['openDirectory']}), filePaths=> {
      if(filePaths === undefined) return;
      setTempDir(filePaths[0]);      
    })
  };

  const onClickSaveBtn = () => {
    setOptionsOnLocalStorage(props);
    handleClose();
  }

  const resetOptions = () => {
    setAllOptions(DEFAULT_OPTIONS)
  }

  const SaveDirectoryButton = (
    <SmallPaddingIconButton 
        onClick={onClickSelectSaveDirectory} 
        aria-label="select save directory button"
      >
        <FolderIcon fontSize="small" />
    </SmallPaddingIconButton>)


  const TempDirectoryButton = (
    <SmallPaddingIconButton 
        onClick={onClickSelectTempDirectory} 
        aria-label="select temp directory button"
      >
        <FolderIcon fontSize="small" />
    </SmallPaddingIconButton>)

  return (
    
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth
    >
    <DialogTitle id="scroll-dialog-title">
      Image Downloader Options
    </DialogTitle>
    <DialogContent dividers={scroll === 'paper'}>
      <DialogContentText
        id="scroll-dialog-description"
        tabIndex={-1}
      >
        <OptionTextInputWithDefault subtitle='Home Address' bgcolor='white' textColor="black" value={homeUrl} onChange={onChange('homeUrl')}></OptionTextInputWithDefault>
        <OptionTextInputWithDefault subtitle='Save Directory' bgcolor='white' textColor="black" value={saveDir} onChange={onChange('saveDir')} iconButton={SaveDirectoryButton}></OptionTextInputWithDefault>
        <OptionTextInputWithDefault subtitle='Temp Directory' bgcolor='white' textColor="black" value={tempDir} onChange={onChange('tempDir')} iconButton={TempDirectoryButton}></OptionTextInputWithDefault>
        <OptionRadioButtonWithDefault subtitle="Delete on tab close" bgcolor='white' currentvalue={deleteOnClose} onChange={onChange('deleteOnClose')}></OptionRadioButtonWithDefault>
        <OptionRadioButtonWithDefault subtitle="Delete on startup" bgcolor='white' currentvalue={deleteOnStart} onChange={onChange('deleteOnStart')}></OptionRadioButtonWithDefault>
        <OptionRadioButtonWithDefault subtitle="Delete after save file" bgcolor='white' currentvalue={deleteAfterSave} onChange={onChange('deleteAfterSave')}></OptionRadioButtonWithDefault>
        
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button style={{marginRight:'auto'}} onClick={resetOptions} color="primary">
        Default
      </Button>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onClickSaveBtn} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
  )
}
