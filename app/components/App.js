import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FullHeightContainer from './template/FullHeightContainer';
import FirstChildSection from './template/FirstChildSection';
import ControlBox from './ControlBox';
import ImageBox from './ImageBox';
import OptionDialog from './OptionDialog';

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontSize: 12,
      fontWeight: 500,
    },
    button: {
      // fontStyle: 'italic',
    },
  },
});


function App() {
  return (
    // <Box diaplay="flex" flexDirection="column" height="1">
    <ThemeProvider theme={theme}>
      <FullHeightContainer>
        <FirstChildSection flexGrow="0">
          <ControlBox></ControlBox>
        </FirstChildSection> 
        {/* <FirstChildSection> */}
        <FirstChildSection flexGrow="1" flexShrink="1" flexBasis="auto">
          <ImageBox></ImageBox>
        </FirstChildSection> 
        <OptionDialog></OptionDialog>
      </FullHeightContainer>
    </ThemeProvider>
    // </Box>
  );
}

export default App;
   