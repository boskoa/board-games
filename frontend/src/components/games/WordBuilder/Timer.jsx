import React from 'react';
import {
  Paper, Stack, styled, Tooltip, Typography, Zoom,
} from '@mui/material';

const ClockPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'time',
})(({ theme, time }) => ({
  borderRadius: 50,
  width: '100px',
  height: '100px',
  backgroundColor: time > 10 ? theme.palette.success.main : theme.palette.error.main,
  color: theme.palette.success.contrastText,
}));

const Timer = ({ time, setTime }) => (
  <Stack alignSelf="center" sx={{ mt: 'auto' }}>
    <Tooltip
      TransitionComponent={Zoom}
      title={<Typography variant="body2">Stop</Typography>}
    >
      <ClockPaper
        elevation={9}
        time={time}
        onClick={() => {
          if (time !== 60) {
            setTime(0);
          }
        }}
      >
        <Stack justifyContent="center" alignItems="center" sx={{ mt: '20%' }}>
          <Typography variant="h3">{time}</Typography>
        </Stack>
      </ClockPaper>
    </Tooltip>
  </Stack>
);

export default Timer;
