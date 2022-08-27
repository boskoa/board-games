import {
  Button, Card, CardActions, CardContent, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectDic } from '../../features/dictionary/dictionarySlice';

const GameCard = ({ game }) => {
  const dic = useSelector(selectDic);

  return (
    <Card sx={{ minWidth: 150, maxWidth: 300 }}>
      <CardContent>
        <Typography variant="h5">
          {game.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {game.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button size="small" variant="contained">
          <Link
            to={game.pathName}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {dic.play}
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameCard;
