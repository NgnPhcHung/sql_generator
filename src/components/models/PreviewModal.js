import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { BsX } from "react-icons/bs";
import { modalDocAction } from "../../redux/action/modalsSlice";
import CodeMirror from '@uiw/react-codemirror';
import { sql } from "@codemirror/lang-sql";
import { dracula } from "@uiw/codemirror-themes-all";
import { transferString}  from '../../helpers/formatFile'
import { editorAction } from "../../redux/action/editorSlice";

const PreviewModal = () => {
  const modalOpen = useSelector((state) => state.modals.modalPreviewOpen);
  const importedValue = useSelector(state => state.editor.editorFileContent)
  const dispatch = useDispatch();
  const options = {
    lineNumbers: true,
    matchBrackets: true,
    mode: sql,
    theme: 'dracula'
};
  const closeModal = () => {
    dispatch(modalDocAction.closePreviewModal());
  };
  const saveImport = () => {
    closeModal()
  }

  return ReactDOM.createPortal(
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {modalOpen && (
        <Backdrop
          initial="hidden"
          animate="visible"
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MotionDiv
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Close onClick={closeModal}>
              <BsX className="icon" />
            </Close>
            <Content>
              {/* {importedValue} */}
              <CodeMirror
              theme={dracula}
                width="65vw"
                height="60vh"
                options={options}
                extensions={[sql()]}
                value={importedValue}
              />
            </Content>
            <Button onClick={saveImport} >Submit</Button>
          </MotionDiv>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.getElementById("previewModal")
  );
};
const Backdrop = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  backdrop-filter: blur(5px);
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  display: flex;
`;
const MotionDiv = styled(motion.div)`
  width: 70vw;
  height: 70vh;
  background-color: ${(props) => props.theme.text};
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;
const Close = styled.button`
  background-color: transparent;
  border: transparent;
  position: absolute;
  right: 0;
  cursor: pointer;
  .icon {
    color: ${(props) => props.theme.body};
    font-size: ${(props) => props.theme.fontxl};
  }
`;
const Content = styled.div`
  width: 65vw;
  height: 60vh;
  color: ${(props) => props.theme.body};
  font-size: ${props => props.theme.fontmd};
  background-color: ${props => `rgba(${props.theme.bodyRgba}, 0.1)`};
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  overflow-y: auto;
`;
const Button = styled.button`
cursor: pointer;
  background-color: ${props => props.theme.orange};
  border: none;
  width: 4rem;
  height: 1.5rem ;
  position: absolute;
  top: 94%;
  right: 10%;

  &:hover{
    background-color: ${props => props.theme.type};
  }
`
export default PreviewModal;
