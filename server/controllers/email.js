const nodemailer = require('nodemailer');
const hbs = require('handlebars');
const fs = require('fs');
const readFile = require('util').promisify(fs.readFile);
const path = require('path');
const { Email } = require('./../models/email');

/**
 * Endpoints
 */
exports.send = async (req, res) => {
    const { to, subject, template, email, name, address } = req.body;

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USERNAME, // generated ethereal user
            pass: process.env.SMTP_PASSWORD, // generated ethereal password
        },
    });

    readFile(path.join(__dirname, '../../templates', `${template}.hbs`), 'utf8')
        .then((file) => {
            const template = hbs.compile(file);
            const compiledTemplate = template(req.body);

            transporter.sendMail(
                {
                    from: '"SpaceDX" <official@space-dx.com>', // sender address
                    to, // list of receivers
                    subject,
                    text: '', //TODO: extract text only from html template
                    html: compiledTemplate,
                },
                function () {
                    res.status(201).send({
                        code: 201,
                        status: 'success',
                        message: 'Template successfully created',
                    });
                }
            );
        })
        .catch((err) => console.log(err));
};
