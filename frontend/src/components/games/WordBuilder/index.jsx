/* eslint-disable no-plusplus */
import {
  Button, Stack, Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAlphabet, selectLang } from '../../../features/dictionary/dictionarySlice';
import BottomBar from '../../BottomBar';
import LetterBox from './LetterBox';
import Timer from './Timer';
import useTimer from './useTimer';
import WordInput from './WordInput';

const WordBuilder = () => {
  const [timer, setTimer] = useState(false);
  const [letterList, setLetterList] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [wordA, setWordA] = useState('');
  const [wordB, setWordB] = useState('');
  const [time, setTime] = useTimer(60, disabled);
  const [timeUp, setTimeUp] = useState(false);
  const lang = useSelector(selectLang);
  const alphabet = useSelector(selectAlphabet);
  const numOfLetters = alphabet.length;

  const indexGenerator = () => {
    const i = Math.floor(Math.random() * numOfLetters);
    return i;
  };

  const listGenerator = () => {
    const numList = [];
    for (let x = 0; x < 12; x++) {
      const newIndex = indexGenerator();
      numList.push(newIndex);
    }
    return numList;
  };

  const listChanger = () => {
    setLetterList(listGenerator());
  };

  useEffect(() => {
    if (timer) {
      const id = setInterval(listChanger, 400);
      setIntervalId(id);
    }
  }, [timer]);

  const handleChange = () => {
    if (timer) {
      setTimer(false);
      clearInterval(intervalId);
      setDisabled(true);
    } else {
      setTimer(true);
    }
  };

  useEffect(() => {
    const wordChecker = async (w) => {
      const language = lang === 0 ? 'eng' : 'srb';
      const response = await axios.get(`http://localhost:3003/api/words/${language}/?search=${w}`);
      const exists = response.data?.word;
      console.log(exists);
      return exists;
    };

    if (time < 1) {
      setTimeUp(true);
      wordChecker(wordA);
      wordChecker(wordB);
    }
  }, [time]);

  return (
    <Stack
      sx={{
        width: '100%', height: '75vh', mt: 5,
      }}
    >
      <Stack direction="row" justifyContent="center" sx={{ width: '100%' }}>
        {letterList.length
          ? letterList.map((l) => (
            <LetterBox key={Math.floor(Math.random() * 100000)} letter={alphabet[l]} />
          ))
          : [...Array(12).keys()].map((l) => (
            <LetterBox key={Math.floor(Math.random() * 100000)} letter={alphabet[l]} />
          ))}
      </Stack>
      <Button
        disabled={disabled}
        color="info"
        onClick={handleChange}
        sx={{ m: 2 }}
      >
        {timer
          ? <Typography variant="body1">Stop</Typography>
          : <Typography variant="body1">Start</Typography>}
      </Button>
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        <WordInput
          timeUp={timeUp}
          open={disabled}
          setWord={setWordA}
          word={wordA}
          side="right"
        />
        <WordInput
          timeUp={timeUp}
          open={disabled}
          setWord={setWordB}
          word={wordB}
          side="left"
        />
      </Stack>
      <Timer time={time} setTime={setTime} />
      <BottomBar game="wordBuilder" />
    </Stack>
  );
};

export default WordBuilder;
