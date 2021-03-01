// V1
const emailRoutesV1 = require('./v1/emails');
const empRoutesV1 = require('./v1/emp');

const routes = (app) => {
    app.use('/api/emails', emailRoutesV1);
    app.use('/emp', empRoutesV1);
};

module.exports = routes;
