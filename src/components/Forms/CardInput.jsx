import styled from 'styled-components';
import { Field } from 'formik';

const CardInput = styled(Field)`
  padding: 0.3rem 0;
  width: 100%;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid #C2C2C2;
  transition: border-bottom-color .25s ease-in;
  background: none;
  font-size: 1.5rem;
  font-weight: 300;
  color: #0F8FAB;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #F0F0F0 inset;
    -webkit-text-fill-color: #0F8FAB !important;
  }
  &:focus {
    border-bottom-color: #0F8FAB;
    outline: 0;
  }
  &::placeholder {
    color: #C2C2C2;
  }
  &:focus::placeholder {
    transform: translateX(80px);
    opacity: 0;
    transition: all .5s ease;
  }
`;

export default CardInput;
