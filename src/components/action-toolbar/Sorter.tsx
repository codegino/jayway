import React, {FC} from 'react';
import styled from '@emotion/styled';
import SortIcon from '../../icons/sort.svg';
import {useActionState} from '../../state/action-state';
import {mq} from '../../utils/media-query';

export const Sorter: FC<{className: string}> = props => {
  const {dispatch, sort} = useActionState();

  const handleSort = () => {
    dispatch({type: 'sort', payload: sort === 'asc' ? 'desc' : 'asc'});
  };
  return (
    <div
      {...props}
      onClick={handleSort}
      onKeyPress={handleSort}
      tabIndex={0}
      role="button"
      title={`Switch to ${sort === 'asc' ? 'descending' : 'ascending'}`}
      aria-label={`Switch to ${sort === 'asc' ? 'descending' : 'ascending'}`}
      style={{
        transform: sort === 'asc' ? '' : 'scaleY(-1)',
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      <StyledSortIcon src={SortIcon} alt="sort" />
    </div>
  );
};

const StyledSortIcon = styled.img({
  width: 29.97,
  height: 23,
  [mq('sm')]: {
    width: 31.09,
  },
});
