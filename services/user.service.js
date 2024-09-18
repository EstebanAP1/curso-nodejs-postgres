import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import sequelize from '../libs/sequelize.js';

const { models } = sequelize;

class UserService {
  constructor() {}

  async create(data) {
    const user = await models.User.findOne({
      where: {
        email: data.email,
      },
    });
    if (user) {
      throw boom.badRequest('User already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hashedPassword,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async update(id, changes) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const hashedPassword = await bcrypt.hash(changes.password, 10);
    const newUser = await user.update({
      ...changes,
      password: hashedPassword,
    });
    return newUser;
  }

  async delete(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    await user.destroy();
    return { id };
  }
}

export default UserService;
