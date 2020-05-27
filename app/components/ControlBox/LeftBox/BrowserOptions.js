import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {SmallMarginTextField}  from '../../template/smallComponents';
import BorderedList from '../../template/BorderedList';
import OptionRadioButton from '../../template/OptionRadioButton';
import {SmallPaddingFormControlLabel} from '../../template/smallComponents';
import deepPurple from '@material-ui/core/colors/deepPurple';


export default function BrowserOptions(props) {
    console.log(props)
    const {width=800, height=600, trackingTab="all", launched} = props;
    const {setBrowserWidth, setBrowserHeight, setTrackingTab} = props.BrowserOptionsActions
    const disabled = launched;

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
                        disabled={disabled}
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
                        disabled={disabled}
                        onChange={onHeightChange}
                    ></SmallMarginTextField>
                </Box> 
            </React.Fragment>   
        )
    }

    return (
        <Box display="flex" flexDirection="column" width={1}> 
            <Box m="5px">
                <Typography variant="body1">Browser Options</Typography>
            </Box>
            <BorderedList 
                title={optionViewPort.title} 
                content={optionViewPort.content} 
                mb={0}
            ></BorderedList>
            <OptionRadioButton
                subtitle="Tracking New Tab"
                currentValue={trackingTab}
                onRadioChange={onTrackingChange}
                formLabels={[
                    {disabled, value: 'all', label: 'YES'},
                    {disabled, value: 'initial', label: 'NO'}
                ]}
            >
            </OptionRadioButton>
        </Box>
    )
}
