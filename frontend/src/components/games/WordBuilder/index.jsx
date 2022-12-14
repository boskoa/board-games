/* eslint-disable no-plusplus */
import {
  Button, Stack, Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAlphabet, selectDic, selectLang } from '../../../features/dictionary/dictionarySlice';
import { selectAllLogins } from '../../../features/login/loginSlice';
import { selectAllUsers } from '../../../features/users/usersSlice';
import { getWords, selectWords, selectWordsStatus } from '../../../features/words/wordsSlice';
import BottomBar from '../../BottomBar';
import LetterBox from './LetterBox';
import PlayerApprovalModal from './PlayerApprovalModal';
import Timer from './Timer';
import useTimer from './useTimer';
import WinnerModal from './WinnerModal';
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
  const [potentialWinners, setPotentialWinners] = useState([]);
  const lang = useSelector(selectLang);
  const alphabet = useSelector(selectAlphabet);
  const loggedIn = useSelector(selectAllLogins);
  const users = useSelector(selectAllUsers);
  const numOfLetters = alphabet.length;
  const [checkerModal, setCheckerModal] = useState(false);
  const [winnerModal, setWinnerModal] = useState(false);
  const { player1, player2 } = useSelector(selectWords);
  const loaded = useSelector(selectWordsStatus) === 'succeeded';
  const dic = useSelector(selectDic);
  const dispatch = useDispatch();

  const handleCloseCheckerModal = (event, reason) => {
    if (reason && reason === 'backdropClick') {
      // eslint-disable-next-line no-useless-return
      return;
    }
    setCheckerModal(false);
  };

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

  const stringTransform = (word) => {
    const doubles = [['n', 'j'], ['l', 'j'], ['d', '??']];
    const wordArray = word.split('');

    const transformedWord = wordArray.map((w, i) => {
      for (let x = 0; x < doubles.length; x++) {
        if (doubles[x][0] === w && doubles[x][1] === wordArray[i + 1]) {
          const changedW = w.concat(wordArray[i + 1]);
          wordArray[i + 1] = '';
          return changedW;
        }
      }
      return w;
    });

    return transformedWord.filter((l) => l !== '');
  };

  const lettersChecker = (word) => {
    const remainingLetters = letterList.map((l) => l);

    if (!word.length) {
      return false;
    }

    const letters = stringTransform(word);

    for (let i = 0; i < letters.length; i++) {
      const index = remainingLetters.indexOf(alphabet.indexOf(letters[i]));
      if (index === -1) {
        return false;
      }
      remainingLetters.splice(index, 1);
    }
    return true;
  };

  const checkWinner = (lettersA, lettersB) => {
    const a = {
      ...users.find((u) => u.username === loggedIn[0].username),
      word: wordA,
      checked: player1?.word,
    };
    const b = {
      ...users.find((u) => u.username === loggedIn[1].username),
      word: wordB,
      checked: player2?.word,
    };

    if (!lettersA && lettersB) {
      setPotentialWinners([b]);
    } else if (!lettersB && lettersA) {
      setPotentialWinners([a]);
    } else if (!lettersB && !lettersA) {
      setPotentialWinners(false);
    } else if (wordA.length > wordB.length) {
      setPotentialWinners([a, b]);
    } else if (wordA.length < wordB.length) {
      setPotentialWinners([b, a]);
    } else if (wordA.length === wordB.length) {
      setPotentialWinners([a, b]);
    }
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
    if (time < 1) {
      setTimeUp(true);
      const language = lang === 0 ? 'eng' : 'srb';
      dispatch(getWords({ lang: language, word1: wordA, word2: wordB }));
    }
  }, [time]);

  useEffect(() => {
    if (loaded) {
      const lettersA = lettersChecker(wordA);
      const lettersB = lettersChecker(wordB);
      checkWinner(lettersA, lettersB);
    }
  }, [loaded]);

  useEffect(() => {
    if (potentialWinners.length) {
      setCheckerModal(true);
    }
  }, [potentialWinners]);

  const handleNewGame = () => {
    setTimer(false);
    clearInterval(intervalId);
    setTime(0);
    setDisabled(false);
    setLetterList([]);
    setTimeout(() => setTimeUp(false), 200);
    setWordA('');
    setWordB('');
    setTimeout(() => setTime(60), 200);
  };

  return (
    <Stack
      sx={{
        width: '100vw', height: '75vh', mt: 5,
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
      <Stack
        direction="row"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{ p: 1 }}
      >
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
      <Button
        variant="contained"
        sx={{ width: 100, alignSelf: 'center', mt: 3 }}
        onClick={handleNewGame}
      >
        {dic.newGame}
      </Button>
      <Timer time={time} setTime={setTime} />
      <PlayerApprovalModal
        open={checkerModal}
        handleClose={handleCloseCheckerModal}
        language={lang === 0 ? 'eng' : 'srb'}
        potentialWinners={potentialWinners}
        setPotentialWinners={setPotentialWinners}
        setWinnerModal={setWinnerModal}
        loggedIn={loggedIn}
      />
      <WinnerModal
        potentialWinners={potentialWinners}
        openWinner={winnerModal}
        handleClose={setWinnerModal}
      />
      <BottomBar game="wordBuilder" />
    </Stack>
  );
};

export default WordBuilder;
