import React, {FunctionComponent} from 'react';
import styled from '@emotion/styled';
import {mq} from '../../utils/media-query';

const Heading3: FunctionComponent<JSX.IntrinsicElements['h3']> = props => {
  return <Element {...props} />;
};

const Element = styled.h3({
  fontFamily: 'Lato',
  fontWeight: 400,
  lineHeight: '14.4px',
  fontSize: 13,
  margin: 0,
  [mq('sm')]: {
    fontSize: 14,
    lineHeight: '21.04px',
  },
});

export default Heading3;
