import React, {FunctionComponent} from 'react';
import styled from '@emotion/styled';
import {mq} from '../../utils/media-query';
import {SearchBox} from './SearchBox';
import {Sorter} from './Sorter';
import {ViewToggle} from './ViewToggle';

const ActionToolbar: FunctionComponent = () => {
  return (
    <GridContainer>
      <Sorter className="sort-button" />
      <SearchBox className="input-wrapper" />
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
  gap: 25,

  [mq('md')]: {
    gap: 10,
    gridTemplateColumns: '33px 1fr 1fr',
  },
  '& .sort-button': {
    textAlign: 'left',
    order: 1,
  },
  '& .input-wrapper': {
    order: 0,
    gridColumn: 'span 2',
    [mq('md')]: {
      order: 2,
      width: '100%',
      maxWidth: 313,
      gridColumn: 'span 1',
    },
  },
  '& .view-button': {
    textAlign: 'right',
    order: 3,
  },
});

export default ActionToolbar;
