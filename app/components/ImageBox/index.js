import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import SavePanelContainer from '../../containers/SavePanelContainer';
import ImageTabsContainer from '../../containers/ImageTabsContainer';
import MessagePanelContainer from '../../containers/MessagePanelContainer';

export default class ImageBox extends Component {
    render() {
        return (
            <Box className="ImageBox" display="flex" flexDirection="column" flexGrow="1" px="3px">
                <SavePanelContainer></SavePanelContainer>
                <ImageTabsContainer></ImageTabsContainer>
                <MessagePanelContainer></MessagePanelContainer>
            </Box>
        )
    } 
}
