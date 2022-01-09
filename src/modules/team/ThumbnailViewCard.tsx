import React, {FC} from 'react';
import styled from '@emotion/styled';
import Heading2 from '../../components/typography/Heading2';
import Heading3 from '../../components/typography/Heading3';
import _EmailIcon from '../../icons/mail.svg';
import _PhoneIcon from '../../icons/phone.svg';
import type {TeamMember} from '../../models/team-member';
import {mq} from '../../utils/media-query';
import MemberImage from './MemberImage';

const ThumbnailCard: FC<TeamMember> = ({
  name,
  picture,
  location,
  color,
  email,
  phone,
}) => {
  const fullName = `${name.first} ${name.last}`;
  return (
    <Container color={color} data-testid="thumbnail-card">
      <MainDetails>
        <Heading2>{fullName}</Heading2>
        <Picture picture={picture} alt={fullName} title={fullName} />

        <BottomRightCurveContainer color={color} />
      </MainDetails>

      <ExtraDetails>
        <Heading3>{location.city}</Heading3>
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
      </ExtraDetails>
    </Container>
  );
};

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

const Picture = styled(MemberImage)({
  position: 'absolute',
  borderRadius: '50%',
  overflow: 'hidden',
  // There are many ways to center the image.
  bottom: -40,
  height: 80,
  width: 80,
  zIndex: 1,
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))',
  [mq('sm')]: {
    bottom: -50,
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
    color: '#000000',
    textAlign: 'center',
    padding: '0 0.25rem',
    fontSize: 14,
    lineHeight: '16px',
    [mq('sm')]: {
      fontSize: 18,
      lineHeight: '21px',
      padding: '0 0.5rem',
      top: 60,

      // There are inconsistent letter spacing in Figma
      // I will just ignore here
      // letterSpacing: '0.01em',
    },
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
  bottom: 17.62,
  width: 32.81,
  height: 14.15,

  [mq('sm')]: {
    bottom: 34,
    width: 51,
    height: 22,
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
  textAlign: 'center',

  '& h3': {
    padding: '0 0.25rem',
    position: 'absolute',
    bottom: 40,
    fontSize: 13,
    lineHeight: '15.6px',
    [mq('sm')]: {
      fontSize: 12,
      lineHeight: '14px',
      bottom: 74,
      padding: '0 0.5rem',
    },
  },
});

const EmailIcon = styled.img({
  width: 14.15,
  height: 14.15,
  [mq('sm')]: {
    width: 22,
    height: 22,
  },
});

const PhoneIcon = styled.img({
  width: 12.22,
  height: 12.22,
  [mq('sm')]: {
    width: 19,
    height: 19,
  },
});

export default React.memo(ThumbnailCard);
