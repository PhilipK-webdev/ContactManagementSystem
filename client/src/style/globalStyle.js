import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body{
    font-family:'Almoni', Ariel, serif;
    font-size:18px;
    padding:0;
    margin: 0;
    background: #F5F5F5;
    color: black;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // height: 100vh; 
}

html{
    box-sizing:border-box;
}

*,*::before, *::after{
 box-sizing:inherit
}
`;

export default GlobalStyles;
