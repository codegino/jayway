import React, {FC} from 'react';
import styled from '@emotion/styled';
import type {TeamMember} from '../../models/team-member';

const EmployeeImage: FC<
  JSX.IntrinsicElements['img'] & Pick<TeamMember, 'picture'>
> = ({picture, alt, ...props}) => {
  return (
    <picture {...props}>
      <source media="(min-width:650px)" srcSet={picture.large} />

      {/* This is just to show how to optimize image loading in vanila HTML */}
      {/* <source media="(min-width:465px)" srcSet={picture.medium} /> */}
      {/* <Image srcSet={picture.thumbnail} alt={alt} /> */}

      {/* Since the smaller version looks terrible, I'll still load the larger image */}
      <Image srcSet={picture.large} alt={alt} />
    </picture>
  );
};

const Image = styled.img({
  height: '100%',
  width: '100%',
  backgroundColor: '#ffffff',
});

export default EmployeeImage;
