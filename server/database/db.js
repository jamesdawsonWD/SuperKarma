const mongoose = require('mongoose');
// console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB server');
});

db.on('close', (err) => {
    console.log('Unable to connect to MongoDB server', err);
});
