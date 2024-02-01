import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body{
    font-family: 'Roboto Flex', sans-serif;
    font-weight:500;
    font-size:18px;
    padding:0;
    margin: 0;
    background: #F5F5F5;
    color: black;
}

html{
    box-sizing:border-box;
}

*,*::before, *::after{
 box-sizing:inherit
}
`;

export default GlobalStyles;
