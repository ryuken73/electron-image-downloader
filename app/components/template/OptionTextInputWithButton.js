import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import BorderedList from './BorderedList';
import {SmallMarginTextField} from './smallComponents';


export default function OptionTextInputWithButton(props) {
    const {subTitle, width, value, onChangeText, titlewidth="20%", iconButton} = props;
    console.log(iconButton)
    const optionText = {
        title: <Typography variant="body1">{subTitle}</Typography>,
        content:  (
            <Box display="flex" width={width}>
                <SmallMarginTextField 
                    variant="outlined"
                    margin="dense"
                    value={value}
                    onChange={onChangeText}                        
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
