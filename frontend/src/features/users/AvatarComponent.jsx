import {
  Stack, Input, Button, Paper, Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDic } from '../dictionary/dictionarySlice';
import { changeAvatar } from './usersSlice';

const AvatarComponent = ({ id }) => {
  const dic = useSelector(selectDic);
  const [name, setName] = useState(dic.setAvatar);
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);
    const result = await axios.post(`http://localhost:3003/api/avatar/${id}`, formData);
    dispatch(changeAvatar({ id, avatar: result.data.path }));
  };

  return (
    <Paper sx={{ mb: 2, padding: 2 }}>
      <Stack>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {dic.setAvatar}
        </Typography>
        <form id="avatar-form" encType="multipart/form-data">
          <label htmlFor="avatar">
            <Input
              sx={{ display: 'none' }}
              id="avatar"
              type="file"
              name="avatar"
              onChange={(e) => {
                const valueArray = e.target.value.split('\\');
                setName(valueArray[valueArray.length - 1]);
                setFile(e.target.files[0]);
              }}
            />
            <Button
              variant="contained"
              component="span"
              size="small"
              sx={{ textTransform: 'none' }}
            >
              {name}
            </Button>
          </label>
          <Button
            type="submit"
            variant="contained"
            component="span"
            size="small"
            sx={{ textTransform: 'none', ml: 3 }}
            onClick={(e) => handleSubmit(e)}
          >
            {dic.set}
          </Button>
        </form>
      </Stack>
    </Paper>
  );
};

export default AvatarComponent;
