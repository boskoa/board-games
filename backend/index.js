const express = require('express');
const cors = require('cors');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const matchesRouter = require('./controllers/matches');
const { connectToDatabase } = require('./utils/db');
const { PORT } = require('./utils/config');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/matches', matchesRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT || 3003, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  });
};

start();
