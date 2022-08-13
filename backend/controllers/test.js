const router = require('express').Router();

const hello = 'It\'s alive!';

router.get('/', (req, res) => {
  res.json(hello);
});

module.exports = router;
