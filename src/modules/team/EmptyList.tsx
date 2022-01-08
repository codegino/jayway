import React, {FC} from 'react';
import styled from '@emotion/styled';
import {ReactComponent as ErrorImage} from '../../icons/tired-man.svg';

const EmptyList: FC = () => (
  <Container role="alert" aria-label="No results found">
    <div className="content">
      <h2>I did my best, but I guess my best wasn&lsquo;t good enough...</h2>
    </div>
    <ErrorImage className="empty-list-image" viewBox="0 0 1500 1200" />
  </Container>
);

// Another way to use emotion
const Container = styled.div`
  position: relative;
  height: 100%;
  text-align: center;
  width: 100%;
  height: 100%;
  max-height: 40rem;
  min-width: 20rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .content {
    background-color: #fff;
    width: 100%;
    text-align: center;
  }

  .empty-list-image {
    background-color: #fff;
    position: relative;
    top: 0;
    height: 70%;
    width: 100%;
  }

  h2 {
    padding: 0 0.5rem;
  }
`;

export default EmptyList;
