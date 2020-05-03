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
import OptionTextInput from '../../template/OptionTextInput';

export default function DisplayFilters(props) {
    const {fileTypes=["all"]} = props;
    const {fileSizeMin=0, fileSizeMax=1024000} = props;
    const {filePatterns} = props;
    const {setFileTypes, setFileSizeMin, setFileSizeMax, setFilePattern} = props.DisplayFilterActions;
    const setFilePatternByArray = (patternString) => {
        const patternArray = patternString.split(',');
        setFilePattern(patternArray);
    }
    const actionFunctions = {
        'fileTypes': setFileTypes,
        'minSize': setFileSizeMin,
        'maxSize': setFileSizeMax,
        'filePatterns': setFilePatternByArray
    }
    const onChange = (type) => {
        return (event) => {
            console.log(event.target.value)
            actionFunctions[type](event.target.value);
        }
    }    
    const optionFileType = {
        title: <Typography variant="body1">File-Type</Typography>,
        content: (
            <React.Fragment>
                <FormControl style={{minWidth:"300px"}}>
                    {/* <InputLabel id="content-type-label">Age</InputLabel> */}
                    <Select
                    labelId="content-type-select-label" 
                    variant="outlined"
                    margin="dense"
                    value={fileTypes}
                    multiple
                    onChange={onChange('fileTypes')}
                    >
                        <MenuItem value={"all"}>*</MenuItem>
                        <MenuItem value={"jpeg"}>jpg</MenuItem>
                        <MenuItem value={"png"}>png</MenuItem>
                        <MenuItem value={"gif"}>gif</MenuItem>
                    </Select>
                </FormControl>
            </React.Fragment>
        )
    }
    
    const optionFileSize = {
        title: <Typography variant="body1">File-Size</Typography>,
        content: (
            <React.Fragment>
                <Box width="120px">
                    <SmallMarginTextField
                        variant="outlined"
                        margin="dense"
                        value={fileSizeMin}                        
                        onChange={onChange('minSize')}
                    ></SmallMarginTextField>
                </Box>
                <Box width="50px" textAlign="center">
                    <Typography variant="body1">{" < Size < "}</Typography>
                </Box>
                <Box width="120px">
                    <SmallMarginTextField
                        variant="outlined"
                        margin="dense"
                        value={fileSizeMax}                        
                        onChange={onChange('maxSize')}                        
                    ></SmallMarginTextField>
                </Box>
            </React.Fragment>
        )
    }
    
    const optionFilePatterns = {
        title: <Typography variant="body1">Name-Pattern</Typography>,
        content: (
            <Box width="120px">
                <SmallMarginTextField 
                    variant="outlined"
                    margin="dense"
                    value={filePatterns}
                    onChange={onChange('filePatterns')}                        
                ></SmallMarginTextField> 
            </Box>
        ) 
    }


    return (
        <Box display="flex" flexDirection="column" width={1}> 
            <Typography variant="body1">Display Filter</Typography>
            <BorderedList 
                title={optionFileType.title} 
                content={optionFileType.content} 
                mb={0}
            ></BorderedList>
            <BorderedList 
                title={optionFileSize.title} 
                content={optionFileSize.content} 
                mb={0}
            ></BorderedList>
            <OptionTextInput 
                title='Name-Pattern'
                width='120px'
                value={filePatterns}
                onChangeText={onChange('filePatterns')}            
            ></OptionTextInput>
        </Box>
    )
}
