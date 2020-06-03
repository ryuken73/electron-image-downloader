import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import BorderedList from '../../template/BorderedList';
import {SmallMarginTextField, SmallPaddingSelect}  from '../../template/smallComponents';
import OptionSelectList from '../../template/OptionSelectList';

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

    const optionTextMatching = {
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
            <Box m="5px">
                <Typography variant="body1">Display Filter</Typography>
            </Box> 
            <OptionSelectList 
                subtitle='File-Type'
                minWidth='300px'
                fileTypes={fileTypes}
                menuItems={[
                    {value:'all', label:'*'},
                    {value:'jpeg', label:'jpg'},
                    {value:'png', label:'png'},
                    {value:'gif', label:'gif'}
                ]}
                onChangeSelect={onChange('fileTypes')} 
                smallComponent={true}
            ></OptionSelectList>
            <BorderedList 
                title={optionFileSize.title} 
                content={optionFileSize.content} 
                mb={0}
            ></BorderedList>
            <BorderedList 
                title={optionTextMatching.title} 
                content={optionTextMatching.content}
            ></BorderedList>
            {/* <OptionTextInput 
                subtitle='Name-Pattern'
                width='120px'
                value={filePatterns}
                onChange={onChange('filePatterns')}            
            ></OptionTextInput> */}
        </Box>
    )
}
