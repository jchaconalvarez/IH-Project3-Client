import styled from 'styled-components';

const NoteBox = styled.div`
  /* width: 2.25rem; */
  width: ${props => props.duration / 1000}rem;
  height: 1.25rem;
  background: #DBA112;
  margin-left: ${props => props.margin / 1000}rem;
`;

export default NoteBox;
