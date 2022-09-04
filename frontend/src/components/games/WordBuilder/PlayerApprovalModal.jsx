import styled from '@emotion/styled';
import {
  Backdrop, Modal, Button, Stack, Paper, Slide, Typography, Divider,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

const PlayerApproval = ({
  open, handleClose, language, potentialWinners, setPotentialWinners, setWinnerModal,
}) => {
  const dic = useSelector(selectDic);
  const [disabler, setDisabler] = useState(0);

  const handleNewWord = async (checked, newWord) => {
    if (!checked) {
      const response = await axios.post(
        `http://localhost:3003/api/words/${language}`,
        { word: newWord },
      );
      return response.data;
    }
    return null;
  };

  const handleDeleteWord = async (checked, word) => {
    if (checked) {
      await axios.delete(`http://localhost:3003/api/words/${language}/${word}`);
    }
  };

  const aprove = (checked, word) => {
    handleNewWord(checked, word);
    setDisabler((prev) => prev - 1);
  };

  const disaprove = (checked, word) => {
    handleDeleteWord(checked, word);
    setPotentialWinners((prev) => prev.filter((p) => p.word !== word));
    setDisabler((prev) => prev - 1);
  };

  useEffect(() => {
    setDisabler(potentialWinners.length);
  }, [open]);

  if (!potentialWinners.length) <div />;

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
          <MyPaper elevation={5}>
            {potentialWinners?.length
              ? potentialWinners.map((pw) => (
                <Stack sx={{ mb: 2 }} key={pw.id}>
                  <Typography variant="h6">
                    {`${dic.acceptWord} ${pw.word}? ${pw.checked ? dic.wordExists : dic.wordDoesntExist}`}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" sx={{ m: 1 }}>
                    <Button
                      disabled={disabler === 0}
                      size="small"
                      variant="contained"
                      onClick={() => disaprove(pw.checked, pw.word)}
                    >
                      <Typography variant="body4">{dic.no}</Typography>
                    </Button>
                    <Button
                      disabled={disabler === 0}
                      size="small"
                      variant="contained"
                      onClick={() => aprove(pw.checked, pw.word)}
                    >
                      <Typography variant="body4">{dic.yes}</Typography>
                    </Button>
                  </Stack>
                  <Divider sx={{ mt: 1 }} />
                </Stack>
              ))
              : <div />}
            <Stack sx={{ mt: 2 }} direction="row" justifyContent="center">
              <Button
                disabled={disabler !== 0}
                size="small"
                variant="contained"
                onClick={() => {
                  setWinnerModal(true);
                  handleClose();
                }}
              >
                <Typography variant="body4">{dic.confirm}</Typography>
              </Button>
            </Stack>
          </MyPaper>
        </Slide>
      </Modal>
    </div>
  );
};

const PlayerApprovalModal = React.memo(PlayerApproval);

export default PlayerApprovalModal;
