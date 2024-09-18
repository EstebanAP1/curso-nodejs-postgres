import express, { json } from 'express';
import cors from 'cors';
import routerApi from './routes/index.js';

import {
  logErrors,
  errorHandler,
  boomErrorHandler,
} from './middlewares/error.handler.js';
import { checkApi } from './middlewares/auth.handler.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

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
import './utils/auth/index.js';

app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/protected', checkApi, (req, res) => {
  res.send('Welcome');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
