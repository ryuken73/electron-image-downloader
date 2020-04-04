import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import OpenInBrowserTwoToneIcon from '@material-ui/icons/OpenInBrowserTwoTone';
import {SmallMarginTextField, SmallPaddingIconButton} from '../../template/smallComponents';
import ToggleImageButton from '../../template/ToggleImageButton';


export default function NavigatorPanel(props) {
    console.log(props);
    const {launchUrl="https://www.daum.net"} = props;
    const {changeUrl} = props;
    const onChange = (event) => {
        console.log(event.target.value)
        changeUrl(event.target.value)
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
            >
            </SmallMarginTextField>     
            <SmallPaddingIconButton aria-label="launch">
                <OpenInBrowserTwoToneIcon color="primary" fontSize="small" />
            </SmallPaddingIconButton>       
            <ToggleImageButton></ToggleImageButton>
        </Box>
    )
}
