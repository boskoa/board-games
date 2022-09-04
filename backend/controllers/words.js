/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
const router = require('express').Router();
const EnglishWord = require('../models/englishWord');
const SerbianWord = require('../models/serbianWord');

router.get('/eng', async (req, res, next) => {
  let where = {};

  if (req.query.search) {
    where = {
      word: req.query.search,
    };
  }

  try {
    const word = await EnglishWord.findOne(
      {
        where,
      },
    );
    res.status(200).json(word);
  } catch (error) {
    next(error);
  }
});

router.post('/eng', async (req, res, next) => {
  if (!req.body.word) {
    res.status(401).json({ error: 'Missing data' });
  }

  try {
    const word = await EnglishWord.create({ ...req.body });
    res.json(word);
  } catch (error) {
    next(error);
  }
});

router.delete('/eng/:word', async (req, res, next) => {
  try {
    const word = await EnglishWord.findOne({
      where: { word: req.params.word },
    });
    await word.destroy();
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

router.get('/srb', async (req, res, next) => {
  let where = {};

  if (req.query.search) {
    where = {
      word: req.query.search,
    };
  }

  try {
    const word = await SerbianWord.findOne(
      {
        where,
      },
    );
    res.status(200).json(word);
  } catch (error) {
    next(error);
  }
});
/*
router.get('/srb/longest', async (req, res, next) => {
  function* permute(a, n = a.length) {
    if (n <= 1) yield a.slice();
    else {
      for (let i = 0; i < n; i++) {
        yield* permute(a, n - 1);
        const j = n % 2 ? 0 : i;
        [a[n - 1], a[j]] = [a[j], a[n - 1]];
      }
    }
  }

  const permutations = (Array.from(permute(req.query.search.split('')))
    .map((perm) => perm.join(''))
    .filter((el, idx, self) => (self.indexOf(el) === idx)));
  try {
    const word = await SerbianWord.findAll(
      {
        where: {
          word: permutations,
        },
      },
    );
    res.status(200).json(word);
  } catch (error) {
    next(error);
  }
});
*/
router.post('/srb', async (req, res, next) => {
  if (!req.body.word) {
    res.status(401).json({ error: 'Missing data' });
  }

  try {
    const word = await SerbianWord.create({ ...req.body });
    res.json(word);
  } catch (error) {
    next(error);
  }
});

router.delete('/srb/:word', async (req, res, next) => {
  try {
    const word = await SerbianWord.findOne({
      where: { word: req.params.word },
    });
    await word.destroy();
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
