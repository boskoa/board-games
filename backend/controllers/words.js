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
