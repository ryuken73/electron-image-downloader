import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import OpenInBrowserTwoToneIcon from '@material-ui/icons/OpenInBrowserTwoTone';
import {SmallMarginTextField, SmallPaddingIconButton} from '../../template/smallComponents';
import ToggleImageButton from '../../template/ToggleImageButton';


export default function NavigatorPanel(props) {
    console.log('re-render NavigatorPanel:',props);
    const {launchUrl="https://www.daum.net", tracking, launched=false} = props;
    const {setURL, launchBrowserAsync, toggleTrackAsync} = props.NavigatorActions;
    const trackMode = tracking ? "ON_RECORDING" : "OFF_RECORDING";
    const urlInputDisabled = launched ? true : false;
    const launchIconDiabled = launched ? true : false;
    const launchIconMode = launched ? 'disabled' : 'primary';

    const onChange = (event) => {
        console.log(event.target.value)
        setURL(event.target.value)
    }
    const onClickLaunch = (event) => {
        console.log('launch brwoser clicked');
        launchBrowserAsync();
    }
    const onClickTrack = (event) => {
        console.log('track button clicked');
        toggleTrackAsync();
    }
    return (
        <Box display="flex" flexDirection="row" alignItems="center" width={1} alignContent="center"> 
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
                value={launchUrl}
                onChange={onChange}
                disabled={urlInputDisabled}
            >
            </SmallMarginTextField>     
            <SmallPaddingIconButton 
                onClick={onClickLaunch} 
                aria-label="launch"
                disabled={launchIconDiabled} 
            >
                <OpenInBrowserTwoToneIcon color={launchIconMode} fontSize="small" />
            </SmallPaddingIconButton>       
            <ToggleImageButton
                mode={trackMode}
                onClick={onClickTrack}
            ></ToggleImageButton>
        </Box>
    )
}
