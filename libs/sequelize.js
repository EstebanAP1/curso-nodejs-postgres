import { Sequelize } from 'sequelize';
import { setupModels } from '.././db/index.js';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

setupModels(sequelize);

sequelize.sync();

export default sequelize;
