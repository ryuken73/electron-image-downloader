import React, { Component } from 'react';
import BorderedBox from '../template/BorderedBox';
import Box from '@material-ui/core/Box';
import SavePanelContainer from '../../containers/SavePanelContainer';
import ImageTabsContainer from '../../containers/ImageTabsContainer';
import SectionWithFullHeight from '../template/SectionWithFullHeight';

export default class ImageBox extends Component {
    render() {
        return (
            <Box className="ImageBox" display="flex" flexDirection="column" flexGrow="1">
                <SavePanelContainer></SavePanelContainer>
                <ImageTabsContainer></ImageTabsContainer>
            </Box>
        )
    } 
}
