'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  hashedPassword: {
    type: String,
    required: true
  },
  createdDateUser: {
    type: Date,
    default: new Date()
  },
  companyID: [{
    type: Schema.ObjectId,
    ref: 'Company'
  }],
  roles: {
    type: String,
    required: true
  },
  permissions: {
    create: {
      type: Boolean,
      required: true
    },
    edit: {
      type: Boolean,
      required: true
    },
    view: {
      type: Boolean,
      required: true
    }
  }
});


module.exports = mongoose.model('User', UserSchema);
