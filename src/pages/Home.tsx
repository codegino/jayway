import React, {FC} from 'react';
import styled from '@emotion/styled';
import Heading1 from '../components/typography/Heading1';

const Home: FC = () => {
  return (
    <LayoutWrapper>
      <Main>
        <Heading1>Meet the Team</Heading1>
      </Main>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div({
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: '2vh',
  minWidth: '20rem',
});

const Main = styled.main({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100%',
  maxWidth: 750,
  overflow: 'hidden',
  position: 'relative',
  padding: '0 2rem',
  '& h1': {
    width: '100%',
    textAlign: 'left',
  },
});

export default Home;
