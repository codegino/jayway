import React, {FunctionComponent} from 'react';
import styled from '@emotion/styled';
import {mq} from '../../utils/media-query';

const Heading2: FunctionComponent<JSX.IntrinsicElements['h1']> = props => {
  return <Element {...props} />;
};

const Element = styled.h2({
  margin: 0,
  fontFamily: 'Karla',
  fontWeight: 700,
  lineHeight: '16.37px',
  fontSize: 14,
  [mq('sm')]: {
    fontSize: 18,
    lineHeight: '21px',
  },
});

export default Heading2;
