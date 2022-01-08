import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

export const waitForLoadingToStartAndFinish = async (): Promise<void> => {
  await waitFor(() => {
    expect(screen.getByRole('alert', {name: 'Loading'})).toBeInTheDocument();
  });
  await waitForElementToBeRemoved(() =>
    screen.getByRole('alert', {name: 'Loading'}),
  );
};
