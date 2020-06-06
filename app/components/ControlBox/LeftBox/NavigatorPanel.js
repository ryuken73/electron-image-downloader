import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import OpenInBrowserTwoToneIcon from '@material-ui/icons/OpenInBrowserTwoTone';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {SmallMarginTextField, SmallPaddingIconButton} from '../../template/smallComponents';


export default function NavigatorPanel(props) {
    console.log('re-render NavigatorPanel:',props);
    const {launchUrl="https://www.daum.net", tracking, launched=false} = props;
    const {setURL, launchBrowserAsync, toggleTrackAsync} = props.NavigatorActions;
    const urlInputDisabled = launched ? true : false;
    const launchIconDiabled = launched ? true : false;
    const trackIconDisabled = launched ? false : true;
    const launchIconMode = launched ? 'disabled' : 'secondary';
    const trackIconMode = launched ? tracking ? "secondary" : "primary" : 'disabled';

    React.useEffect(() => {
        launched && toggleTrackAsync();
    },[launched])    

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
            <SmallPaddingIconButton 
                onClick={onClickTrack} 
                aria-label="track"
                disabled={trackIconDisabled} 
            >
                <FiberManualRecordIcon color={trackIconMode} fontSize="small" />
            </SmallPaddingIconButton>                   
        </Box>
    )
}
