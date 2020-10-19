const crudControllers = require("../Utils/crud");
const places = require("../models/places.model");

module.exports = crudControllers(places);
