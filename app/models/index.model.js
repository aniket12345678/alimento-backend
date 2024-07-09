const { model } = require('mongoose');

const { Users_model } = require('./users.model');
const { UsersCred_model } = require('./user_cred.model');
const { Categories_mdodel } = require('./categories.model');
const { PrimaryIdTable_model } = require('./primaryIdTable.model');
const { Items_mdodel } = require('./items.model');

const Users = model('users', Users_model, 'users');
const UsersCred = model('user_cred', UsersCred_model, 'user_cred');
const Categories = model('categories', Categories_mdodel, 'categories');
const Items = model('items', Items_mdodel, 'items');
const PrimaryIdTable = model('primaryIdTbl', PrimaryIdTable_model, 'primaryIdTbl');

module.exports = { Categories, Users, UsersCred, PrimaryIdTable, Items };