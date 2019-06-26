'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InquiriesSchema = new Schema({
  reportID: {
    type: Schema.ObjectId,
    required: true
  },
  signature_date: {
    type: Date,
    default: new Date
  },
  maturity_date: {
    type: Date,
    default: new Date
  },
  contractual_loan_amount: {
    type: String,
    required: true
  },
  loan_current_balance: {
    type: String,
    required: true
  },
  delinquent_principal: {
    type: String,
    required: true
  },
  delinquent_interest: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  loan_Classification: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Inquiries', InquiriesSchema);
