const { model } = require('mongoose');

const { UsersModel } = require('./users.model');
const { UsersCredModel } = require('./userCred.model');
const { CategoriesModel } = require('./categories.model');
const { PrimaryIdTable_model } = require('./primaryIdTable.model');
const { ItemsModel } = require('./items.model');

const Users = model('users', UsersModel, 'users');
const Items = model('items', ItemsModel, 'items');
const UsersCred = model('user_cred', UsersCredModel, 'user_cred');
const Categories = model('categories', CategoriesModel, 'categories');
const PrimaryIdTable = model('primaryIdTbl', PrimaryIdTable_model, 'primaryIdTbl');

module.exports = { Categories, Users, UsersCred, PrimaryIdTable, Items };