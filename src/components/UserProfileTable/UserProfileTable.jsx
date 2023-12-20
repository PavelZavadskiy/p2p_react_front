import { UserBlock } from './UserProfileTable.styled';

export const UserProfileTable = ({ user }) => {
  return (
    user && (
      <UserBlock>
          <img src={user.avatar} alt="" width="32" height="32" />
          <p>{user.email}</p>
      </UserBlock>
    )
  );
};
