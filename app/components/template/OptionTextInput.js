import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import BorderedList from './BorderedList';
import {SmallMarginTextField} from './smallComponents';


export default function OptionTextInput(props) {
    const {title, width, value, onChangeText} = props;
    const optionText = {
        title: <Typography variant="body1">{title}</Typography>,
        content:  (
            <Box width={width}>
                <SmallMarginTextField 
                    variant="outlined"
                    margin="dense"
                    value={value}
                    onChange={onChangeText}                        
                ></SmallMarginTextField> 
            </Box>
        )
    }
    return (
        <BorderedList 
            title={optionText.title} 
            content={optionText.content}
        ></BorderedList>
    )
}
