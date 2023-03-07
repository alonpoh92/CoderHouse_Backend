const { HTTP_STATUS } = require('../../constants/api.constants');
const UsersDao = require('../persistence/models/daos/Users.dao');
const { HttpError } = require('../business/utils/api.utils');
const { formatUserForDB } = require('../business/utils/users.utils');

const User = new UsersDao();

const register = (req, res, next) => res.redirect('/profile');

const login = (req, res, next) => res.redirect('/profile') ;

module.exports = {
  login,
  register,
}