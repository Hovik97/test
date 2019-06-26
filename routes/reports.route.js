'use strict';
const express = require('express');
const asyncHandler = require('express-async-handler');
const multer  = require('multer');
const passport = require('passport');
const errorHandler = require('../controllers/error.controller');
const reportsCtrl = require('../controllers/reports.controller');
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/static-files');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));
router.post('/create/new/report', upload.array('files', 15, (err, req, res, next) => {
  if (err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  }
  next();
}), reportsCtrl.createNewReport);

