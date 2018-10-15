import React from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import styled from 'styled-components';
import CardButton from './Button'

const CardFields = styled.div`
  position: relative;
  margin: 15% 0 0 0 ;
  text-align: center;
`

const CardInput = styled(Field)`
  padding: 3px 0;
  width: 100%;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid #ddd;
  transition: border-bottom-color .25s ease-in;

  &:focus {
    border-bottom-color: #EF4957;
    outline: 0;
  }

  &:focus::placeholder {
    transform: translateX(80px);
    opacity: 0;
    transition: all .5s ease;
  }
`

const validateInput = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.0]+\[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const AuthForm = (props) => {
  const { initialValues } = props;
  return (
    <Formik
      initialValues={initialValues}
      // validate={validateInput}
      onSubmit={(values, actions) => {
        const { email, password } = values;
        props.sendData({ email, password });
      }}
      render={( isSubmitting ) => {
        return (
          <Form>
            <CardFields>
              {/* <Field type="email" name="email" /> */}
              <CardInput type="email" name="email" placeholder="email"/>
              <ErrorMessage name="email" component="p" />
            </CardFields>
            <CardFields>
              {/* <Field type="password" name="password" /> */}
              <CardInput type="password" name="password" placeholder="password"/>
              <ErrorMessage name="password" component="p" />
            </CardFields>
            <CardFields>
              <CardButton type="submit">Submit</CardButton>
            </CardFields>
          </Form>
        );
      }}
    />
  );
};

export default AuthForm;
