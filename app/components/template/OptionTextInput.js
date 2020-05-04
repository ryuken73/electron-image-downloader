import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import BorderedList from './BorderedList';
import {SmallMarginTextField} from './smallComponents';


export default function OptionTextInput(props) {
    const {subTitle, subTitleWidth:titlewidth="20%", inputWidth:width, value, onChangeText, iconButton} = props;
    const optionText = {
        title: <Typography variant="body1">{subTitle}</Typography>,
        content:  (
            <Box display="flex" width={width}>
                <SmallMarginTextField 
                    variant="outlined"
                    margin="dense"
                    value={value}
                    onChange={onChangeText}   
                    fullWidth                     
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
            border={0}
            {...props}
        ></BorderedList>
    )
}
