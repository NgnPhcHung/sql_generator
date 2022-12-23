import React from "react";
import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { appSliceAction } from "../../redux/action/appSlice";

const SwitchMode = () => {
  const appTheme = useSelector((state) => state.app.themeLight);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(appSliceAction.toggleTheme());
  };

  return (
    <ButtonContainer light={appTheme} onClick={toggleTheme}>
      {appTheme ? (
        <FiSun className={`modeIcon ${appTheme ? "sun" : ""}`} />
      ) : (
        <FiMoon className={`modeIcon ${appTheme ? "" : "moon"}`} />
      )}
    </ButtonContainer>
  );
};
const mode = keyframes`
  from{
    transform: rotateZ(0deg);
  }
  to{
    transform: rotateZ(360deg);
  }
`;
const ButtonContainer = styled.div`
  .modeIcon {
    font-size: ${(props) => props.theme.fontxl};
    padding: 0.5rem;
    animation: ${mode} 0.5s;
    cursor: pointer;
  }
  .sun {
    color: ${(props) => props.theme.orange};
  }
  .moon {
    color: ${(props) => `rgba(${props.theme.bodyRgba},0.7)`};
  }
`;

export default SwitchMode;
