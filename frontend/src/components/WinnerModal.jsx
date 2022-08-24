import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Paper } from '@mui/material';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { selectDic } from '../features/dictionary/dictionarySlice';

const MyBox = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '35%',
  left: '25%',
  width: 400,
  backgroundColor: theme.palette.warning.dark,
  padding: 8,
}));

const WinnerModal = ({ winner, open, handleClose }) => {
  const dic = useSelector(selectDic);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={open}>
          <MyBox elevation={8}>
            <Typography
              align="center"
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              BOOM! BAM! POW!
            </Typography>
            <Typography
              align="center"
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              {`${winner} ${dic.won}!`}
            </Typography>
          </MyBox>
        </Slide>
      </Modal>
    </div>
  );
};

export default WinnerModal;
