import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyle";
import { light } from "./styles/Theme";
import Editor from './components/Edtior'
import Navbar from "./components/Nav";
import styled from "styled-components";
import DocumentModal from "./components/models/DocumentModal";
import PreviewModal from "./components/models/PreviewModal";
import { exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';


function App() {

  return (
    <Div>
      <GlobalStyles />
      <ThemeProvider theme={light}>
        <Navbar toPDF = {exportComponentAsPDF} toPNG={exportComponentAsPNG}/>
        <Editor/>
        <DocumentModal/>
        <PreviewModal/>
      </ThemeProvider>
    </Div>
  );
}

const Div = styled.div`
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
`

export default App;
