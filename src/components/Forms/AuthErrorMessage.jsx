import styled from 'styled-components';

const AuthErrorMessage = styled.div`
  position: absolute;
  padding: 0.5rem 0;
  width: 24%;
  color: white;
  text-align: center;
  background: lightcoral;
  border-radius: 5px;
  animation-name: fade-out;
  animation-delay: 5000ms;
  animation-duration: 3000ms;
  animation-fill-mode: forwards;
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export default AuthErrorMessage;
