import styled from 'styled-components';

const NoteBox = styled.div`
  width: ${props => props.duration / 1000}rem;
  height: 1.25rem;
  background: #DBA112;
  border: 1px solid #C46B00;
  border-radius: 5px;
  /* margin-left: 2rem; */
  margin-left: ${props => props.margin / 1000}rem;
`;

export default NoteBox;
