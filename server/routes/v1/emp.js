const Router = require('express').Router();

const EMP = require('./../../controllers/emp');

Router.route('/create').post(EMP.create);

module.exports = Router;
