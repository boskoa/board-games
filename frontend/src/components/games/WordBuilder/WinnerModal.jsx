import styled from '@emotion/styled';
import {
  Backdrop, Modal, Stack, Paper, Slide, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectDic } from '../../../features/dictionary/dictionarySlice';

const MyPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '25%',
  left: '25%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  padding: 10,
  borderRadius: 3,
}));

const WinnerModal = ({
  openWinner, handleClose, potentialWinners,
}) => {
  const dic = useSelector(selectDic);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openWinner}
        onClose={() => handleClose(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={openWinner} direction="up">
          <MyPaper elevation={5}>
            <Stack direction="row" justifyContent="center">
              <Typography variant="h2">{`${potentialWinners[0]?.name} ${dic.won}`}</Typography>
            </Stack>
          </MyPaper>
        </Slide>
      </Modal>
    </div>
  );
};

export default WinnerModal;
