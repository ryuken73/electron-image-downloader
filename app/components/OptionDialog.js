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


export default function OptionDialog(props) {
  // const [open, setOpen] = React.useState(true);
  const {dialogOpen, homeUrl, saveDir, tempDir} = props;
  const {deleteOnClose, deleteOnStart, deleteAfterSave} = props;
  const {setDialogOpen, setHomeUrl, setSaveDir, setTempDir} = props.OptionDialogActions;
  const {setDeleteOnClose, setDeleteOnStart, setDeleteAfterSave} = props.OptionDialogActions;
  const [scroll, setScroll] = React.useState('paper');
  const {defaultUrl='https://www.naver.com', saveDirectory='c:/image', tempDirectory='c:/temp'} = props;
  const {deleteWhenClosed='yes', deleteWhenStarted='yes', deleteWhenSaved='yes'} = props;
  const INPUT_WIDTH='400px'
  const SUBTITLE_WIDTH='25%';


  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const onDeleteOnCloseChange = () => {};
  const onClickSelectSaveDirectory = () => {};
  const onClickSelectTempDirectory = () => {};

  const SaveDirectoryButton =
   (<SmallPaddingIconButton 
        onClick={onClickSelectSaveDirectory} 
        aria-label="select save directory button"
      >
        <FolderIcon fontSize="small" />
    </SmallPaddingIconButton>)


  const TempDirectoryButton = 
     (<SmallPaddingIconButton 
        onClick={onClickSelectTempDirectory} 
        aria-label="select temp directory button"
      >
        <FolderIcon fontSize="small" />
    </SmallPaddingIconButton>)

  
  

  const disabled = false;
  const boolLabels = [
    {value: true, label: 'YES'},
    {value: false, label: 'NO'}
  ]

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth
    >
    <DialogTitle id="scroll-dialog-title">Image Downloader Options</DialogTitle>
    <DialogContent dividers={scroll === 'paper'}>
      <DialogContentText
        id="scroll-dialog-description"
        tabIndex={-1}
      >
        <OptionTextInput subTitle='Home Address' bgcolor='white' subTitleWidth={SUBTITLE_WIDTH} inputWidth={INPUT_WIDTH} value={homeUrl}></OptionTextInput>
        <OptionTextInput subTitle='Save Directory' subTitleWidth={SUBTITLE_WIDTH} inputWidth={INPUT_WIDTH} value={saveDir} iconButton={SaveDirectoryButton}></OptionTextInput>
        <OptionTextInput subTitle='Temp Directory' subTitleWidth={SUBTITLE_WIDTH} inputWidth={INPUT_WIDTH} value={tempDir} iconButton={TempDirectoryButton}></OptionTextInput>
        <OptionRadioButton subTitle="Delete on tab close" titlewidth={SUBTITLE_WIDTH} currentValue={deleteOnClose} formLabels={boolLabels}></OptionRadioButton>
        <OptionRadioButton subTitle="Delete on startup" titlewidth={SUBTITLE_WIDTH} currentValue={deleteOnStart} formLabels={boolLabels}></OptionRadioButton>
        <OptionRadioButton subTitle="Delete after save file" titlewidth={SUBTITLE_WIDTH} currentValue={deleteAfterSave} formLabels={boolLabels}></OptionRadioButton>
        
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleClose} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
  )
}
