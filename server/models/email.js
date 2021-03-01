const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const timestamps = require('mongoose-timestamps');
const paginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required',
        minlength: 1,
        maxlength: [100, 'The name must be lower than 100 characters'],
    },

    address: {
        type: String,
        required: false,
    },

    email: {
        type: Number,
        required: 'Email is required',
    },
});

EmailSchema.plugin(uniqueValidator);
EmailSchema.plugin(timestamps);
EmailSchema.plugin(paginate);

const Email = mongoose.model('email_template', EmailSchema);

module.exports = { Email };
