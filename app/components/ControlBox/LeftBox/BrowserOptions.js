import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {SmallMarginTextField}  from '../../template/smallComponents';
import BorderedList from '../../template/BorderedList';
import {SmallPaddingFormControlLabel} from '../../template/smallComponents';

export default function BrowserOptions(props) {
    const {viewPortWidth=800, viewPortHeight=600} = props;
    const {newWindowsTrack="automatic"} = props;
    const optionViewPort = {
        title: <Typography variant="body1">Viewport Size</Typography>,
        content: (
            <React.Fragment>
                <Box width="100px">
                    <SmallMarginTextField
                        variant="outlined"
                        margin="dense"
                        value={viewPortWidth}
                    ></SmallMarginTextField>
                </Box>
                <Box width="20px" textAlign="center">
                    <Typography variant="body1">{" X "}</Typography>
                </Box>
                <Box width="100px">
                    <SmallMarginTextField
                        variant="outlined"
                        margin="dense"
                        value={viewPortHeight}
                    ></SmallMarginTextField>
                </Box> 
            </React.Fragment>   
        )
    }
    
    const optionNewWindow = {
        title: <Typography variant="body1">New Window</Typography>,
        content: (
            <React.Fragment>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="newWindowTrack" name="newWindowTrack" value={newWindowsTrack}>
                        <SmallPaddingFormControlLabel value="automatic" control={<Radio />} label="automatic track" />
                        <SmallPaddingFormControlLabel value="manual" control={<Radio />} label="manual track" />
                    </RadioGroup>
                </FormControl>
            </React.Fragment>
        )
    }

    return (
        <Box display="flex" flexDirection="column" width={1}> 
            <Typography variant="body1">Browser Options</Typography>
            <BorderedList 
                titleComponent={optionViewPort.title} 
                contentComponent={optionViewPort.content} 
                mb={0}
            ></BorderedList>
            <BorderedList 
                titleComponent={optionNewWindow.title} 
                contentComponent={optionNewWindow.content}
            ></BorderedList>          
        </Box>
    )
}
