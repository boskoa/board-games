const express = require('express');
const cors = require('cors');
const path = require('path');
const { errorHandler } = require('./utils/errorHandler');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const matchesRouter = require('./controllers/matches');
const avatarsRouter = require('./controllers/avatar');
const wordsRouter = require('./controllers/words');
const { connectToDatabase } = require('./utils/db');
const { PORT } = require('./utils/config');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static('build'));

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/avatar', avatarsRouter);
app.use('/api/words', wordsRouter);
app.all('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT || 3003, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  });
};

start();
