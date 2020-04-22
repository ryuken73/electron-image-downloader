import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import BorderedBox from '../../template/BorderedBox';
import ImageListPanel from './ImageListPanel';
import { Typography } from '@material-ui/core';

function TabPanel(props){
    console.log('render TabPanel:', props)
    const {value, index, imageData} = props;
    const hidden = (value === index) ? false : true;
    return (
        <ImageListPanel
            pageIndex = {index}
            {...props}
            hidden = {hidden}
            imageData = {imageData}
        >
        </ImageListPanel>
        // <Typography
        //     component="div"
        //     role="tabpanel"
        //     hidden={value !== index}
        // >
        //     {value === index && <Box p={3}>
        //         {imageData.map(child => <p>{child.tmpFname}</p>)}
        //     </Box>}
        // </Typography>
    )
}


function ImageTabs(props) { 
    console.log('!!!!!!!!!!!!!!!',props);
    
    const {currentTab, pageImages} = props;
    const {setCurrentTab} = props.ImageActions;
    const onChange = (event, newValue) => {
        setCurrentTab(newValue)
    };
    return (
        <BorderedBox  alignContent="center" alignItems="flex-start" flexGrow="1" minWidth="auto" flexBasis="0" overflow="auto">
            <AppBar position="static" color="default">
                <Tabs
                    value={currentTab}
                    onChange={onChange}
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs"
                >
                    {[...pageImages].map(pageImage => {
                        const pageIndex = pageImage[0];
                        return <Tab label={pageIndex} key={pageIndex} aria-controls={`tabpanel-${pageIndex}`}></Tab>                      
                    })}

                </Tabs>
            </AppBar>
            {[...pageImages].map(pageImage => {
                const [pageIndex, imageData] = pageImage;
                return <TabPanel value={currentTab} key={pageIndex} index={pageIndex}  {...props} imageData={imageData}></TabPanel>                 

            }
            )}
        </BorderedBox>
        )
}

export default React.memo(ImageTabs);
