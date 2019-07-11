import styled from 'styled-components';

const Main = styled.section`
  & > section {
    margin-top: 25px;
    background: white;
    padding: 20px;
    padding-top: 50px;
  }
`;

Main.displayName = 'Main';

export default Main;
