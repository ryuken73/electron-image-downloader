import React from 'react';
import ImageCard from './ImageCard';
import { ReactSortable } from "react-sortablejs";
import styled from 'styled-components';
import SectionWithFullHeightFlex from '../../template/SectionWithFullHeightFlex';
import BorderedBox from '../../template/BorderedBox'



// const imageData = [
//   {
//     index: 0,
//     filename: 'sword.jpg',
//     imageSrc: 'd:/temp/image/1.jpeg',
//     // imageSrc: 'https://1.bp.blogspot.com/-wfgt2ZBDAEE/XWi6h2tzgMI/AAAAAAAC79I/E8NNWR2E20AdDlr_WzYw2Yh5nujoqPGQACLcBGAs/s1600/954-01.jpg',
//     dragStart: false,
//     checked: false
//   },
//   {
//     index: 1,
//     filename: 'poster.jpg',
//     imageSrc: 'd:/temp/image/2.jpeg',
//     // imageSrc: 'https://2.bp.blogspot.com/-k5iSanNfHKk/XWi6h1ZVUSI/AAAAAAAC79M/DnspIGF1qQMPCE3jduC3p1Fu0npsw5L8QCLcBGAs/s1600/954-02.jpg',
//     dragStart: false,
//     checked: false
//   },
//   {
//     index: 2,
//     filename: 'sword.jpg',
//     imageSrc: 'd:/temp/image/3.jpeg',
//     // imageSrc: 'https://2.bp.blogspot.com/-HcFcongIWnU/XWi6hx7dzwI/AAAAAAAC79Q/SBDsPuiBxWMygJIcy5F6vC-RVNbzwU3_QCLcBGAs/s1600/954-03.jpg',
//     dragStart: false,
//     checked: false
//   },
//   {
//     index: 3,
//     filename: 'poster.jpg',
//     imageSrc: 'd:/temp/image/4.jpeg',
//     // imageSrc: 'https://2.bp.blogspot.com/-uOXVgQbDLc0/XWi6jJaWLzI/AAAAAAAC79U/ZiiPh-lECTw8iXJ0g2_8Vejp3neACZdUQCLcBGAs/s1600/954-04.jpg',
//     dragStart: false,
//     checked: false
//   }
// ]
 
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
  const {setImageData} = props.ImageActions;
  console.log(imageData);

  const onStart = () => {};


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
