import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render} from '../__mocks__/app-renderer';
import {createTeamMember} from '../__mocks__/team-member';

test('Toggle Grid and List view', async () => {
  render();

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

test('Display error message on backend error', async () => {
  server.use(
    rest.get(`https://randomuser.me/api`, async (req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'Error from server',
        }),
      );
    }),
  );
  render();

  await waitFor(() => {
    expect(
      screen.getByRole('alert', {name: 'error boundary'}),
    ).toHaveTextContent('Ooops!!! Something went wrong.');
  });

  expect(screen.getByRole('alert', {name: 'error boundary'})).toHaveTextContent(
    'Error from server',
  );
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

beforeEach(() => {
  // To hide the error message in Error Boundary
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  server.resetHandlers();
  jest.restoreAllMocks();
});
