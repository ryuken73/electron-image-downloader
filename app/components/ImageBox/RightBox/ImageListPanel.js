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
  const {fileTypes, fileSizeMin, fileSizeMax, filePatterns} = props;
  const {setImageData} = props.ImageActions;
  const onStart = () => {};
  const formatFilter = (format) => {
    if(fileTypes.includes('all')) return true;
    return fileTypes.includes(format);
  }
  const sizeFilter = (size) => {console.log(`*****${size}`); return ((fileSizeMin < size) && (size < fileSizeMax));}
  const nameFilter = (name) => {
    console.log(`*****${name}`);
    const blnakRemoved = filePatterns.filter(pattern => pattern !== '');
    if(blnakRemoved.includes('*')) return true;
    const results = blnakRemoved.map(filename => {
      console.log(name)
      console.log(filename)
      return name.includes(filename)
    })
    return results.some(result => result === true);
  }

  const filteredImages = imageData
  .filter(image => formatFilter(image.metadata.format))
  .filter(image => sizeFilter(image.metadata.size))
  .filter(image => nameFilter(image.tmpFname))

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
          list={filteredImages} 
          setList={setImageData}
          chosenClass={"chosen"}
          animation={150}
          onEnd={onEnd}
          invertSwap={true}
          onStart={onStart} 
          handle=".handle"
        >
            {filteredImages.map(image => (
              <ImageCard key={image.index} image={image} toggleCheck={toggleCheck}></ImageCard>
            ))}

        </StyledReactSortable>
      </BorderedBox>
    //  </SectionWithFullHeightFlex>
    

  );
}

export default React.memo(ImageCardContainer);
