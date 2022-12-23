import React, { useState } from "react";
import styled from "styled-components";
import MainContent from "./DisplayContent/MainContent";
import SideEditor from "./Side/SideEditor";

import { BsBoxArrowInLeft } from "react-icons/bs";

const Editor = () => {


  return (
    <Container>
      {/* <HideArrow>
        <BsBoxArrowInLeft className="icon" />
      </HideArrow> */}
          <SideEditor />
          <MainContent />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 95vh;
  display: flex;
  position: relative;
`;
const HideArrow = styled.span`
  position: absolute;
`;

export default Editor;
