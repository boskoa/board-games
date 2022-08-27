import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllUsers } from './usersSlice';

const Users = () => {
  const users = useSelector(selectAllUsers);

  return (
    users.map((u) => (
      <Link
        key={u.username}
        to={u.username}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {u.name}
      </Link>
    ))
  );
};

export default Users;
