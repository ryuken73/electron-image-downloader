import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import LeftBox from './LeftBox';
import RightBox from './RightBox';

export default class ControlBox extends Component {
    render() {
        return (
            <Box 
                className="ControlBox" 
                display="flex" 
                flexDirection="row" 
                height={1} 
                // width={1}
                minWidth="fit-content"
                mt="3px"
                mx="3px"
                overflow="hidden"
            >
                <LeftBox></LeftBox>
                <RightBox></RightBox>
            </Box>
        )
    }
}
  