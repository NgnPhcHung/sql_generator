import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { BsX } from "react-icons/bs";
import { modalDocAction } from "../../redux/action/modalsSlice";

const DocumentModal = () => {
  const modalOpen = useSelector((state) => state.modals.modalDocOpen);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalDocAction.toggleDocModel());
  };

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
              <DescriptionSection>
                <p className="title">To create table</p>
                <div className="content">
                To create table, you must use keyword <Keyword>
                  Create
                </Keyword>
                {"<your table name>{ ... }"}
                </div>
              </DescriptionSection>
              <ExampleSection>
                <p>
                  <Keyword>Create</Keyword> Human
                  {` {
                      id: `}<Type>char</Type>{`,
                      name: `}<Type>varchar</Type>{`,
                      dateOfBirdth: `}<Type>date</Type>{`,
                  }
                    `}
                </p>
              </ExampleSection>
              <DescriptionSection>
              <p className="title">To create Relationship</p>
                
                <div className="content">
                Database have 3 types of relationship: 
                <br />
                <span style={{fontStyle:"italic"}}>
                  one-to-one:<Keyword> {` -- `}</Keyword>{`,\n`} 
                  one-to-many:<Keyword> {` << `}</Keyword>{`,\n`} 
                  many-to-one:<Keyword> {` >>`}</Keyword>{`,\n`} 
                  many-to-many:<Keyword> {` ~~ `}</Keyword>{`,\n`} 
                </span> 
                Then connect it by <Keyword>Foreign</Keyword> keyword</div>
              </DescriptionSection>
              <ExampleSection>
                <p>
                 <Keyword>Foreign</Keyword> TableOne.FirstEntity <Type> {">>"} </Type> TableTwo.FirstEntity,<br />
                 <Keyword>Foreign</Keyword> TableOne.SecondEntity <Type> {"~~"} </Type> TableThree.FirstEntity,<br />
                </p>
              </ExampleSection>
              <Signature><span style={{fontWeight:"bold", fontStyle:"italic"}} >From the bottom of Phúc Hưng's heart </span>😘</Signature>
            </Content>
          </MotionDiv>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.getElementById("docModal")
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
  height: 55vh;
  background-color: ${(props) => props.theme.text};
  border-radius: 4px;
  position: relative;
  overflow: hidden;
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
  height: 45vh;
  color: ${(props) => props.theme.body};
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  margin-top: 2rem;
  overflow-y: auto;
`;
const ExampleSection = styled.div`
  width: 90%;
  background-color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.2)`};
  padding: 1rem;
  margin: 5px;

  p {
    white-space: pre-line;
  }
`;
const DescriptionSection = styled.div`
  width: 95%;
  white-space: pre-line;
  .title {
    font-size: ${(props) => props.theme.fontlg};
    font-weight: bold;
    text-transform: capitalize;
    
  }
  .content{
    padding: 10px 12px;
  }
`;
const Keyword = styled.span`
  font-style: italic;
  font-weight: bold;
  color: ${(props) => props.theme.keyword};
`;
const Type = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.type};
`
const Signature = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  color: ${props => `rgba(${props.theme.bodyRgba},0.4)`};
`
export default DocumentModal;
