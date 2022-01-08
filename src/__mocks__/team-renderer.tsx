import React from 'react';
import {render as rtlRender} from '@testing-library/react';
import App from '../App';
import {waitForLoadingToStartAndFinish} from './helper';

// A pattern suggested by testing-library creator.
// We can put here wrapper or any other stuff that is needed
// to mimic actual app environment.

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const render = async (props = {}) => {
  const renderer = rtlRender(<App {...props} />);

  await waitForLoadingToStartAndFinish();

  return renderer;
};
