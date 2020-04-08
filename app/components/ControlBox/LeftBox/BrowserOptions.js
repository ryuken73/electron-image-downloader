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
    console.log(props)
    const {width=800, height=600, trackingTab="all"} = props;
    const {setBrowserWidth, setBrowserHeight, setTrackingTab} = props.BrowserOptionsActions

    const onWidthChange = (event) => {
        setBrowserWidth(event.target.value);
    }
    const onHeightChange = (event) => {
        setBrowserHeight(event.target.value);
    }
    const onTrackingChange = (event) => {
        setTrackingTab(event.target.value);
    }

    const optionViewPort = {
        title: <Typography variant="body1">Viewport Size</Typography>,
        content: (
            <React.Fragment>
                <Box width="100px">
                    <SmallMarginTextField
                        variant="outlined"
                        margin="dense"
                        value={width}
                        onChange={onWidthChange}
                    ></SmallMarginTextField>
                </Box>
                <Box width="20px" textAlign="center">
                    <Typography variant="body1">{" X "}</Typography>
                </Box>
                <Box width="100px">
                    <SmallMarginTextField
                        variant="outlined"
                        margin="dense"
                        value={height}
                        onChange={onHeightChange}
                        ></SmallMarginTextField>
                </Box> 
            </React.Fragment>   
        )
    }
    
    const optionNewWindow = {
        title: <Typography variant="body1">Tracking Tab</Typography>,
        content: (
            <React.Fragment>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="trackingTab" name="trackingTab" onChange={onTrackingChange} value={trackingTab}>
                        <Box display="flex">
                            <SmallPaddingFormControlLabel value="all" control={<Radio />} label="ALL" />
                            <SmallPaddingFormControlLabel value="initial" control={<Radio />} label="INITIAL" />
                        </Box>
                    </RadioGroup>
                </FormControl>
            </React.Fragment>
        )
    }

    return (
        <Box display="flex" flexDirection="column" width={1}> 
            <Typography variant="body1">Browser Options</Typography>
            <BorderedList 
                title={optionViewPort.title} 
                content={optionViewPort.content} 
                mb={0}
            ></BorderedList>
            <BorderedList 
                title={optionNewWindow.title} 
                content={optionNewWindow.content}
            ></BorderedList>          
        </Box>
    )
}
