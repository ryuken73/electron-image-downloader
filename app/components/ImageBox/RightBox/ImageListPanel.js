import React from 'react';
import ImageCard from './ImageCard';
import { ReactSortable } from "react-sortablejs";
import styled from 'styled-components';
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
  const {imageData} = props;
  const {fileType, fileSizeMin, fileSizeMax, filePatterns} = props;
  const {setImageData} = props.ImageActions;
  console.log(imageData);

  const onStart = () => {};

  const formatFilter = (format) => fileType.includes(format);
  const sizeFilter = (size) => ((fileSizeMin < size) && (size < fileSizeMax));

  // const onStart = evt => {
  //     console.log('drag started', evt.oldIndex);
  // }

  // const toggleCheck = (index) => {
  //   return () => {
  //     const newState = [...state];
  //     // const targetImage = newState.filter(image => image.index === index).shift();
  //     // targetImage.checked = !targetImage.checked;
  //     const targetImageIndex = newState.findIndex(image => image.index === index);
  //     newState[targetImageIndex].checked = !newState[targetImageIndex].checked;
  //     setState(newState);
  //   }
  // }

  return (
    // <SectionWithFullHeightFlex className="SectionWithFullHeightFlexFlex ImageListPanel">
    <BorderedBox display="flex" alignContent="center" alignItems="flex-start" flexGrow="1" minWidth="auto" flexBasis="0" overflow="auto">

        <StyledReactSortable 
          list={imageData} 
          setList={setImageData}
          chosenClass={"chosen"}
          animation={150}
          onEnd={onEnd}
          invertSwap={true}
          onStart={onStart} 
          handle=".handle"
        >
            {imageData.map(image => (
              <ImageCard key={image.index} image={image} toggleCheck={toggleCheck}></ImageCard>
            ))}

        </StyledReactSortable>
      </BorderedBox>
    //  </SectionWithFullHeightFlex>
    

  );
}

export default React.memo(ImageCardContainer);
