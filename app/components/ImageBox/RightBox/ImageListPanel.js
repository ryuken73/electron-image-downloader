import React from 'react';
import ImageCard from './ImageCard';
import { ReactSortable } from "react-sortablejs";
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import SectionWithFullHeightFlex from '../../template/SectionWithFullHeightFlex';
import BorderedBox from '../../template/BorderedBox'

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

function ImageCardContainer(props) {
  // const [state, setState] = React.useState(imageData);
  const {pageIndex, imageData, hidden} = props;
  console.log('&&&&&&&&&&&&&&&&&&&&&', hidden, imageData)
  const {fileTypes, fileSizeMin, fileSizeMax, filePatterns} = props;
  const {setImageData} = props.ImageActions;
  const {filterImageByType, filterImageByMinSize} = props.ImageActions;
  const {filterImageByMaxSize, filterImageByName} = props.ImageActions;
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
  

  return (
    // <SectionWithFullHeightFlex className="SectionWithFullHeightFlexFlex ImageListPanel">
    <BorderedBox display={hidden ? 'none':'flex'} alignContent="center" alignItems="flex-start" flexGrow="1" border="0" minWidth="auto" flexBasis="0" overflow="auto">
        <Box display="flex" flexDirection="row" flexWrap="wrap" width={1} overflow="auto">
          {imageData.map(image => (
            <ImageCard key={image.index} order={image.index} image={image} toggleCheck={toggleCheck}></ImageCard>
          ))}
        </Box>
        {/* </StyledReactSortable> */}
      </BorderedBox>
    // {/* //  </SectionWithFullHeightFlex> */}
  );
}

export default React.memo(ImageCardContainer);
