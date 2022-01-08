export type TeamMember = {
  phone: string;
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  color: string;
  name: {
    first: string;
    last: string;
  };
  location: {
    city: string;
  };
};
