import React, {FC} from 'react';
import styled from '@emotion/styled';
import Heading2 from '../../components/typography/Heading2';
import Heading3 from '../../components/typography/Heading3';
import _EmailIcon from '../../icons/mail.svg';
import _PhoneIcon from '../../icons/phone.svg';
import type {TeamMember} from '../../models/team-member';
import EmployeeImage from './Image';

const WideCard: FC<TeamMember> = ({picture, name, location, email, phone}) => {
  const fullName = `${name.first} ${name.last}`;

  return (
    <Container data-testid="list-card">
      <MainDetails>
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 50,
  alignSelf: 'flex-end',
});

const BasicInfo = styled.div({
  alignSelf: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',

  '& h2': {
    fontSize: 18,
    lineHeight: '21px',
  },
  '& h3': {
    fontSize: 13,
    lineHeight: '16px',
  },
});

const MainDetails = styled.section({
  display: 'flex',
  justifyContent: 'space-between',
  paddingRight: 33,
  position: 'relative',
  width: '100%',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  padding: '20px 16.5px 20px 60px',
  zIndex: 1,
});

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

export default WideCard;
