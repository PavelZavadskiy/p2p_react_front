export const ChooseCurrentUser = ({ users, handleOnChangeCurrentUser }) => {

  const handleOnChooseUser = (e) => {
    if(e.target.value>=0)
      handleOnChangeCurrentUser(users[e.target.value]);
    else handleOnChangeCurrentUser(null);
  }

  return users && (
    <div className="wrapper">
          <select name="selectUser" onChange={handleOnChooseUser}>
            <option value={-1} key={-1}>Choose Current user</option>
            {users.map(item => (
              <option value={item.id} key={item.id}>{item.email}</option>
            ))}
          </select>
        </div>
  );
}
