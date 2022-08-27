const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Match } = require('../models');
const tokenExtractor = require('../utils/tokenExtractor');

router.get('/', async (req, res, next) => {
  let where = {};
  let order = [];

  if (req.query.search) {
    where = {
      name: req.query.search,
    };
  }
  if (req.query.order) {
    order = [
      'name', req.query.order,
    ];
  }
  try {
    const users = await User.findAll({
      where,
      order,
      attributes: {
        exclude: ['passwordHash'],
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ['passwordHash'],
      },
      include: [
        {
          model: Match,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
    });
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: 'No such user' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  if (!req.body.name || !req.body.password || !req.body.username) {
    res.status(401).json({ error: 'Missing name or password' });
  }

  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, passwordHash });
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'User could not be created' });
    next(error);
  }
});

router.put('/:id', tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(Number(req.params.id), {
    attributes: {
      exclude: ['passwordHash'],
    },
  });

  if (!user) {
    res.status(401).json({ error: 'User not found' });
  }

  try {
    const changer = await User.findByPk(req.decodedToken.id, {
      attributes: {
        exclude: ['passwordHash'],
      },
    });

    if (!changer.admin && user.id !== changer.id) {
      res.status(401).json({ error: 'You are not authorized for this action' });
    }

    const newValues = { ...req.body };

    if (newValues.password) {
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      delete newValues.password;
      newValues.passwordHash = passwordHash;
    }

    user.set({ ...newValues });
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
