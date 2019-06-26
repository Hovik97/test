'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InquiriesSchema = new Schema({
  reportID: {
    type: Schema.ObjectId,
    required: true
  },
  inquirer: {
    type: String,
    required: true
  },
  inquiry_date: {
    type: Date,
    default: new Date
  },
  inquiry_purpose: {
    type: String,
    required: true
  },
  inquiry_usage_segment: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Inquiries', InquiriesSchema);
