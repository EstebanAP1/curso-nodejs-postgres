import boom from '@hapi/boom';

function checkApi(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === '123') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

export { checkApi };
