import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import UserService from '../../../services/user.service.js';

const service = new UserService();

export const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const user = await service.findByEmail(username);
      if (!user) {
        return done(boom.unauthorized('User not found'), false);
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return done(boom.unauthorized('Invalid password'), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);
