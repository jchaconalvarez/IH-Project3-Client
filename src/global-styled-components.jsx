import { injectGlobal } from 'styled-components';

const globalStyledComponents = injectGlobal`
  html {
    font-size: 16px;
  }
  body {
    margin: 0;
    padding: 0;
    /* height: 100vh; */
  }
  a {
    color: inherit;
    text-decoration: none;
    outline: 0;
  }
  button {
    outline: 0;
  }
`;

export default globalStyledComponents;
