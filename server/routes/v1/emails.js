const Router = require('express').Router();

const Emails = require('./../../controllers/email');

Router.route('/').post(Emails.send);

module.exports = Router;
