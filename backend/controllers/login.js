const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { SECRET } = require('../utils/config');

router.post('/', async (req, res, next) => {
  if (req.body.username === '' || req.body.password === '') {
    return res.status(401).json({ error: 'No credentials entered' });
  }

  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (user.disabled) {
    return res.status(401).json({ error: 'Account disabled' });
  }

  const passwordCorrect = await bcrypt.compare(req.body.password, user.passwordHash);

  if (!passwordCorrect) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  try {
    const userForToken = {
      username: user.usernae,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET);
    res.status(200).send({ token });
  } catch (error) {
    next(error);
  }

  return 0;
});

module.exports = router;
