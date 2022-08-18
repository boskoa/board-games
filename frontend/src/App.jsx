import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  alreadyLogged, selectAllLogins, selectLoginIds, selectLoginsById,
} from './features/login/loginSlice';
import LoginModal from './features/login/LoginModal';
import { selectAllUsers } from './features/users/usersSlice';

const App = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);
  const logins = useSelector(selectAllLogins);
  const allLogins = useSelector((state) => state.login);
  const loggedUser = useSelector((state) => selectLoginsById(state, 1));
  const loginIds = useSelector(selectLoginIds);
  const hello = 'HAI MARK!';

  useEffect(() => {
    const loggedUser1 = window.localStorage.getItem('loggedGamerUser1');
    const loggedUser2 = window.localStorage.getItem('loggedGamerUser2');
    if (loggedUser1) dispatch(alreadyLogged(JSON.parse(loggedUser1)));
    if (loggedUser2) dispatch(alreadyLogged(JSON.parse(loggedUser2)));
  }, []);

  return (
    <div>
      <p>{hello}</p>
      <p>{JSON.stringify(users)}</p>
      <p>{JSON.stringify(logins)}</p>
      <p>{JSON.stringify(loggedUser)}</p>
      <p>{JSON.stringify(allLogins)}</p>
      <p>{loginIds}</p>
      <LoginModal user={2} />
    </div>
  );
};

export default App;
