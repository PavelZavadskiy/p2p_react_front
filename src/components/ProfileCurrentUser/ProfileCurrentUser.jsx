import { UserBlock, UserHeader } from './ProfileCurrentUser.styled';

export const ProfileCurrentUser = ({ user }) => {
  return (
    user && (
      <UserBlock>
        <UserHeader>
          <img src={user.avatar} alt="" width="32" height="32" />
          <p>{user.email}</p>
        </UserHeader>
        <p>{user.balance_usdt} USDT</p>
        <p>{user.balance_btc} BTC</p>
        <p>{user.balance_eth} ETH</p>
        <p>{user.balance_dai} DAI</p>
      </UserBlock>
    )
  );
};
