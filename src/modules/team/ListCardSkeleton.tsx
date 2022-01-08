import React, {FC} from 'react';
import styled from '@emotion/styled';
import Heading2 from '../../components/typography/Heading2';
import Heading3 from '../../components/typography/Heading3';
import {mq} from '../../utils/media-query';

const ListCardSkeleton: FC = () => {
  const color = '#efefef';

  return (
    <Container>
      <LeftCurve color={color} />

      <MainDetails>
        <Picture size={80} />
        <BasicInfo>
          <Heading2 />
          <Heading3 />
        </BasicInfo>
        <ContactInfo>
          <Icon />
          <Icon />
        </ContactInfo>
      </MainDetails>
    </Container>
  );
};

// Some styles here are similar in ListViewCard,
// but I intentionaly will not extract to same some time.
// This will be different in actual project.

const ContactInfo = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 50,
  alignSelf: 'flex-end',
  [mq('sm')]: {
    alignSelf: 'center',
  },
});

const BasicInfo = styled.div({
  alignSelf: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  [mq('sm')]: {
    alignSelf: 'center',
  },
  '& h2, & h3': {
    fontSize: 18,
    lineHeight: '21px',
    backgroundColor: '#dadada',
    borderRadius: 20,
    height: 16,
    marginBottom: 5,
    width: 100,
    [mq('sm')]: {
      top: 60,
      width: 120,
      height: 21,
    },
  },
  '& h3': {
    width: 90,
    [mq('sm')]: {
      width: 100,
    },
  },
});

const Picture = styled.div<{size: number}>(props => ({
  position: 'absolute',
  borderRadius: '50%',
  overflow: 'hidden',
  left: props.size / -2,
  height: props.size,
  width: props.size,
  backgroundColor: '#eaeaea',
  border: '1px solid #fbfbfb',
}));

const MainDetails = styled.section({
  display: 'flex',
  justifyContent: 'space-between',
  paddingRight: 33,
  position: 'relative',
  width: '100%',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderTopLeftRadius: 42,
  padding: '20px 16.5px 20px 60px',
  zIndex: 1,
});

const LeftCurve = styled.div<{color: string}>(props => ({
  backgroundColor: props.color,
  height: '100%',
  width: 100,
  position: 'relative',
  '&::before': {
    content: '""',
    width: 60,
    height: '100%',
    position: 'absolute',
    right: -60,
    backgroundColor: props.color,
  },
}));

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  borderRadius: 20,
  overflow: 'hidden',
  minWidth: 300,
  width: '100%',
  height: 100,
});

const Icon = styled.div({
  width: 22,
  height: 22,
  borderRadius: 8,
  backgroundColor: '#eaeaea',
});

export default ListCardSkeleton;
