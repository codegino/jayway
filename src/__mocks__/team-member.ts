import * as faker from 'faker';
import type {TeamMember} from '../models/team-member';
import {generateRandomColor} from '../utils/color-generator';

export const createTeamMember = (
  overrides: Partial<TeamMember> = {},
): TeamMember => ({
  color: generateRandomColor(),
  email: faker.internet.email(),
  location: {
    city: faker.address.city(),
  },
  name: {
    first: faker.name.firstName(),
    last: faker.name.lastName(),
  },
  phone: faker.phone.phoneNumber(),
  picture: {
    large: faker.image.avatar(),
    medium: faker.image.avatar(),
    thumbnail: faker.image.avatar(),
  },
  ...overrides,
});
