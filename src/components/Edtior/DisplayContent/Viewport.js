import { useGesture } from "@use-gesture/react";
import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Table from "./Table";
import Xarrow, { Xwrapper } from "react-xarrows";
import { ReactComponent as One } from "../../../assets/One.svg";
import { ReactComponent as Many } from "../../../assets/Many.svg";

const Viewport = () => {
  const refLeft = useRef(null);
  const refTop = useRef(null);
  const refRight = useRef(null);
  const refBottom = useRef(null);
  const boxRef = useRef(null);
  const preventRef = useRef(null);
  const [allowGesture, setAllowGesture] = useState(true);
  const [arrow, setArrow] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 });
  const [refPos, setRefPos] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const editorState = useSelector((state) => state.editor.tableList);
  const foreignState = useSelector((state) => state.editor.foreignList);

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(editorState);
  }, [editorState]);

  

  const addLeftSpace = () => {
    const styles = window.getComputedStyle(boxRef.current);
    boxRef.current.style.right = styles.right;
    boxRef.current.style.left = null;

    let newRatio = parseInt(styles.width, 10) + 500;
    boxRef.current.style.width = `${newRatio}px`;
    setRefPos((old) => ({ ...old, left: -newRatio }));
  };
  const addRightSpace = () => {
    const styles = window.getComputedStyle(boxRef.current);
    boxRef.current.style.left = styles.left;
    boxRef.current.style.right = null;
    let newRatio = parseInt(styles.width, 10) + 500;
    boxRef.current.style.width = `${newRatio}px`;
    setRefPos((old) => ({ ...old, right: newRatio }));
  };
  const addTopSpace = () => {
    const styles = window.getComputedStyle(boxRef.current);
    boxRef.current.style.bottom = styles.bottom;
    boxRef.current.style.top = null;

    let newRatio = parseInt(styles.height, 10) + 500;
    boxRef.current.style.height = `${newRatio}px`;
    setRefPos((old) => ({ ...old, top: newRatio }));
  };
  const addBottomSpace = () => {
    const styles = window.getComputedStyle(boxRef.current);
    boxRef.current.style.top = styles.top;
    boxRef.current.style.bottom = null;

    let newRatio = parseInt(styles.height, 10) + 500;
    boxRef.current.style.height = `${newRatio}px`;
    setRefPos((old) => ({ ...old, bottom: newRatio }));
  };

  useEffect(() =>{
    setArrow(true)
    const getArrowData = () => {
      foreignState.map((v, index) => {
        let classNameArr = v.split("-");
        classNameArr = classNameArr.filter((entry) => entry.trim() !== "");
        if (classNameArr[1]){
          var elementExists = document.getElementById(classNameArr[1]);
        if (elementExists) {
          setArrow(false)
        }else 
          setArrow(true)
        }
      });
    };
    var arrowInterval = setInterval(() =>{
      if(arrow){
        getArrowData()
        clearInterval(arrowInterval)
      }else{
        getArrowData()
      }
    },500)
    
    return () =>{
      clearInterval(arrowInterval)
    }
  },[foreignState])

  useEffect(() => {
    const stopDrag = preventRef.current;
    const mouseDown = () => {
      setAllowGesture(false);
    };
    const mouseUp = () => {
      setAllowGesture(true);
    };
    stopDrag.addEventListener("mousedown", mouseDown);
    stopDrag.addEventListener("mouseup", mouseUp);

    return () => {
      stopDrag.removeEventListener("mousedown", mouseDown);
      stopDrag.addEventListener("mouseup", mouseUp);
    };
  }, [allowGesture]);

  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        if (allowGesture) {
          if (dx + refLeft.current.offsetLeft >= -150) {
            addLeftSpace();
          } else if (boxRef.current.offsetWidth + dx <= 1000 + -dx) {
            addRightSpace();
          }
          if (boxRef.current.offsetHeight - dy <= 800 + dy) {
            addTopSpace();
          } else if (boxRef.current.offsetHeight + dy <= 800 - dy) {
            addBottomSpace();
          }
          setCrop((crop) => ({ ...crop, x: dx, y: dy }));
        }
      },
      onWheel: ({ offset: [, y] }) => {
        let ratio = 1 + y * 0.0001;
        if (ratio <= 1 && ratio >= 0.5) {
          addLeftSpace();
          addRightSpace();
          addTopSpace();
          addBottomSpace();
        } else if (ratio <= 0.5) ratio = 0.5;
        else if (ratio >= 2) ratio = 2;
        setCrop((crop) => ({ ...crop, scale: ratio }));
      },
    },
    {
      target: boxRef,
      drag: {
        from: () => [crop.x, crop.y],
      },
    }
  );

  return (
    <Container>
      <Xwrapper>
        <div>
          <View
            ref={boxRef}
            style={{ top: crop.y, left: crop.x, touchAction: "none" }}
            scaleValue={crop.scale}
            config={refPos}
          >
            <div ref={preventRef}>
              {tableData?.map((v, i) => {
                return <Table key={i} id={v.tableName} data={v} />;
              })}
            </div>
          </View>
          {
            arrow? "":foreignState.map((v, index) => {
              let classNameArr = v.split("-");
              classNameArr = classNameArr.filter((entry) => entry.trim() !== "");
              var elementExists = document.getElementById(classNameArr[1]);
  
              if (!elementExists || !classNameArr[0]) {
                return "";
              }
              return (
                <Xarrow
                  key={index}
                  start={classNameArr[0]}
                  end={classNameArr[1]}
                  headShape={{
                    svgElem: <Many />,
                    offsetForward: 0.25,
                  }}
                  tailShape={{
                    svgElem: <One />,
                    offsetForward: 0.25,
                  }}
                  path="grid"
                  headColor="#CCCCCC"
                  tailColor="#CCCCCC"
                  showTail={true}
                  arrowHeadProps={{
                    stroke: "#CCCCCC",
                  }}
                  arrowTailProps={{
                    stroke: "#CCCCCC",
                  }}
                  lineColor="#CCCCCC"
                  strokeWidth={3}
                  endAnchor={['left','right']}
                  startAnchor={['left','right']}
                />
              );
            })
          }
          <div ref={refLeft} className="resizer-l" />
          <div ref={refTop} className="resizer-t" />
          <div ref={refRight} className="resizer-r" />
          <div ref={refBottom} className="resizer-b" />
        </div>
      </Xwrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #333;
  left: 4px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const View = styled.div`
  position: relative;
  transform: scale(${(props) => props.scaleValue});
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.dragBoard};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  .resizer-r {
    position: absolute;
    height: 100px;
    width: 100px;
    right: ${(props) => props.config.right};
    top: 0;
    transform: translate(-50%, -50%);
  }

  .resizer-t {
    position: absolute;
    cursor: row-resize;
    height: 5px;
    left: 0;
    top: ${(props) => props.config.top};
    width: 100%;
  }

  .resizer-b {
    position: absolute;
    cursor: row-resize;
    height: 5px;
    left: 0;
    bottom: ${(props) => props.config.bottom};
    width: 100%;
  }

  .resizer-l {
    position: absolute;
    cursor: col-resize;
    height: 100%;
    left: ${(props) => props.config.left};
    top: 0;
    width: 5px;
  }
`;

export default Viewport;
