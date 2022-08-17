import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from './features/users/usersSlice';

const App = () => {
  const users = useSelector(selectAllUsers);
  const hello = 'HAI MARK!';

  return (
    <div>
      <p>{hello}</p>
      <p>{JSON.stringify(users)}</p>
    </div>
  );
};

export default App;
