import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render} from '../__mocks__/app-renderer';
import {createTeamMember} from '../__mocks__/team-member';

// This type of tests resembles actual user behavior
// If you prefer to write tests in a granular level(Unit Test), I'm very much familiar with that as well.
// Less code, more confidence.

// We can group tests using `describe` if you prefer it that way.

// I don't know what selector you prefer, so I'll mix regex version and exact string version.

test('Toggle Grid and List view', async () => {
  render();

  // Grid view by default
  expect(screen.getByRole('button', {name: /grid view/i})).toBeInTheDocument();
  expect(await screen.findAllByTestId('thumbnail-card')).toHaveLength(2);
  expect(screen.queryAllByTestId('list-card')).toHaveLength(0);

  // Toggle to list view
  userEvent.click(screen.getByRole('button', {name: /grid view/i}));
  expect(screen.getByRole('button', {name: /list view/i})).toBeInTheDocument();
  expect(await screen.findAllByTestId('list-card')).toHaveLength(2);
  expect(screen.queryAllByTestId('thumbnail-card')).toHaveLength(0);

  // Toggle back to grid view
  userEvent.click(screen.getByRole('button', {name: /list view/i}));
  expect(screen.getByRole('button', {name: /grid view/i})).toBeInTheDocument();
  expect(await screen.findAllByTestId('thumbnail-card')).toHaveLength(2);
  expect(screen.queryAllByTestId('list-card')).toHaveLength(0);
});

test('Display error message and image on backend error', async () => {
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
      // We can use regex, for other tests I'll simply copy paste the message
    ).toHaveTextContent(/ooops!!! something went wrong\./i);
  });

  expect(screen.getByRole('alert', {name: 'error boundary'})).toHaveTextContent(
    'Error from server',
  );
  expect(
    screen.getByRole('img', {name: 'Something went wrong'}),
  ).toBeInTheDocument();
});

// Mocking backend data starts here
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
// Mocking backend data ends here

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
