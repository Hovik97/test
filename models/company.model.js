'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  companyName: {
    type: String,
    required: true
  },
  companyAddress: {
    type: String,
    required: true
  },
  companyTaxNumber: {
    type: String,
    required: true,
  },
  companyPhoneNumber: {
    type: String,
    required: true
  },
  companyEmail: {
    type: String,
    required: true,
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  companyType: {
    type: String,
    required: true
  },
  createdDateComp: {
    type: Date,
    default: new Date()
  },
  companyIP: {
    type: String
  }
});


module.exports = mongoose.model('Company', CompanySchema);
