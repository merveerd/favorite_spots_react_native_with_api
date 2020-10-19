const crudControllers = require("../Utils/crud");
const messages = require("../models/messages.model");

module.exports = crudControllers(messages);
