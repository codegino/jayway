import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import App from '../App';
import {createTeamMember} from '../__mocks__/team-member';

test('Toggle Grid and List view', async () => {
  render(<App />);

  // Grid view by default
  expect(screen.getByRole('button', {name: /grid view/i})).toBeInTheDocument();
  expect(await screen.findAllByTestId('grid-card')).toHaveLength(2);
  expect(screen.queryAllByTestId('list-card')).toHaveLength(0);

  // Toggle to list view
  userEvent.click(screen.getByRole('button', {name: /grid view/i}));
  expect(screen.getByRole('button', {name: /list view/i})).toBeInTheDocument();
  expect(await screen.findAllByTestId('list-card')).toHaveLength(2);
  expect(screen.queryAllByTestId('grid-card')).toHaveLength(0);

  // Toggle back to grid view
  userEvent.click(screen.getByRole('button', {name: /list view/i}));
  expect(screen.getByRole('button', {name: /grid view/i})).toBeInTheDocument();
  expect(await screen.findAllByTestId('grid-card')).toHaveLength(2);
  expect(screen.queryAllByTestId('list-card')).toHaveLength(0);
});

const mockTeamMembers = [createTeamMember(), createTeamMember()];

const server = setupServer(
  rest.get(`https://randomuser.me/api`, async (req, res, ctx) => {
    return res(
      ctx.json({
        results: mockTeamMembers,
      }),
    );
  }),
);

afterAll(() => {
  server.close();
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  jest.restoreAllMocks();
});
