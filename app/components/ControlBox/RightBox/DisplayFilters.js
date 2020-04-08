import React from 'react';
import Box from '@material-ui/core/Box';
import BorderdBox from '../../template/BorderedBox';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import BorderedList from '../../template/BorderedList';
import {SmallMarginTextField}  from '../../template/smallComponents';

export default function DisplayFilters(props) {
    const {contentType="imageAll"} = props;
    const {contentSizeMin=0, contentSizeMax=1024000} = props;

    const optionContentType = {
        title: <Typography variant="body1">Content-Type</Typography>,
        content: (
            <React.Fragment>
                <FormControl style={{minWidth:"300px"}}>
                    {/* <InputLabel id="content-type-label">Age</InputLabel> */}
                    <Select
                    labelId="content-type-select-label" 
                    variant="outlined"
                    margin="dense"
                    value={contentType}
                    >
                        <MenuItem value={"imageAll"}>image/*</MenuItem>
                        <MenuItem value={"jpg"}>image/jpeg</MenuItem>
                        <MenuItem value={"png"}>image/png</MenuItem>
                    </Select>
                </FormControl>
            </React.Fragment>
        )
    }
    
    const optionContentSize = {
        title: <Typography variant="body1">Content-Size</Typography>,
        content: (
            <React.Fragment>
                <Box width="120px">
                    <SmallMarginTextField
                        variant="outlined"
                        margin="dense"
                        value={contentSizeMin}
                    ></SmallMarginTextField>
                </Box>
                <Box width="50px" textAlign="center">
                    <Typography variant="body1">{" < Size < "}</Typography>
                </Box>
                <Box width="120px">
                    <SmallMarginTextField
                        variant="outlined"
                        margin="dense"
                        value={contentSizeMax}
                    ></SmallMarginTextField>
                </Box>
            </React.Fragment>
        )
    }
    
    const optionTextMatching = {
        title: <Typography variant="body1">Text-Matching</Typography>,
        content: (
            <Box width="120px">
                <SmallMarginTextField 
                    variant="outlined"
                    margin="dense"
                ></SmallMarginTextField> 
            </Box>
        ) 
    }


    return (
        <Box display="flex" flexDirection="column" width={1}> 
            <Typography variant="body1">Display Filter Options</Typography>
            <BorderedList 
                title={optionContentType.title} 
                content={optionContentType.content} 
                mb={0}
            ></BorderedList>
            <BorderedList 
                title={optionContentSize.title} 
                content={optionContentSize.content} 
                mb={0}
            ></BorderedList>
            <BorderedList 
                title={optionTextMatching.title} 
                content={optionTextMatching.content}
            ></BorderedList>
        </Box>
    )
}
