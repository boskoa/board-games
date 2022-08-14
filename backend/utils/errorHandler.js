const errorHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('Error: ', error.name, error.message);

  next(error);
};

module.exports = { errorHandler };
