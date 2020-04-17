import React, { Component } from 'react';
// import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper';
import BorderedBox from '../template/BorderedBox';
import Box from '@material-ui/core/Box';
import LeftBox from './LeftBox/SavePanel';
// import ImageListPanel from './RightBox/ImageListPanel';
import ImageListContainer from '../../containers/ImageListContainer';
import ImageTabs from './RightBox/ImageTabs';
import SectionWithFullHeight from '../template/SectionWithFullHeight';

export default class ImageBox extends Component {
    render() {
        return (
            <Box className="ImageBox" display="flex" flexDirection="row" flexGrow="1">
                <LeftBox></LeftBox>
                <ImageTabs></ImageTabs>
            </Box>
        )
    } 
}
  


// export default class ImageContainer extends Component {
//     render() {
//         return (

//             // <SectionWithFullHeight width="100%" height="100%" >
//                 <BorderedBox display="flex" flexDirection="row" width={"auto"} height="100%"> 
//                     {/* <SectionWithFullHeight width="50%" > */}
//                         <BorderedBox width={"200px"} flexShrink={0}>
//                             <LeftBox></LeftBox>
//                         </BorderedBox>
//                         <BorderedBox display="flex" flexDirection="column" flex={1}>
//                             <RightBox></RightBox>
//                         </BorderedBox>  
//                     {/* </SectionWithFullHeight> */}
//                 </BorderedBox>
//             // </SectionWithFullHeight>

//         )
//     }
// }
