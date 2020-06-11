import React from 'react';
import Box from '@material-ui/core/Box';
import BorderedBox from '../../template/BorderedBox';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import SectionWithFullHeightFlex from '../../template/SectionWithFullHeightFlex';
import {SmallButton, SmallMarginTextField} from '../../template/smallComponents'

const { dialog, shell } = require('electron').remote;
const path = require('path');

export default function SavePanel(props) {
    // console.log('######################## re-render SavePenel', props)
    const {deleteAfterSave, closeTabAfterSave, saveDirectory, pageSaveDirectory, currentTab, pageTitles} = props;
    const {setPageSaveDirectory, deleteFilesSelected, saveFilesSelected} = props.SavePanelAction;
    const {setAllImageCheck, setImageShowPreview} = props.ImageListAction;
    const {imageShow, allImageChecked, enableSaveButton, enableDeleteButton} = props;
    const enableSaveAllButton = true;
    const onClickSaveAll = () => {

    }

    React.useEffect(() => {
        const tabTitle = pageTitles.get(currentTab) || '';
        const tabTitleForPath = tabTitle.replace(/[\\/:*?\"<>|]/g,"") || '';
        const newDirectory = path.join(saveDirectory, tabTitleForPath);
        setPageSaveDirectory(newDirectory);
    }, [pageTitles, currentTab])

    // const deleteFilePage = React.useCallback((currentTab) => {
    //     deleteFilesSelected(currentTab);
    // }, currentTab)
    const deleteFilePage = pageIndex => () => {
        deleteFilesSelected(pageIndex);
    }

    const onSaveDirectoryChange = (event) => {
        setPageSaveDirectory(event.target.value)
    }

    const onClickSelectSaveDirectory = () => {
        dialog.showOpenDialog(({properties:['openDirectory']}), filePaths=> {
          if(filePaths === undefined) return;
          setPageSaveDirectory(filePaths[0]);      
        })
    };
    
    const onClickLocateDirectory = () => {
        shell.openItem(pageSaveDirectory);
    }
    const onClickSetAllChecked = (event) => {
        setAllImageCheck(true);
    }

    const onClickSetAllUnChecked = (event) => {
        setAllImageCheck(false);
    }

    const onClickSavelAllChecked = pageIndex => event => {
        saveFilesSelected(pageIndex);
    }

    const onClickCheckBox = event => {
        setImageShowPreview()
    }

    return (
        <SectionWithFullHeightFlex className="SectionWithFullHeightFlex ImageBox" flexGrow="0" width="1" overflow="hidden">
            <BorderedBox display="flex" alignContent="center" flexGrow="1">
                <Box bgcolor="darkslateblue" display="flex" flexDirection="row" width="1" textAlign={"center"}>
                    <Box display="flex" width="0.5" justifyContent="space-around" alignItems="center" flexShrink="0" flexDirection="row">
                        <Box minWidth="100px">
                            <Typography variant={"body1"}>Save Directory</Typography>
                        </Box>
                        <SmallMarginTextField
                            variant="outlined"
                            margin="dense"
                            value={pageSaveDirectory}
                            onChange={onSaveDirectoryChange}
                            pt="8px"
                            pb="8px"
                            fullWidth
                        ></SmallMarginTextField>
                        <Box >
                            <SmallButton size="small" color="primary" variant={"contained"} onClick={onClickSelectSaveDirectory}>Choose</SmallButton>
                        </Box>
                        <Box >
                            <SmallButton size="small" style={{marginLeft:'0px'}} color="primary" variant={"contained"} onClick={onClickLocateDirectory}>Locate</SmallButton>
                        </Box>
                    </Box>
                    <Box display="flex" width="0.1" justifyContent="center" alignItems="center">
                        <Checkbox color="primary" checked={imageShow} onChange={onClickCheckBox}>Image Show</Checkbox>
                        <Typography variant="caption">Image Show</Typography>
                    </Box>
                    <Box display="flex" ml="auto" justifyContent="space-around" alignItems="center" flexShrink="0" flexDirection="row" >
                        <SmallButton disabled={!enableSaveAllButton} size="small" color="primary" variant={"contained"} onClick={onClickSaveAll}>Save All Tabs</SmallButton>
                        {!allImageChecked && <SmallButton size="small" color="primary" variant={"contained"} onClick={onClickSetAllChecked} > Select All </SmallButton>}
                        {allImageChecked && <SmallButton size="small" color="default" variant={"contained"} onClick={onClickSetAllUnChecked} >UnSelect All</SmallButton>}
                        <SmallButton disabled={!enableSaveButton} size="small" color="primary" variant={"contained"} onClick={onClickSavelAllChecked(currentTab)}>Save Selected</SmallButton>
                        <SmallButton disabled={!enableDeleteButton} size="small" color="secondary" variant={"contained"} onClick={deleteFilePage(currentTab)}>Delete Selected</SmallButton>
                    </Box>            
                </Box>
            </BorderedBox>
        </SectionWithFullHeightFlex>
    )
}
