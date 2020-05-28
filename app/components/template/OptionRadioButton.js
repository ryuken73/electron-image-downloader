import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import BorderedList from './BorderedList';
import {SmallPaddingFormControlLabel} from './smallComponents';


export default function OptionRadioButton(props) {
    const {subtitle, currentValue, onRadioChange, titlewidth="20%"} = props;
    const {formLabels} = props;
    const optionRadio = {
        title: <Typography component={'span'} variant="body1">{subtitle}</Typography>,
        content:  (
            <React.Fragment>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="radioButton" name="radioButton" onChange={onRadioChange} value={currentValue}>
                        <Box display="flex">
                            {formLabels.map((formLabel,index)=> {
                                const {disabled, value, label} = formLabel;
                                return <SmallPaddingFormControlLabel key={index} disabled={disabled} value={value} control={<Radio />} label={label} />
                            })}
                        </Box>
                    </RadioGroup>
                </FormControl>
            </React.Fragment>
        )
    }
    return (
        <BorderedList 
            title={optionRadio.title} 
            titlewidth={titlewidth}
            content={optionRadio.content} 
            border={1}
        ></BorderedList>
    )
}
