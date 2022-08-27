import React from 'react';
import { Stack } from '@mui/material';
import AvatarComponent from './AvatarComponent';
import PersonalData from './PersonalData';

const UserSettings = ({ user }) => (
  <Stack>
    <PersonalData user={user} />
    <AvatarComponent id={user.id} />
  </Stack>
);

export default UserSettings;
