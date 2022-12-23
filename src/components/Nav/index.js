import React, { useEffect } from "react";
import { Button, Input } from "../common/common";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import Dropdown from "../common/Dropdown";
import { BsFillShareFill } from "react-icons/bs";
import SwitchMode from "../common/SwitchMode";
import { BsFillMenuButtonWideFill, BsDownload } from "react-icons/bs";
import { useFilePicker } from 'use-file-picker';
import { useDispatch} from "react-redux";
import { modalDocAction } from "../../redux/action/modalsSlice";
import { editorAction } from "../../redux/action/editorSlice";

const Navbar = () => {
  const input = useInput("");
  const dispatch= useDispatch()

  const [openFileSelector, { filesContent, plainFiles }] = useFilePicker({
    accept: '.sql',
  });

  const toggleDocumentModel = () =>{
    dispatch(modalDocAction.toggleDocModel())
  }
  useEffect(() =>{
    filesContent.map((file, index) => {
      let fileName = file.name
      let fileContent = file.content
      dispatch(editorAction.setEditorContent([fileName, fileContent]))
    })
    
    if(plainFiles.length) dispatch(modalDocAction.togglePreviewModal())
  },[dispatch, filesContent, plainFiles.length])

  return (
    <Container>
      <Input disabled placeholder="Board&#39;s name" {...input} />
      <Button nav="true">
        <BsFillShareFill className="icon" /> Share
      </Button>
      <Button onClick={() => openFileSelector()} >
        <BsFillMenuButtonWideFill className="icon" />
        import
      </Button>
      <Button>
        <Dropdown title="Export" icon={<BsDownload className="icon" />}>
          <button>To .sql file</button>
          <button>To PNG</button>
        </Dropdown>
      </Button>
      <Button onClick={toggleDocumentModel} >Document</Button>
      <SwitchMode />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${(props) => `rgba(${props.theme.textRgba},1)`};
  height: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 2rem;
  z-index: 20;
`;

export default Navbar;
