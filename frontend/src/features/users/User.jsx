/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Avatar, Paper, Stack, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { selectAllUsers, selectUsersError, selectUsersStatus } from './usersSlice';
import { selectDic } from '../dictionary/dictionarySlice';
import { selectStats, userStats } from '../matches/matchesSlice';
import UserSettings from './UserSettings';

const User = () => {
  const { username } = useParams();
  const users = useSelector(selectAllUsers);
  const user = users.find((u) => u.username === username);
  const dic = useSelector(selectDic);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userStats(username));
  }, []);

  const stats = useSelector(selectStats);

  if (status === 'loading') {
    return <div />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user && !stats?.wins) {
    return <div />;
  }

  const avatar = `/${user.avatar}`;
  const avatarCondition = avatar === '/public/data/defaults/user_avatar';

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      flexWrap="wrap"
      sx={{ width: '100%' }}
    >
      <Paper sx={{ mb: 2, padding: 2, width: 486 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          sx={{ width: '100%' }}
        >
          <Stack justifyContent="center" alignItems="center" sx={{ width: 150, p: 1, marginRight: 1 }}>
            {avatarCondition
              ? <Avatar src={avatar} sx={{ height: 150, width: 150 }} />
              : <AccountCircle sx={{ height: 150, width: 150 }} />}
          </Stack>
          <Stack justifyContent="center" alignItems="flex-start" sx={{ p: 1, marginRight: 'auto' }}>
            <Typography variant="h6">{user.name}</Typography>
            <Typography>{dic.username}: {user.username}</Typography>
            <Typography>{dic.wins}: {stats.wins}</Typography>
            <Typography>{dic.loses}: {stats.loses}</Typography>
            <Typography>{dic.best}: {stats.best}</Typography>
            <Typography>{dic.worst}: {stats.worst}</Typography>
          </Stack>
        </Stack>
      </Paper>
      <UserSettings user={user} />
    </Stack>
  );
};

export default User;
