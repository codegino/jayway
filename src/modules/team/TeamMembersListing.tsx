import React, {FC, Suspense, useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled';
import type {TeamMember} from '../../models/team-member';
import {useActionState} from '../../state/action-state';
import {generateRandomColor} from '../../utils/color-generator';
import {mq} from '../../utils/media-query';
import EmptyList from './EmptyList';
import GridCardSkeleton from './GridCardSkeleton';
import ListCardSkeleton from './ListCardSkeleton';

const GridViewCard = React.lazy(() => import('./GridViewCard'));
const ListViewCard = React.lazy(() => import('./ListViewCard'));

export const TeamMembers: FC = () => {
  const {error, loading, data: users} = useFetchTeam();

  // To trigger error boundary.
  if (error) {
    throw error;
  }

  const {view, sort, filter} = useActionState();

  if (filter === 'ERROR') {
    throw new Error('Forced Error');
  }

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
      {loading && <FallbackComponent view={view} />}
      {filter && filteredList.length === 0 && <EmptyList />}

      <Suspense fallback={<FallbackComponent view={view} />}>
        {/* If list becomes too many,
        we can use react-window or react-virual
        to improve performance. */}
        <View>
          {sortedList.map((user: TeamMember) => (
            <Card key={user.email} {...user} />
          ))}
        </View>
      </Suspense>
    </>
  );
};

// This custom hook might not be necessary, but it will simplify the main component.
// Or possibly, it can be converted to a more generic fetching hook.
const useFetchTeam = () => {
  const [data, setData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // To prevent memory leak in finally block
  const mountedRef = useRef<boolean>(false);

  // We can use React Query, SWR, or render-as-you-fetch, etc. to fetch data from the API
  // which will make this component a lot simpler.
  //
  // For the sake of this exercise, I'll use a simple useEffect.
  useEffect(() => {
    mountedRef.current = true;
    setLoading(true);
    // OPTIONAL: We can store the URL in .env variable
    fetch('https://randomuser.me/api/?results=50')
      .then(async res => {
        const body = await res.json();
        if (res.status >= 400 && res.status < 600) {
          throw new Error(body.message);
        }
        return body;
      })
      .then(res => {
        setData(
          res.results.map((user: TeamMember) => ({
            ...user,
            color: generateRandomColor(),
          })),
        );
        setError(null);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => {
        mountedRef.current && setLoading(false);
      });

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {data, loading, error};
};

const FallbackComponent: FC<{view: 'grid' | 'list'}> = ({view}) => {
  const View = view === 'grid' ? GridView : ListView;
  const Card = view === 'grid' ? GridCardSkeleton : ListCardSkeleton;

  return (
    <View role="alert" aria-busy aria-label="Loading">
      {Array.from({length: 10}, (_, i) => (
        <Card key={i} />
      ))}
    </View>
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
