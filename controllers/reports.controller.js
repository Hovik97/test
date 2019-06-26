'use strict';
const User = require('../models/user.model');
const Report = require('../models/reports.model');
const modComponent = require('./modules.controller');
const errorHandler = require('./error.controller');
const fs = require('fs');
const PDFExtract = require('pdf.js-extract').PDFExtract;
const xlsx = require('node-xlsx');


exports.createNewReport = (req, res) => {
  const arrayPdf = [];
  const arrayExel = [];
  const pdfExtract = new PDFExtract();
  let obj = {};
  let a = 0;
  req.files.map((file) => {
    let format = file.filename.substring(file.filename.lastIndexOf('.') + 1);
    if (format === 'pdf') {
      a++;
      pdfExtract.extract('server/static-files/' + file.filename, {}, (err, data) => {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }
        fs.unlink('server/static-files/' + file.filename, (err) => {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          }
          arrayPdf.push(data);
          sync()
        });
      });
    } else {
        arrayExel.push(xlsx.parse('server/static-files/' + file.filename));
        fs.unlink('server/static-files/' + file.filename, (err) => {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          }
        });
    }
  });
  function sync() {
    a--;
    if (a === 0) {
      new Report(req.body).save((err, rep) => {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }
        obj.arrPdf = arrayPdf;
        obj.arrExel = arrayExel;
        res.send(obj);
      });
    }
  }
};


exports.getReportsAdm = async (req, res) => {
 const report = await Report.find({companyID: req.body.companyID}).sort('createDate').skip(req.body.skip).limit(21);
 res.status(200).json(report);
};

