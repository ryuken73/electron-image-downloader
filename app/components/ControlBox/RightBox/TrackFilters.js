import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import BorderedList from '../../template/BorderedList';
import {SmallMarginTextField, SmallPaddingSelect}  from '../../template/smallComponents';

export default function FilterPanel(props) {
    const {contentTypes=['image', 'jpg']} = props;
    const {contentSizeMin=1024, contentSizeMax=10240000} = props;
    const {urlPatterns=['*']} = props;
    const {tracking} = props;
    const disabled = tracking;
    const {setContentTypes, setContentSizeMin, setContentSizeMax, setUrlPattern} = props.TrackFilterActions;
    const setUrlPatternByArray = (patternString) => {
        const patternArray = patternString.split(',');
        setUrlPattern(patternArray);
    }
    const actionFunctions = {
        'contentTypes': setContentTypes,
        'minSize': setContentSizeMin,
        'maxSize': setContentSizeMax,
        'urlPatterns': setUrlPatternByArray
    }
    const onChange = (type) => {
        return (event) => {
            actionFunctions[type](event.target.value);
        }
    }

    const optionContentType = {
        title: <Typography variant="body1">Content-Type</Typography>,
        content: (
            <React.Fragment>
                <FormControl style={{minWidth:"300px"}}>
                    <SmallPaddingSelect
                        labelId="content-type-select-label" 
                        variant="outlined"
                        margin="dense"
                        value={contentTypes}
                        onChange={onChange('contentTypes')}
                        multiple
                        disabled={disabled}
                    >
                        <MenuItem value={"image"}>image/*</MenuItem>
                        <MenuItem value={"jpg"}>image/jpeg</MenuItem>
                        <MenuItem value={"png"}>image/png</MenuItem>
                    </SmallPaddingSelect>
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
                        disabled={disabled}
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
                        value={contentSizeMax}
                        disabled={disabled}
                        onChange={onChange('maxSize')}
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
                    value={urlPatterns.join(',')}
                    disabled={disabled}
                    onChange={onChange('urlPatterns')}
                ></SmallMarginTextField> 
            </Box>
        ) 
    }


    return (
        <Box display="flex" flexDirection="column" width={1}>
            <Box m="5px">
                <Typography variant="body1">Tracking Filter</Typography>
            </Box> 
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
