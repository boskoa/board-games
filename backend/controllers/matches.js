const router = require('express').Router();
const Match = require('../models/match');
const User = require('../models/user');
const tokenExtractor = require('../utils/tokenExtractor');

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

router.post('/', tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id, {
    attributes: {
      exclude: ['passwordHash'],
    },
  });

  if (!user) {
    res.status(401).json({ error: 'You are not authorized for this action' });
  }

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
