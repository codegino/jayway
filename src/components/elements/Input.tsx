import React from 'react';
import type {FunctionComponent} from 'react';
import styled from '@emotion/styled';

const Input: FunctionComponent<JSX.IntrinsicElements['input']> = props => {
  return <Element {...props} />;
};

const Element = styled.input({
  border: 'none',
  paddingLeft: 25,
  '&:focus': {
    outline: 'none',
  },
  width: '100%',
  paddingBottom: 3,
  backgroundColor: 'transparent',
});

export default Input;
