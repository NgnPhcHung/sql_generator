import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Dropdown = (props) => {
  const [isShowDropdown, setShowDropdown] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (btnRef.current && btnRef.current.contains(ev.target)) {
        setShowDropdown(!isShowDropdown);
      } else {
        setShowDropdown(false);
      }
    };
    window.addEventListener("click", handleClickOutside, true);
    return () => window.removeEventListener("click", handleClickOutside, true);
  });

  return (
    <DropdownContainer ref={btnRef}>
      {props.icon}<p>{props.title}</p>
      <Content isShow={isShowDropdown}>{props.children}</Content>
    </DropdownContainer>
  );
};

const Content = styled.div`
  display: ${(props) => (props.isShow ? "flex" : "none")};
  border: 2px solid ${(props) => `rgba(${props.theme.textRgba})`};
  border-radius: 5px;
  flex-direction: column;
  top: 80%;
  right: 0;
  position: absolute;
  background-color: ${(props) => `rgba(${props.theme.bodyRgba})`};
  width: 8rem;
  padding: 0.5rem 0;

  button {
    color: ${(props) => `rgba(${props.theme.textRgba}, 0.8)`};
    background-color: transparent;
    border: none;
    font-weight: 500;
    cursor: pointer;
    padding: 5px 0;
    transition: letter-spacing 0.4s ;
  }
  button:hover {
    background-color: ${(props) => `rgba(${props.theme.textRgba}, 0.2)`};
    letter-spacing: 1px;
  }
`;
const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: ${(props) => props.theme.body};
  height: 2rem;
  cursor: pointer;
  border-radius: 5px;
  z-index: 999;

  p {
    margin: 0;
    padding: 0;
  }
`;

export default Dropdown;
