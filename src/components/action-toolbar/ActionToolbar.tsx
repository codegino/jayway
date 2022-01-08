import React, {FunctionComponent} from 'react';
import styled from '@emotion/styled';
import {mq} from '../../utils/media-query';
import {ViewToggle} from './ViewToggle';

const ActionToolbar: FunctionComponent = () => {
  return (
    <GridContainer>
      <ViewToggle className="view-button" />
    </GridContainer>
  );
};

const GridContainer = styled.div({
  display: 'grid',
  width: '100%',
  position: 'relative',
  gridTemplateColumns: '1fr 1fr',
  marginBottom: 18,
  [mq('md')]: {
    gridTemplateColumns: '33px 1fr 1fr',
  },
  gap: 10,
  '& .view-button': {
    textAlign: 'right',
    order: 3,
  },
});

export default ActionToolbar;
