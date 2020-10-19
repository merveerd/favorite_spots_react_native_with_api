const crudControllers = require("../Utils/crud");
const friendGroups = require("../models/friendGroups.model");

module.exports = crudControllers(friendGroups);
