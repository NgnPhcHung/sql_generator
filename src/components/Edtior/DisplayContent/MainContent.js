import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Viewport from "./Viewport";

const MainContent = () => {
  const ref = useRef();
  const refLeft = useRef();

  const pauseEvent = (e) => {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  }

  useEffect(() => {
    const resizeableEle = ref.current;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let x = 0;

    resizeableEle.style.left = "0px";

    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width - dx;
      resizeableEle.style.width = `${width}px`;
    };

    const onMouseUpLeftResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event) => {
      x = event.clientX;
      resizeableEle.style.right = styles.right;
      resizeableEle.style.left = null;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    const resizerLeft = refLeft.current;
    resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);

    return () => {
      resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
    };
  }, []);

  return (
    <Wrapper >
      <Resizeable ref={ref} onMouseDown={pauseEvent}>
        <Resizer ref={refLeft} />
        <Viewport/>
      </Resizeable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  z-index: 2;
  justify-content: center;
  align-items: center;
`;
const Resizeable = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  min-width: 100%;
  max-width: 150%;
`;
const Resizer = styled.div`
  position: absolute;
  background: black;
  cursor: col-resize;
  height: 100%;
  left: 0;
  top: 0;
  width: 5px;
`;

export default MainContent;
