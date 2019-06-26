'use strict';
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const errorHandler = require('./error.controller');

function generateToken(user) {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, config.jwtSecret);
}


function changeUserSettings(req, res){
  const newUser = Object.assign({}, req.body);
  delete newUser._id;
  User.findById(req.body._id).exec((err, user) => {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    if (bcrypt.compareSync(req.body.password, user.hashedPassword)) {
      if ('newPassword' in newUser) {
        newUser.hashedPassword = bcrypt.hashSync(newUser.newPassword, 10);
        delete newUser.password;
        delete newUser.newPassword;
      } else {
          delete newUser.password;
      }
      User.findByIdAndUpdate(req.body._id, newUser).exec((err, newDataUser) => {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }
        User.findById(req.body._id).select('-hashedPassword').exec((err, users) => {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          }
          res.send(users);
        });
      });
    } else {
        return res.status(400).send({
          message: 'Your current password is wrong'
        });
    }
  });
};

module.exports = {
  generateToken,
  changeUserSettings
};
