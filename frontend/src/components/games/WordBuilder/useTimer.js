import { useEffect, useState } from 'react';

const useTimer = (from, start) => {
  const [time, setTime] = useState(from);
  const [intervalId, setIntervalId] = useState(null);
  const stop = time <= 0;

  const changeTime = () => {
    setTime((t) => t - 1);
  };

  useEffect(() => {
    if (start) {
      setIntervalId(setInterval(changeTime, 1000));
    }
  }, [start]);

  useEffect(() => {
    if (stop) {
      clearInterval(intervalId);
    }
  }, [stop, intervalId]);

  useEffect(() => {
    clearInterval(intervalId);
  }, []);

  return [time, setTime];
};

export default useTimer;
