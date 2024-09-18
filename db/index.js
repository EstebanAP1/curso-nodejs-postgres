import { User, UserSchema } from './models/user.model.js';
import { Customer, CustomerSchema } from './models/customer.model.js';
import { Category, CategorySchema } from './models/category.model.js';
import { Product, ProductSchema } from './models/product.model.js';
import { Order, OrderSchema } from './models/order.model.js';
import {
  OrderProduct,
  OrderProductSchema,
} from './models/order-product.model.js';

export function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}
