const express = require('express');
const cors = require('cors');
const testRouter = require('./controllers/test');
const { PORT } = require('./utils/config');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

app.use('/api/test', testRouter);

const start = () => {
  app.listen(PORT || 3003, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  });
};

start();
