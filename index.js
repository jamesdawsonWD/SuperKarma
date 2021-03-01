/**
 * Connect DB
 */

// require('./server/database/db');

/**
 * Required External Modules
 */
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');

require('dotenv').config();

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || '8000';

/**
 *  App Configuration
 */
app.use(express.json());
app.use(express.static('express'));

app.use(cors({ origin: true, credentials: true }));

/**
 * Routes Definitions
 */

require('./server/routes')(app);

app.use(express.static(path.join(__dirname, 'landingPage', 'dist')));
app.get('*', (req, res) => {
    console.log('Serve index');
    res.sendFile(path.resolve(__dirname, 'landingPage', 'dist', 'index.html'));
});

/**
 * Server Activation
 */
const server = http.createServer(app);
server.listen(port);

console.debug('Server listening on port ' + port);
