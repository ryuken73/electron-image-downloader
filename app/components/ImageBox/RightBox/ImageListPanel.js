import React from 'react';
import ImageCard from './ImageCard';
import { ReactSortable } from "react-sortablejs";
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import SectionWithFullHeightFlex from '../../template/SectionWithFullHeightFlex';
import BorderedBox from '../../template/BorderedBox';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import path from 'path';

const StyledReactSortable = styled(ReactSortable)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  overflow: auto;
`;

const onEnd = (evt) => {
  console.log(evt.item)
}

const toggleCheck = () => {};

const firsttElement = array => array[0];
const lastElement = array => array[array.length - 1];


function ImageCardContainer(props) {
  // const [state, setState] = React.useState(imageData);
  const {pageIndex, imageData, hidden} = props;
  console.log('&&&&&&&&&&&&&&&&&&&&&', hidden, imageData)
  const {fileTypes, fileSizeMin, fileSizeMax, filePatterns} = props;
  const {imagePreviewOpen, imagePreviewSrc} = props;
  const {imageShow, imagePreviewSrcIndex, imagePreviewSrcName} = props;
  const {setImageToggleChecked} = props.ImageActions;
  const {filterImageByType, filterImageByMinSize} = props.ImageActions;
  const {filterImageByMaxSize, filterImageByName} = props.ImageActions;
  const {setImagePreviewOpen, setImagePreviewSrc} = props.ImageActions;
  const {setNextImage, setPrevImage} = props.ImageActions;
  const {delImage} = props.ImageActions;
  const onStart = () => {};

  const RIGHT_KEY = 39;
  const LEFT_KEY = 37;
  const ESCAPE_KEY = 27;
  const DELETE_KEY = 46;

  React.useEffect(() => {
    filterImageByType({pageIndex, fileTypes})
  },[fileTypes])
  
  React.useEffect(() => {
    filterImageByMinSize({pageIndex, fileSizeMin})
  },[fileSizeMin])

  React.useEffect(() => {
    filterImageByMaxSize({pageIndex, fileSizeMax})
  },[fileSizeMax])
  
  React.useEffect(() => {
    filterImageByName({pageIndex, filePatterns})
  },[filePatterns])

  const handleClose = () => {
    setImagePreviewOpen(false);
  }

  const handleKeyDown = (event) => {
    const key = event.keyCode;
    console.log(key)
    key === RIGHT_KEY && setNextImage();
    key === LEFT_KEY && setPrevImage();
    key === ESCAPE_KEY && handleClose();
    key === DELETE_KEY && delCurrentImage();
  }

  const delCurrentImage = () => {
    delImage(imagePreviewSrcIndex);
    setNextImage();
  }

  return (
    <BorderedBox display={hidden ? 'none':'flex'} alignContent="center" alignItems="flex-start" flexGrow="1" border="0" minWidth="auto" flexBasis="0" overflow="auto" bgcolor="black">
      <Box display="flex" flexDirection="row" flexWrap="wrap" width={1} overflow="auto">
        {imageData.map(image => (
          <ImageCard 
            key={image.index} 
            order={image.index} 
            image={image} 
            delImage={delImage}
            setImageToggleChecked={setImageToggleChecked}
            setImagePreviewOpen={setImagePreviewOpen} 
            setImagePreviewSrc={setImagePreviewSrc}
            imageShow={imageShow}
          ></ImageCard>
        ))}
      </Box>
      <Dialog
        open={imagePreviewOpen}
        onClose={handleClose}
        onKeyDown={handleKeyDown}
        onEscapeKeyDown={handleClose}
        maxWidth={false}
      >
        <DialogTitle>Image Preview [{imagePreviewSrcName}]</DialogTitle>
        <DialogContent>
          <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
          >
              <img src={imagePreviewSrc} style={{maxHeight:'700px'}}></img>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box display="flex" flexGrow="1" justifyContent="space-around" width="1">
            <Box>
              <Button onClick={setPrevImage} color="primary">
                  Prev
              </Button>
              <Button onClick={setNextImage} color="primary">
                  Next
              </Button>
            </Box>
            <Box>
              <Button onClick={delCurrentImage} color="secondary">
                  Delete
              </Button>
            </Box>
            <Box>
              <Button onClick={handleClose} color="primary">
                  Close
              </Button>
            </Box>
          </Box>

        </DialogActions>
      </Dialog> 
    </BorderedBox>
  );
}

export default React.memo(ImageCardContainer);
