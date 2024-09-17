import express, { json } from 'express';
import cors from 'cors';
import routerApi from './routes/index.js';

import {
  logErrors,
  errorHandler,
  boomErrorHandler,
} from './middlewares/error.handler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

const whitelist = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Acceso no permitido'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
