import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Pretendard from "./fonts/PretendardVariable.woff2"
const GlobalStyles = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: 'Pretendard Variable';
        src: url(${Pretendard});
    }
    *{
        box-sizing: border-box;
    }
    body{
        font-family: 'Pretendard Variable';
    }
    button{
        font-family: 'Pretendard Variable';
    }
    input{
        font-family: 'Pretendard Variable';
    }
    textarea{
        font-family: 'Pretendard Variable';
    }
`;
 
export default GlobalStyles;