import { createGlobalStyle } from "styled-components";
import "@fontsource/quicksand";

const GlobalStyles = createGlobalStyle`
  :root{
    --blue: "#8d99ae",
  }
  *,*::before, *::after{
    margin: 0;
    padding: 0;
  }
  body{
    font-family: "Quicksand", sans-serif;
    overflow: hidden;
  }
  h1, h2, h3, h4, h5, h6{
    margin: 0;
    padding: 0;
  }
  a{
    color: inherit;
    text-decoration: none ;
    }

    ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #696868;
    border-radius: 10px;
    background-color: #303030;
  }
  ::-webkit-scrollbar {
    height: 5px;              /* height of horizontal scrollbar ← You're missing this */
  width: 5px;
    background-color: #696868;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px #999999;
    background-color: #cecece;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #828282;
  }
`;
export default GlobalStyles;
