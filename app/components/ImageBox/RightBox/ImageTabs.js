import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import BorderedBox from '../../template/BorderedBox';
// import ImageListPanel from './ImageListPanel';
import ImageListContainer from '../../../containers/ImageListContainer';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
    //  max-width: 100%;
    // min-width: 900px;
`
const StyledTab = styled(Tab)`
    min-width: unset;
`

function TabPanel(props){
    console.log('render TabPanel:', props)
    const {value, index} = props;
    const hidden = (value === index) ? false : true;
    return (
        <ImageListContainer
            pageIndex = {index}
            hidden = {hidden}
        >
        </ImageListContainer>
    )
}


function ImageTabs(props) { 
    console.log('!!!!!!!!!!!!!!!',props);
    
    const {currentTab, pageImages, pageTitles} = props;
    const {setCurrentTab} = props.ImageActions;
    // const onChange = (event, newValue) => {
    //     setCurrentTab(newValue)
    // };
    const onChange = React.useCallback((event, newValue) => {
        setCurrentTab(newValue);
    }, [setCurrentTab]);

    return (
        <BorderedBox  alignContent="center" alignItems="flex-start" flexGrow="1" minWidth="auto" flexBasis="0" overflow="auto">
            <BorderedBox display='flex' alignContent="center" alignItems="flex-start" flexGrow="1" border="1" minWidth="auto" flexBasis="0" overflow="hidden">
                <StyledAppBar position="static" color="default">
                    <Tabs
                        value={currentTab}
                        onChange={onChange}
                        indicatorColor="primary"
                        variant="scrollable"
                        scrollButtons="on"
                        aria-label="scrollable auto tabs"
                    >
                        {[...pageTitles].map(pageTitle => {
                            const [pageIndex, title] = pageTitle;
                            const imageData = pageImages.get(pageIndex) || [];
                            const imageCount = imageData.length || 0;
                            return <StyledTab key={pageIndex} value={pageIndex} label={(title || 'new') + ` [${imageCount}]`} aria-controls={`tabpanel-${pageIndex}`}></StyledTab>                      
                        })}

                    </Tabs>
                </StyledAppBar>
            </BorderedBox>
            {[...pageImages].map(pageImage => {
                const [pageIndex, imageData] = pageImage;
                return <TabPanel value={currentTab} key={pageIndex} index={pageIndex}  {...props} imageData={imageData}></TabPanel>                 

            }
            )}
        </BorderedBox>
        )
}

export default React.memo(ImageTabs);
