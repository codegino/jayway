import React from 'react';
import {screen} from '@testing-library/react';
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

test('Toggle Filter by name', async () => {
  render();

  // Check default contents
  const thumbnailCards = await screen.findAllByTestId('thumbnail-card');
  expect(thumbnailCards).toHaveLength(2);
  expect(thumbnailCards[0]).toHaveTextContent('AAA');
  expect(thumbnailCards[1]).toHaveTextContent('ABC');

  // Filter name with value `AB`
  userEvent.type(
    screen.getByRole('searchbox', {name: /search by name/i}),
    'AB',
  );
  expect(await screen.findAllByTestId('thumbnail-card')).toHaveLength(1);

  // Filter name with no matching value
  userEvent.type(
    screen.getByRole('searchbox', {name: 'Search by name'}),
    'Should not exist',
  );
  expect(screen.queryAllByTestId('thumbnail-card')).toHaveLength(0);
  expect(
    screen.getByRole('alert', {name: 'No results found'}),
  ).toBeInTheDocument();
  expect(screen.getByRole('img', {name: 'Empty list'})).toBeInTheDocument();

  // Clear filter to show default contents
  userEvent.clear(screen.getByRole('searchbox', {name: 'Search by name'}));
  expect(await screen.findAllByTestId('thumbnail-card')).toHaveLength(2);
});

test('Show error message when input received `ERROR` value', async () => {
  render();

  userEvent.type(
    screen.getByRole('searchbox', {name: 'Search by name'}),
    'ERROR',
  );
  expect(screen.getByRole('alert')).toBeInTheDocument();
});

test('Toggle Sorting in ascending and descending order', async () => {
  render();

  // Check default sorting order
  const thumbnailCards = await screen.findAllByTestId('thumbnail-card');
  expect(thumbnailCards).toHaveLength(2);
  expect(thumbnailCards[0]).toHaveTextContent('AAA');
  expect(thumbnailCards[1]).toHaveTextContent('ABC');

  // Sort by descending order
  userEvent.click(screen.getByRole('button', {name: /switch to descending/i}));
  const sortedCards_1st = await screen.findAllByTestId('thumbnail-card');
  expect(sortedCards_1st[0]).toHaveTextContent('ABC');
  expect(sortedCards_1st[1]).toHaveTextContent('AAA');

  // Sort by descending order
  userEvent.click(screen.getByRole('button', {name: /switch to ascending/i}));
  const sortedCards_2nd = await screen.findAllByTestId('thumbnail-card');
  expect(sortedCards_2nd[0]).toHaveTextContent('AAA');
  expect(sortedCards_2nd[1]).toHaveTextContent('ABC');
});

// Mocking backend data starts here
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
