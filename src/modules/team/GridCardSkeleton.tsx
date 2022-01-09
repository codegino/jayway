import React, {FC} from 'react';
import styled from '@emotion/styled';
import Heading2 from '../../components/typography/Heading2';
import Heading3 from '../../components/typography/Heading3';
import {mq} from '../../utils/media-query';

const GridCardSkeleton: FC = () => {
  const color = '#efefef';

  return (
    <Container color={color}>
      <MainDetails>
        <Heading2 />
        <Picture />

        <BottomRightCurveContainer color={color} />
      </MainDetails>

      <ExtraDetails>
        <Heading3 />
        <ContactInfo>
          <Icon />
          <Icon />
        </ContactInfo>
      </ExtraDetails>
    </Container>
  );
};

// Some styles here are similar in ListViewCard,
// but I intentionaly will not extract to save some time.
// This will be more organized in actual project.

const Container = styled.section<{color: string}>(props => ({
  display: 'flex',
  flexDirection: 'column',
  height: 220,
  width: 135,
  backgroundColor: props.color,
  borderRadius: 20,
  overflow: 'hidden',

  [mq('sm')]: {
    height: 342,
    width: 210,
  },
}));

const Picture = styled.div({
  position: 'absolute',
  bottom: '-25%',
  borderRadius: '50%',
  overflow: 'hidden',
  height: 80,
  width: 80,
  backgroundColor: '#eaeaea',
  border: '1px solid #fbfbfb',
  zIndex: 1,
  [mq('sm')]: {
    height: 100,
    width: 100,
  },
});

const MainDetails = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  position: 'relative',
  borderBottomRightRadius: 42,
  '& h2': {
    position: 'absolute',
    top: 30,
    textAlign: 'center',
    padding: '0 1rem',
    height: 16,
    width: 60,
    [mq('sm')]: {
      top: 60,
      width: 90,
      height: 21,
    },
    backgroundColor: '#dadada',
    borderRadius: 20,
  },
});

const BottomRightCurveContainer = styled.div<{color: string}>(props => ({
  backgroundColor: 'white',
  position: 'absolute',
  bottom: 0,
  right: 0,
  height: 27,
  width: 27,
  border: 'none',

  [mq('sm')]: {
    height: 42,
    width: 42,
  },

  '&::after': {
    content: '""',
    backgroundColor: props.color,
    position: 'absolute',
    borderBottomRightRadius: 27,
    height: '100%',
    width: '100%',
    [mq('sm')]: {
      borderBottomRightRadius: 42,
    },
  },
}));

const ContactInfo = styled.div({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  bottom: 17.84,
  width: 32.81,

  [mq('sm')]: {
    bottom: 34,
    width: 51,
  },
});

const ExtraDetails = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  borderTopLeftRadius: 42,
  height: '100%',
  '& h3': {
    backgroundColor: '#eaeaea',
    height: 16,
    borderRadius: 20,
    width: 80,
    [mq('sm')]: {
      width: 90,
      height: 21,
    },
  },
});

const Icon = styled.div({
  width: 14.15,
  height: 14.15,
  borderRadius: 8,
  backgroundColor: '#eaeaea',
  [mq('sm')]: {
    width: 22,
    height: 22,
  },
});

export default React.memo(GridCardSkeleton);
