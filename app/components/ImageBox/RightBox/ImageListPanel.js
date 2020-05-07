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
  const {setImageData} = props.ImageActions;
  const {filterImageByType, filterImageByMinSize} = props.ImageActions;
  const {filterImageByMaxSize, filterImageByName} = props.ImageActions;
  const {setImagePreviewOpen, setImagePreviewSrc} = props.ImageActions;
  const {setNextImage, setPrevImage} = props.ImageActions;
  const onStart = () => {};

  imageData.forEach(image => {
    image.imageFname = image.tmpFname.replace(/^\d{13}_/,'');
    image.imageSrc = image.tmpSrc;
  })

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

  // const getNextImage = fname => {
  //   const sortedImageData = [...imageData].sort((a,b) => a.index - b.index);
  //   console.log(sortedImageData)
  //   const currentImage = sortedImageData.find(image => image.tmpFname === fname);
  //   const currentIndex = currentImage.index;
  //   const nextImage = sortedImageData.find(image => image.index > currentIndex);
  //   return nextImage === undefined ? firstElement(sortedImageData) : nextImage;
  // }

  // const getPrevImage = fname => {
  //   const sortedImageData = [...imageData].sort((a,b) => b.index - a.index);
  //   console.log(sortedImageData)

  //   const currentImage = sortedImageData.find(image => image.tmpFname === fname);
  //   const currentIndex = currentImage.index;
  //   const prevImage = sortedImageData.find(image => image.index < currentIndex);
  //   return prevImage === undefined ? lastElement(sortedImageData) : prevImage;
  // }

  // const setPrevImage = () => {
  //   const fname = path.basename(imagePreviewSrc);
  //   const prevImage = getPrevImage(fname);
  //   setImagePreviewSrc(prevImage.tmpSrc);
  // }

  // const setNextImage = () => {
  //   const fname = path.basename(imagePreviewSrc);
  //   const nextImage = getNextImage(fname);
  //   console.log(nextImage.tmpSrc)
  //   setImagePreviewSrc(nextImage.tmpSrc);
  // }

  const handleClose = () => {
    setImagePreviewOpen(false);
  }

  const setNextImageInPage = () => () => {
    setNextImage();
  }

  return (
    // <SectionWithFullHeightFlex className="SectionWithFullHeightFlexFlex ImageListPanel">
    <BorderedBox display={hidden ? 'none':'flex'} alignContent="center" alignItems="flex-start" flexGrow="1" border="0" minWidth="auto" flexBasis="0" overflow="auto">
      <Box display="flex" flexDirection="row" flexWrap="wrap" width={1} overflow="auto">
        {imageData.map(image => (
          <ImageCard 
            key={image.index} 
            order={image.index} 
            image={image} 
            toggleCheck={toggleCheck} 
            setImagePreviewOpen={setImagePreviewOpen} 
            setImagePreviewSrc={setImagePreviewSrc}
          ></ImageCard>
        ))}
      </Box>
      {/* </StyledReactSortable> */}
            <Dialog
              open={imagePreviewOpen}
              onClose={handleClose}
              maxWidth={false}
            >
              <DialogTitle>Image Preview</DialogTitle>
              <DialogContent>
                <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                >
                    <img src={imagePreviewSrc} style={{height:'600px'}}></img>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Box display="flex" justifyContent="center" width="1">
                  <Box>
                    <Button onClick={setPrevImage} color="primary">
                        Prev
                    </Button>
                    <Button onClick={setNextImage} color="primary">
                        Next
                    </Button>
                  </Box>
                  <Button style={{marginLeft:'auto'}} onClick={handleClose} color="primary">
                      Close
                  </Button>
                </Box>

              </DialogActions>
            </Dialog> 
    </BorderedBox>
    // {/* //  </SectionWithFullHeightFlex> */}
  );
}

export default React.memo(ImageCardContainer);
