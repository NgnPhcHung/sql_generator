import React from "react";
import styled from "styled-components";
import { BsFillMoonStarsFill } from "react-icons/bs";

const Switch = () => {
  return (
    <CheckBoxWrapper>
      <BsFillMoonStarsFill className="icon" />
      <Container>
        <CheckBox id="checkbox" type="checkbox" />
        <CheckBoxLabel htmlFor="checkbox"></CheckBoxLabel>
      </Container>
    </CheckBoxWrapper>
  );
};

const CheckBoxWrapper = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
  height: 2rem;
  background-color: ${(props) => `rgba(${props.theme.navRgba})`};
  border-radius: 5px;
  cursor: pointer;

  .icon {
    color: ${(props) => props.theme.body};
    font-size: ${(props) => props.theme.fontxs};
    margin-right: 5px;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  width: 2.5rem;
  height: 1.2rem;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    margin: 2px;
    width: 0.9rem;
    height: 0.9rem;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 2.5rem;
  height: 1.2rem;
  cursor: pointer;
  margin-left: 5px;
  &:checked + ${CheckBoxLabel} {
    background: #7b93cf;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      margin: 2px;
      width: 0.9rem;
      height: 0.9rem;
      margin-left: 1.5rem;
      transition: 0.2s;
    }
  }
`;
export default Switch;
