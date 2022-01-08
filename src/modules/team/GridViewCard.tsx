import React, {FC} from 'react';
import styled from '@emotion/styled';
import Heading2 from '../../components/typography/Heading2';
import Heading3 from '../../components/typography/Heading3';
import _EmailIcon from '../../icons/mail.svg';
import _PhoneIcon from '../../icons/phone.svg';
import type {TeamMember} from '../../models/team-member';
import EmployeeImage from './Image';

const GridCard: FC<TeamMember> = ({
  name,
  picture,
  location,
  color,
  email,
  phone,
}) => {
  const fullName = `${name.first} ${name.last}`;
  return (
    <Container color={color} data-testid="grid-card">
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
}));

const Picture = styled(EmployeeImage)({
  position: 'absolute',
  bottom: '-25%',
  borderRadius: '50%',
  overflow: 'hidden',
  height: 80,
  width: 80,
  zIndex: 1,
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
    top: 25,
    textAlign: 'center',
    padding: '0 0.25rem',
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

  '&::after': {
    content: '""',
    backgroundColor: props.color,
    position: 'absolute',
    borderBottomRightRadius: 27,
    height: '100%',
    width: '100%',
  },
}));

const ContactInfo = styled.div({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  bottom: 17.84,
  width: 32.81,
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
  },
});

const EmailIcon = styled.img({
  width: 14.15,
  height: 14.15,
});

const PhoneIcon = styled.img({
  width: 12.22,
  height: 12.22,
});

export default GridCard;
