import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import BorderedBox from '../../template/BorderedBox';
import TrackFilterContainer from '../../../containers/TrackFilterContainer';
import DisplayFilterContainer from '../../../containers/DisplayFilterContainer';
import SectionWithFullHeight from '../../template/SectionWithFullHeight';

export default class LeftBox extends Component {
    render() {
        return (
            <SectionWithFullHeight width="50%">
                <Box display="flex">
                    <BorderedBox display="flex" alignContent="center" flexGrow="1" width={0.5}>
                        <TrackFilterContainer></TrackFilterContainer>
                    </BorderedBox>
                    <BorderedBox display="flex" alignContent="center" flexGrow="1" width={0.5}>
                        <DisplayFilterContainer></DisplayFilterContainer>
                    </BorderedBox>
                </Box>
            </SectionWithFullHeight>     
        )
    } 
}  