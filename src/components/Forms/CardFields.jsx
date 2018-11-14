import styled from 'styled-components';

const CardFields = styled.div`
  margin-top: ${props => props.authForm ? '15%': '5%'};
  ${props => props.authForm && 'text-align: center'};
`;

export default CardFields;
