'use strict';
const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const modComponent = require('./modules.controller');
const errorHandler = require('./error.controller');

const userSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email(),
  roles: Joi.string().required(),
  permissions: Joi.object().keys({
    create: Joi.boolean().required(),
    edit: Joi.boolean().required(),
    view: Joi.boolean().required()
  }),
  companyID: Joi.array().min(1).required()
});

exports.createUser = (req, res) => {
  let user = Joi.validate(req.body, userSchema, { abortEarly: false }).value;
  const customPassword = modComponent.createCustomPssword();
  console.log(customPassword);
  let email = modComponent.email(user.email, 'Hellow ' + user.name, 'Your Password: ' + customPassword);
  user.hashedPassword = bcrypt.hashSync(customPassword, 10);
  new User(user).save((err, newUser) => {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    modComponent.sendMail(email);
    return res.status(200).send({
      message: 'User registred'
    });
  });
};

exports.getUsersCompany = (req, res) => {
  User.find({companyID: req.body.companyID}).sort('createdDateUser').skip(req.body.skip).limit(9).select('-hashedPassword').exec((err, users) => {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(users);
  });
};
