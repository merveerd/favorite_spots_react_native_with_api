const crudControllers = require('../Utils/crud');
const users = require('../models/users.model');

module.exports = crudControllers(users);
