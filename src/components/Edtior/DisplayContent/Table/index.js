import React, { useState } from "react";
import Draggable from "react-draggable";
import { useXarrow } from "react-xarrows";
import styled from "styled-components";
import Card from "./Card";

const Table = ({data, id}) => {
  const [activeDrags, setActiveDrags] = useState(0);
  const updateXarrow = useXarrow();


  const onStart = () => {
    let temp = activeDrags;
    setActiveDrags({ activeDrags: --temp });
  };
  const onStop = () => {
    let temp = activeDrags;
    setActiveDrags({ activeDrags: --temp });
  };
  const dragHandlers = { onStart: onStart, onStop: onStop };

  return (
    <Draggable onDrag={updateXarrow} onStop={updateXarrow} handle="strong" {...dragHandlers}>
      <Board id={id} >
        <strong>
          <div className="title">{data.tableName}</div>
        </strong>
        <div className="content">
          <Card entity={data.tableEntity} title ={data.tableName} />
        </div>
      </Board>
    </Draggable>
  );
};

const Board = styled.div`
  min-width: 15rem;
  max-width: 20rem;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;

  strong {
    background-color: ${(props) => props.theme.text};
    width: 100%;
    height: 2rem;
  }

  strong .title{
    padding: 0.25rem  1rem 0  1rem;
  }
  .content{
    width: 100%;
    height: 100%;
    background-color: ${props => `rgba(${props.theme.tableRgba})`};
  }
`;

export default Table;
