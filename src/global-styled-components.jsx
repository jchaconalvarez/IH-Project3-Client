import { injectGlobal } from 'styled-components';

const globalStyledComponents = injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Nunito+Sans:300,,700,800,900');
  @import url('https://fonts.googleapis.com/css?family=Orbitron');

  html {
    font-size: 16px;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    font-family: 'Nunito', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: 0;
  }

  button {
    outline: 0;
  }
  #root {
    height: inherit;
  }
`;

export default globalStyledComponents;
