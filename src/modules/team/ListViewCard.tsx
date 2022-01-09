import React, {FC} from 'react';
import styled from '@emotion/styled';
import Heading2 from '../../components/typography/Heading2';
import Heading3 from '../../components/typography/Heading3';
import _EmailIcon from '../../icons/mail.svg';
import _PhoneIcon from '../../icons/phone.svg';
import type {TeamMember} from '../../models/team-member';
import {mq} from '../../utils/media-query';
import MemberImage from './MemberImage';

const WideCard: FC<TeamMember> = ({
  picture,
  name,
  location,
  color,
  email,
  phone,
}) => {
  const fullName = `${name.first} ${name.last}`;

  return (
    <Container data-testid="list-card">
      <LeftCurve color={color} />

      <MainDetails>
        <Picture size={80} picture={picture} alt={fullName} title={fullName} />
        <BasicInfo>
          <Heading2>{fullName}</Heading2>
          <Heading3>{location.city}</Heading3>
        </BasicInfo>
        <ContactInfo>
          <a
            href={`mailto:${email}`}
            title={`Email ${fullName}`}
            aria-label={`Email ${fullName}`}
          >
            <EmailIcon src={_EmailIcon} alt={email} />
          </a>
          <a href={`tel:${phone}`}>
            <PhoneIcon
              src={_PhoneIcon}
              title={`Call ${fullName}`}
              aria-label={`Call ${fullName}`}
              alt={phone}
            />
          </a>
        </ContactInfo>
      </MainDetails>
    </Container>
  );
};

const ContactInfo = styled.div({
  position: 'absolute',
  right: 21,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 51,
  alignSelf: 'flex-end',
  [mq('sm')]: {
    right: 33,
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
  '& h2': {
    fontSize: 18,
    lineHeight: '21.04px',
    color: '#000000',
    [mq('sm')]: {
      // There are inconsistent letter spacing in Figma
      // I will just ignore here
      // letterSpacing: '0.01em',
    },
  },
  '& h3': {
    color: '#292929',
    fontSize: 13,
    lineHeight: '16px',
    [mq('sm')]: {
      marginTop: 3.56,
      fontSize: 14,
      lineHeight: '17px',
    },
  },
});

const Picture = styled(MemberImage)<{size: number}>(props => ({
  position: 'absolute',
  borderRadius: '50%',
  overflow: 'hidden',
  left: props.size / -2,
  height: props.size,
  width: props.size,
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))',
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

const EmailIcon = styled.img({
  width: 22,
  height: 22,
});

const PhoneIcon = styled.img({
  width: 19,
  height: 19,
});

export default React.memo(WideCard);
