import React from 'react';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render} from '../__mocks__/app-renderer';
import {createTeamMember} from '../__mocks__/team-member';

test('Toggle Filter', async () => {
  render();

  const gridCards = await screen.findAllByTestId('grid-card');

  expect(gridCards).toHaveLength(2);

  expect(gridCards[0]).toHaveTextContent('AAA');
  expect(gridCards[1]).toHaveTextContent('ABC');

  userEvent.type(screen.getByRole('searchbox', {name: 'Search by name'}), 'AB');

  expect(await screen.findAllByTestId('grid-card')).toHaveLength(1);

  userEvent.type(
    screen.getByRole('searchbox', {name: 'Search by name'}),
    'Should not exist',
  );
  expect(screen.queryAllByTestId('grid-card')).toHaveLength(0);
  expect(
    screen.getByRole('alert', {name: 'No results found'}),
  ).toBeInTheDocument();

  userEvent.clear(screen.getByRole('searchbox', {name: 'Search by name'}));

  expect(await screen.findAllByTestId('grid-card')).toHaveLength(2);
});

test('Show error message when input received `ERROR`', async () => {
  render();

  userEvent.type(
    screen.getByRole('searchbox', {name: 'Search by name'}),
    'ERROR',
  );

  expect(screen.getByRole('alert')).toBeInTheDocument();
});

test('Toggle Sorting', async () => {
  render();

  const gridCards = await screen.findAllByTestId('grid-card');

  expect(gridCards).toHaveLength(2);

  expect(gridCards[0]).toHaveTextContent('AAA');
  expect(gridCards[1]).toHaveTextContent('ABC');

  userEvent.click(screen.getByRole('button', {name: /switch to descending/i}));

  const sortedGridCards_1st = await screen.findAllByTestId('grid-card');

  expect(sortedGridCards_1st[0]).toHaveTextContent('ABC');
  expect(sortedGridCards_1st[1]).toHaveTextContent('AAA');

  userEvent.click(screen.getByRole('button', {name: /switch to ascending/i}));

  const sortedGridCards_2nd = await screen.findAllByTestId('grid-card');

  expect(sortedGridCards_2nd[0]).toHaveTextContent('AAA');
  expect(sortedGridCards_2nd[1]).toHaveTextContent('ABC');
});

const mockTeamMembers = [
  createTeamMember({
    name: {
      first: 'AAA',
      last: 'BBB',
    },
  }),
  createTeamMember({
    name: {
      first: 'ABC',
      last: 'BBB',
    },
  }),
];

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
