import styled from 'styled-components';

export const CardContainer = styled.div`
  /* position: relative; */
  justify-content: center;
  top: 50px;
  background-color: #FFF;
  padding: 30px;
  margin: 10% auto;
  width: 200px;
  box-shadow: 
    0 0 20px rgba(0, 0, 0, .05), 
    0 0px 20px rgba(0, 0, 0, .05);
  border-radius: 8px;
`

export const CardH1 = styled.h1`
  /* NOTE: ¿ poner font de gazzette ? */
  font-family: 'Raleway', sans-serif;
  padding: 5% auto 5%;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`

export const CardBody = styled.div`
  padding-right: 42px;
  padding-left: 32px;
`

export const CardText = styled.p`
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  display: block;
  padding-top: 8px;
  width: 100%;
  text-align: center;
`

export const CardLink = styled.a`
  color: #EF4957;
  transition: color .25s ease-in;
  text-decoration: none;
  outline: 0;
  cursor: default;

  &:hover {
    color: #ff7d84;
  }
  &:focus {
    text-decoration: none;
  }
`