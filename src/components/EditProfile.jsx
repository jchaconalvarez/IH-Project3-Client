import React from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import user from '../services/profile-service';
import styled from 'styled-components';
import Button from './Button';

const CardFields = styled.div`
  margin: 5% 0 0 0 ;
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
    color: #3838338;
  }
  &:focus::placeholder {
    transform: translateX(80px);
    opacity: 0;
    transition: all .5s ease;
  }
`;

const EditProfile = (props) => {
  const { userData } = props;
  const email = userData.email;
  const password = userData.password;
  const id = userData._id;
  return (
    <Formik
      initialValues={email, password}
      onSubmit={(values, actions) => {
        const { email, password } = values;
        user.editProfile(id, values)
      }}
      render={({ errors, touched, isSubmitting }) => (
        <StyledForm>
          <CardFields>
            <CardInput type="email" name="email" placeholder={email} />
            {errors.email && touched.email && <div>{errors.email}</div>}
          </CardFields>
          <CardFields>
            <CardInput type="password" name="password" placeholder="*****"/>
          </CardFields>
          <CardFields>
            <Button type="submit">Edit</Button>
          </CardFields>
        </StyledForm>
      )}
    />
  );
};

export default EditProfile;
