import { notFound } from '@hapi/boom';
import bcrypt from 'bcrypt';

import sequelize from '../libs/sequelize.js';

const { models } = sequelize;

class CustomerService {
  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user'],
    });
    const customers = rta.map((customer) => {
      delete customer.dataValues.user.dataValues.password;
      return customer;
    });
    return customers;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    const user = await models.User.findOne({
      where: {
        email: data.user.email,
      },
    });
    if (user) {
      throw notFound('User already exists');
    }
    const hashedPassword = await bcrypt.hash(data.user.password, 10);
    data.user.password = hashedPassword;
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes) {
    const hashedPassword = await bcrypt.hash(changes.user.password, 10);
    changes.user.password = hashedPassword;
    const model = await this.findOne(id);
    if (!model) {
      throw notFound('customer not found');
    }
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}

export default CustomerService;
