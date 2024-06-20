const { model } = require('mongoose');

const { Users_model } = require('./users.model');
const { UsersCred_model } = require('./user_cred.model');
const { Categories_mdodel } = require('./categories.model');

const Users = model('users', Users_model, 'users');
const UsersCred = model('user_cred', UsersCred_model, 'user_cred');
const Categories = model('categories', Categories_mdodel, 'categories');

module.exports = { Categories, Users, UsersCred };