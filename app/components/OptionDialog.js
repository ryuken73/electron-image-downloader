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

export default function OptionDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDeleteOnCloseChange = () => {};
  const deleteOnClose = () => {};
  const disabled = false;

  const DeleteOnTabClose = {
    title: <Typography variant="body1">delete images when tab closed</Typography>,
    content: (
        <React.Fragment>
            <FormControl component="fieldset">
                <RadioGroup aria-label="deleteOnClose" name="trackindeleteOnClosegTab" onChange={onDeleteOnCloseChange} value={deleteOnClose}>
                    <Box display="flex">
                        <SmallPaddingFormControlLabel disabled={disabled} value={true} control={<Radio />} label="YES" />
                        <SmallPaddingFormControlLabel disabled={disabled} value={false} control={<Radio />} label="NO" />
                    </Box>
                </RadioGroup>
            </FormControl>
        </React.Fragment>
    )
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
    <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
    <DialogContent dividers={scroll === 'paper'}>
      <DialogContentText
        id="scroll-dialog-description"
        tabIndex={-1}
      >
        <Box flexBasis="80px" textAlign="center">
            <Typography 
                variant="body1"
            >주소:</Typography>
        </Box>
        <SmallMarginTextField
            variant="outlined"
            margin="dense"
            pt="10px"
            pb="10px"
            autoFocus
            fullWidth
            placeholder="https://naver.com"
            value="default url"
            // onChange={onChange}
            // disabled={urlInputDisabled}
        >
        </SmallMarginTextField>  
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
