import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #FFF;
  justify-content: center;
  padding: 30px;
  width: 200px;
  box-shadow:
    0 0 20px rgba(0, 0, 0, .05),
    0 0px 20px rgba(0, 0, 0, .05);
  border-radius: 8px;
  display: grid;

  @media (max-width: 768px) {
    width: 230px;
  }
`;

export const CardH1 = styled.h1`
  font-family: 'Raleway', sans-serif;
  padding: 5% auto 5%;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

export const CardBody = styled.div`
  padding-right: 40px;
  padding-left: 40px;
  
  @media (max-width: 768px) {
    padding-right: 20px;
    padding-left: 20px;
  }
`;

export const CardText = styled.p`
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  display: block;
  padding-top: 8px;
  width: 100%;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const CardLink = styled.a`
  display: block;
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
`;
