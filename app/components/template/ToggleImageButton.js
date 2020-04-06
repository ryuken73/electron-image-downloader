import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {SmallPaddingIconButton} from './smallComponents';


export default function ToggleImageButton(props) {
  const {mode='OFF_RECORDING', onClick} = props;
  const color = {
    'ON_RECORDING': 'secondary',
    'OFF_RECORDING':'primary'
  }
  return (
      <SmallPaddingIconButton onClick={onClick} aria-label="record">
        <FiberManualRecordIcon color={color[mode]} fontSize="small" />
      </SmallPaddingIconButton>
  )
}
