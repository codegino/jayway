import React, {FC, Suspense, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import type {TeamMember} from '../../models/team-member';
import {useActionState} from '../../state/action-state';
import {generateRandomColor} from '../../utils/color-generator';
import {mq} from '../../utils/media-query';
import EmptyList from './EmptyList';

const GridViewCard = React.lazy(() => import('./GridViewCard'));
const ListViewCard = React.lazy(() => import('./ListViewCard'));

export const TeamMembers: FC = () => {
  const [users, setUsers] = useState<TeamMember[]>([]);

  // We can use React Query, SWR, or render-as-you-fetch, etc. to fetch data from the API
  // which will make this component a lot simpler.
  //
  // For the sake of this exercise, I'll use a simple useEffect.
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=50')
      .then(async res => {
        const body = await res.json();
        if (res.status >= 400 && res.status < 600) {
          throw new Error(body.message);
        }
        return body;
      })
      .then(res => {
        setUsers(
          res.results.map((user: TeamMember) => ({
            ...user,
            color: generateRandomColor(),
          })),
        );
      });
  }, []);

  const {view, filter, sort} = useActionState();

  // We can wrap these in `useMemo`, but these are not currently that computationally expensive.
  const filteredList = filter.length
    ? users.filter(user => {
        return new RegExp(filter, 'i').test(
          `${user.name.first} ${user.name.last}`.toLocaleLowerCase(),
        );
      })
    : users;

  const sortedList = filteredList.sort((a, b) => {
    if (sort === 'asc') {
      return a.name.first.localeCompare(b.name.first);
    } else {
      return b.name.first.localeCompare(a.name.first);
    }
  });

  const View = view === 'grid' ? GridView : ListView;
  const Card = view === 'grid' ? GridViewCard : ListViewCard;

  return (
    <>
      {filter && filteredList.length === 0 && <EmptyList />}

      <Suspense fallback={<div>Fallback component</div>}>
        <View>
          {sortedList.map((user: TeamMember) => (
            <Card key={user.email} {...user} />
          ))}
        </View>
      </Suspense>
    </>
  );
};

const GridView = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(135px, 1fr))',
  [mq('md')]: {
    gridTemplateColumns: 'repeat(3, minmax(210px, 1fr))',
  },
  gap: 31.91,
  [mq('sm')]: {
    gap: 48,
  },
});

const ListView = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  rowGap: 18,
});

export default TeamMembers;
