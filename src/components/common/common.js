import styled from "styled-components";

export const Button = styled.span`
  color: ${(props) => props.theme.body};
  background-color: ${(props) => `rgba(${props.theme.navRgba}, 1)`};
  border: none;
  padding: 0.25rem 0.5rem;
  height: 1.5rem;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 0.5rem;
  font-size: ${(props) => props.theme.fontsm};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  text-transform: capitalize;

  .icon {
    color: ${(props) => props.theme.body};
    font-size: ${(props) => props.theme.fontsx};
    margin-right: 0.5rem;
  }
`;

export const ThemeButton = styled.button`
  height: 1.5rem;
  width: 1.5rem;
  font-size: ${(props) => props.theme.fontsm};

  .icon{
    
  }
`

export const Input = styled.input`
  padding: 0.25rem 1rem;
  color: ${(props) => props.theme.body};
  background-color: transparent;
  border: none;
  border-radius: 5px;
  margin: 0 1rem;
  width: 10rem;
`;
