import React, {FC} from 'react';
import styled from '@emotion/styled';
import SearchIcon from '../../icons/search.svg';
import {useActionState} from '../../state/action-state';
import {mq} from '../../utils/media-query';
import Input from '../elements/Input';

export const SearchBox: FC<{className: string}> = props => {
  const {dispatch, filter} = useActionState();

  // We can improve the performance of filtering by debouncing the input + `useCallback`.
  // However, since the data is already loaded with only size of 50,
  // there is no deal-breaker advantage to this.
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type: 'filter', payload: e.target.value});
  };

  return (
    <SearchWrapper {...props}>
      <StyledSearchIcon src={SearchIcon} alt="Search" />
      <Input
        value={filter}
        role="searchbox"
        onChange={handleFilter}
        aria-label="Search by name"
        title="Search by name"
      />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div({
  position: 'relative',
  overflow: 'hidden',
  borderBottom: '2px solid #000000',
  height: 23,
  [mq('sm')]: {
    height: 24,
  },
});

const StyledSearchIcon = styled.img({
  width: 18.67,
  height: 18,
  position: 'absolute',
  top: 0,
  left: 0,
});
