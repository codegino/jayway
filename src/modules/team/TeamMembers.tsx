import React, {FC, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import type {TeamMember} from '../../models/team-member';
import {generateRandomColor} from '../../utils/color-generator';

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

  return (
    <>
      <GridView>
        {users.map((user: TeamMember) => (
          <div key={user.email}>{user.email}</div>
        ))}
      </GridView>
    </>
  );
};

const GridView = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(210px, 1fr))',
  gap: 48,
});

export default TeamMembers;
