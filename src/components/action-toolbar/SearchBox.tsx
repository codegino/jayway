import React, {FC} from 'react';
import styled from '@emotion/styled';
import SearchIcon from '../../icons/search.svg';
import {useActionState} from '../../state/action-state';
import {mq} from '../../utils/media-query';
import Input from '../elements/Input';

export const SearchBox: FC<{className: string}> = props => {
  const {dispatch, filter} = useActionState();

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type: 'filter', payload: e.target.value});
  };

  return (
    <SearchWrapper {...props}>
      <StyledSearchIcon src={SearchIcon} alt="sort" />
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
});

const StyledSearchIcon = styled.img({
  width: 17.4,
  height: 17.25,
  position: 'absolute',
  [mq('sm')]: {
    width: 18.67,
    height: 18,
  },
});
