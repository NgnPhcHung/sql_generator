import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Card = ({ title, entity }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeDrags, setActiveDrags] = useState(0);
  const [entityData, setEntityData] = useState([]);

  

  const cardRef = useRef(null);
  useEffect(() => {
    const iggnoreKeyword = ['Foreign', '', null, undefined];
    const keyword = ["PrimaryKey", "UNIQUE", "unique"]
    let entityValue = entity.split(',');
    let data = [];

    entityValue.map((v) => {
      if (!v.includes("Foreign")){keyword.forEach(ele =>{
        if(v.includes(ele)) v= v.replace(ele, '')
      })
      v = v.replace(/\s/g, '');
      if (!iggnoreKeyword.includes(v.split(':')[0])) {
        data.push(v);
      }}
    });
    data.map(v =>{
      console.log(title, v.split(':')[0]);
    })
    setEntityData(data);
  }, [entity]);
  return (
    <CardContainer ref={cardRef}>
      {entityData?.map((v, i) => (
        <EntityCard key={i} id={`${title} ${v.split(':')[0]}`} >
          <p className='entity'>{v.split(':')[0]}</p>
          <p className='type'>{v.split(':')[1]}</p>
        </EntityCard>
      ))}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  min-width: 5rem;
  /* max-width: 15rem; */
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding-bottom: 0.5rem;
`;
const EntityCard = styled.div`
  width: 90%;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;

  .entity {
  }
  .type {
    color: ${(props) => `rgba(${props.theme.bodyRgba},0.5)`};
  }
  &:hover {
    background-color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.3)`};
  }
`;

export default Card;
