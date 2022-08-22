import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectDic } from '../features/dictionary/dictionarySlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
        <Fade in={open}>
          <Box sx={style}>
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
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default WinnerModal;
