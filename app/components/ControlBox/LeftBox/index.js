import React, { Component } from 'react';
import BorderedBox from '../../template/BorderedBox';
import NavigatorContainer from '../../../containers/NavigatorContainer';
// import Navigator from './Navigator';
// import FilterPanel from '../control/FilterPanel';
import BrowserOptions from './BrowserOptions';
import SectionWithFullHeight from '../../template/SectionWithFullHeight';

export default class LeftBox extends Component {
    render() {
        return (
            <SectionWithFullHeight width="10%" flexGrow="0" flexShrink="0" >
                <BorderedBox display="flex" alignContent="center" flexGrow="1">
                    <NavigatorContainer></NavigatorContainer>
                </BorderedBox>
                <BorderedBox display="flex" alignItems="center" flexGrow="1">
                    <BrowserOptions></BrowserOptions>
                </BorderedBox>
            </SectionWithFullHeight>
        )
    }
}
  