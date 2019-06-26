'use strict';
const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const Company = require('../models/company.model');
const modComponent = require('./modules.controller');
const errorHandler = require('./error.controller');

function Email(email, subject, text) {
  this.email = email;
  this.subject = subject;
  this.text = text;
}

const adminSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email(),
  roles: Joi.string().required(),
  permissions: Joi.object().keys({
    create: Joi.boolean().required(),
    edit: Joi.boolean().required(),
    view: Joi.boolean().required()
  })
});

const companySchema = Joi.object({
  companyName: Joi.string().required(),
  companyAddress: Joi.string().required(),
  companyPhoneNumber: Joi.string().required(),
  companyTaxNumber: Joi.string().required(),
  companyEmail: Joi.string().email(),
  companyType: Joi.string().required()
});

exports.createCompAndAdmin = (req, res) => {
  let user = Joi.validate(req.body.user, adminSchema, { abortEarly: false }).value;
  let company = Joi.validate(req.body.company, companySchema, { abortEarly: false }).value;
  new Company(company).save((err, comp) => {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    const optionComp = modComponent.email(comp.companyEmail, 'Reporter', 'Hello ' + comp.companyName);
    modComponent.sendMail(optionComp);
    const customPassword = modComponent.createCustomPssword();
    console.log(customPassword);
    user.companyID = [comp._id];
    user.hashedPassword = bcrypt.hashSync(customPassword, 10);
    new User(user).save((err, newUser) => {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      const optionUser = modComponent.email(newUser.email, 'Hellow' + newUser.name, 'Your Password: ' + customPassword);
      modComponent.sendMail(optionUser);
      return res.status(201).send({
        message: 'Company registrated and User Admin registred'
      });
    });
  });
};

exports.getCompanies = async (req, res) => {
  const company = await Company.find().sort('createdDateComp').skip(req.body.skip).limit(9);
  res.status(200).json(company);
};

exports.getUsers = async (req, res) => {
  const users = await User.find().sort('createdDateUser').skip(req.body.skip).limit(9).select('-hashedPassword');
  res.status(200).json(users);
};
