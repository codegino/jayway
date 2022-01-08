import React, {FC} from 'react';
import styled from '@emotion/styled';
import ActionToolbar from '../components/action-toolbar/ActionToolbar';
import Heading1 from '../components/typography/Heading1';
import {ErrorBoundary} from '../modules/team/ErrorBoundary';
import TeamMembers from '../modules/team/TeamMembers';
import {ActionProvider} from '../state/action-state';

const Home: FC = () => {
  return (
    <ActionProvider>
      <LayoutWrapper>
        <Main>
          <Heading1>Meet the Team</Heading1>
          <ActionToolbar />
          <ErrorBoundary>
            <TeamMembers />
          </ErrorBoundary>
        </Main>
      </LayoutWrapper>
    </ActionProvider>
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
