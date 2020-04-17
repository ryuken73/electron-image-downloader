import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import BorderedBox from '../../template/BorderedBox';
import ImageListPanel from './ImageListPanel';
import { Typography } from '@material-ui/core';

function TabPanel(props){
    const {children, value, index} = props;
    return (
        <Typography
            hidden={value !== index}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    )
}


export default function ImageTabs() {
    const [tabId, setTabId] = React.useState(0)
    const onChange = (event, newValue) => {
        setTabId(newValue)
    };
    return (
        <BorderedBox display="flex" alignContent="center" alignItems="flex-start" flexGrow="1" minWidth="auto" flexBasis="0" overflow="auto">

            <AppBar position="static" color="default">
                <Tabs
                    value={tabId}
                    tabId={tabId}
                    onChange={onChange}
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs"
                >
                    <Tab label="Item one" aria-controls='tabpanel-0'></Tab>
                    <Tab label="Item two" aria-controls='tabpanel-1'></Tab>

                </Tabs>
                <TabPanel value={tabId} index={0}>Item one</TabPanel>
                <TabPanel value={tabId} index={1}>Item two</TabPanel>              
            </AppBar>
        </BorderedBox>
        )
}
