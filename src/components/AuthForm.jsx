import React from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import styled from 'styled-components';
import Button from './Button';

const CardFields = styled.div`
  margin: 15% 0 0 0 ;
  text-align: center;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

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

const renderError = (error) => {
  return (
    <CardFields>
      <AuthErrorMessage>{error.error}</AuthErrorMessage>
    </CardFields>
  );
};

const validateInput = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const AuthForm = (props) => {
  const { initialValues, sendData, showLogin, error } = props;
  return (
    <Formik
      initialValues={initialValues}
      validate={validateInput}
      onSubmit={(values, actions) => {
        const { email, password } = values;
        sendData({ email, password });
      }}
      render={( isSubmitting ) => {
        return (
          <StyledForm>
            <CardFields>
              <CardInput type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="p" />
            </CardFields>
            <CardFields>
              <CardInput type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="p" />
            </CardFields>
            { error && renderError(error) }
            <CardFields>
              <Button>{ !showLogin ? 'Sign Up' : 'Log In' }</Button>
            </CardFields>
          </StyledForm>
        );
      }}
    />
  );
};

export default AuthForm;
