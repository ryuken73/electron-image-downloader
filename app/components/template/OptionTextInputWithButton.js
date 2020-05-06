import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import BorderedList from './BorderedList';
import {SmallMarginTextField} from './smallComponents';


export default function OptionTextInputWithButton(props) {
    const {subtitle, width, value, titlewidth="20%", iconButton} = props;
    console.log(iconButton)
    const optionText = {
        title: <Typography component={'span'} variant="body1">{subtitle}</Typography>,
        content:  (
            <Box display="flex" width={width}>
                <SmallMarginTextField 
                    variant="outlined"
                    margin="dense"
                    value={value}
                    {...props}
                ></SmallMarginTextField> 
                {iconButton}
            </Box>
        )
    }
    return (
        <BorderedList 
            title={optionText.title} 
            titlewidth={titlewidth}
            content={optionText.content}
            {...props}
        ></BorderedList>
    )
}
