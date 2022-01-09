import React, {FC} from 'react';
import styled from '@emotion/styled';
import ActionToolbar from '../components/action-toolbar/ActionToolbar';
import Heading1 from '../components/typography/Heading1';
import ErrorBoundary from '../modules/team/ErrorBoundary';
import TeamMembersListing from '../modules/team/TeamMembersListing';
import {ActionProvider} from '../state/action-state';
import {mq} from '../utils/media-query';

const Home: FC = () => {
  return (
    <ActionProvider>
      <LayoutWrapper>
        <Main>
          <Heading1>Meet the Team</Heading1>
          <ActionToolbar />
          <ErrorBoundary>
            <TeamMembersListing />
          </ErrorBoundary>
        </Main>
      </LayoutWrapper>
    </ActionProvider>
  );
};

const LayoutWrapper = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  minWidth: '20rem',
  padding: '0 3%',

  [mq('xs')]: {
    padding: '0 10%',
  },

  [mq('sm')]: {
    padding: '0 5%',
  },

  [mq('md')]: {
    padding: 0,
  },
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
  marginBottom: '2vh',
  '& h1': {
    width: '100%',
    textAlign: 'left',
    marginBottom: 32.01,

    [mq('sm')]: {
      marginBottom: 48,
    },
  },
});

export default Home;
