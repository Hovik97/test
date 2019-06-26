'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  companyID: {
    type: Schema.ObjectId,
    required: true
  },
  userID: {
    type: Schema.ObjectId,
    required: true
  },
  createDate: {
    type: Date,
    default: new Date
  },
  borrowerName: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Report', ReportSchema);
