const router = require('express').Router();
const Match = require('../models/match');
const User = require('../models/user');
const { sequelize } = require('../utils/db');

router.get('/', async (req, res, next) => {
  let where = {};

  if (req.query.search) {
    where = {
      game: req.query.search,
    };
  }

  try {
    const matches = await Match.findAll(
      {
        where,
        include: [
          {
            model: User,
            as: 'winner',
            attributes: ['id', 'name', 'username'],
          },
          {
            model: User,
            as: 'loser',
            attributes: ['id', 'name', 'username'],
          },
        ],
      },
    );
    res.status(200).json(matches);
  } catch (error) {
    next(error);
  }
});

router.get('/allbest', async (req, res, next) => {
  try {
    const allBest = await sequelize.query(
      `SELECT COUNT(matches.winner_id), users.name FROM matches
        JOIN users ON matches.winner_id=users.id
        GROUP BY users.name;`,
      {
        type: sequelize.QueryTypes.SELECT,
      },
    );
    res.json(allBest);
  } catch (error) {
    next(error);
  }
});

router.get('/bestpergame', async (req, res, next) => {
  try {
    const bestPerGame = await sequelize.query(
      `SELECT COUNT(matches.winner_id), users.name FROM matches
        JOIN users ON matches.winner_id=users.id
        GROUP BY users.name;`,
      {
        type: sequelize.QueryTypes.SELECT,
      },
    );
    res.json(bestPerGame);
  } catch (error) {
    next(error);
  }
});

router.get('/:username', async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.params.username } });

  if (!user) {
    res.status(401).json({ error: 'No such user.' });
  }

  try {
    const matches = await sequelize.query(
      `SELECT
        COUNT(winner_id) FILTER (WHERE winner_id=${user.id}) as wins,
        COUNT(loser_id) FILTER (WHERE loser_id=${user.id}) as loses,
        MAX(game) FILTER (WHERE winner_id=${user.id}) as best,
        MAX(game) FILTER (WHERE loser_id=${user.id}) as worst
        FROM matches;`,
      {
        type: sequelize.QueryTypes.SELECT,
      },
    );
    res.json(matches);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  if (!req.body.game || !req.body.winnerId || !req.body.loserId) {
    res.status(401).json({ error: 'Missing data' });
  }

  try {
    const match = await Match.create({ ...req.body });
    res.json(match);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
