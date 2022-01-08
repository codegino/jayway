import React, {FC, Suspense, useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled';
import type {TeamMember} from '../../models/team-member';
import {useActionState} from '../../state/action-state';
import {generateRandomColor} from '../../utils/color-generator';
import {mq} from '../../utils/media-query';

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

  const {view} = useActionState();

  const View = view === 'grid' ? GridView : ListView;
  const Card = view === 'grid' ? GridViewCard : ListViewCard;

  return (
    <>
      <Suspense fallback={<div>Fallback component</div>}>
        <View>
          {users.map((user: TeamMember) => (
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
